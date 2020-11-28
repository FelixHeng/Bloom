import { Box, IconButton, Link } from "@chakra-ui/core";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const { data: MeData } = useMeQuery();
  const [deletePost] = useDeletePostMutation();

  if (MeData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          variant="outline"
          colorScheme="blue"
          icon={<EditIcon />}
          aria-label="Edit Post"
        />
      </NextLink>
      <IconButton
        variant="outline"
        colorScheme="red"
        icon={<DeleteIcon />}
        aria-label="Delete Post"
        onClick={() => {
          deletePost({
            variables: { id },
            update: (cache) => {
              cache.evict({ id: "Post:" + id });
            },
          });
        }}
      />
    </Box>
  );
};
