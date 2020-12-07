import React, { useState } from "react";
import { Flex, Icon, IconButton } from "@chakra-ui/core";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import {
  AiFillAlert,
  AiFillBell,
  AiFillCaretLeft,
  AiFillChrome,
  AiFillCloud,
  AiFillCrown,
  AiOutlineFire,
} from "react-icons/ai";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  let switchIcon = AiOutlineFire;

  switch (post.points) {
    case -3:
      switchIcon = AiFillAlert;
      break;
    case -2:
      switchIcon = AiFillBell;
      break;
    case -1:
      switchIcon = AiFillCaretLeft;
      break;
    case 0:
      switchIcon = AiFillChrome;
      break;
    case 1:
      switchIcon = AiFillCloud;
      break;
    case 2:
      switchIcon = AiFillCrown;
  }
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <Icon boxSize={10} as={switchIcon} />
      <Flex
        direction="initial"
        justifyContent="center"
        alignItems="center"
        mr={4}
        ml={4}
        mt={4}
      >
        {post.upvote}

        <IconButton
          onClick={async () => {
            if (post.voteStatus === 1) {
              return;
            }
            setLoadingState("updoot-loading");
            await vote({
              postId: post.id,
              value: 1,
            });
            setLoadingState("not-loading");
          }}
          isLoading={loadingState === "updoot-loading"}
          size="sm"
          m={2}
          variant="outline"
          colorScheme={post.voteStatus === 1 ? "green" : undefined}
          // colorScheme="white"
          aria-label="updoot vote"
          icon={<Icon as={FaRegThumbsUp} />}
        />

        <IconButton
          onClick={async () => {
            if (post.voteStatus === -1) {
              return;
            }
            setLoadingState("downdoot-loading");
            await vote({
              postId: post.id,
              value: -1,
            });
            setLoadingState("not-loading");
          }}
          isLoading={loadingState === "downdoot-loading"}
          size="sm"
          ml={4}
          mr={2}
          variant="outline"
          colorScheme={post.voteStatus === -1 ? "red" : undefined}
          aria-label="downdoot vote"
          icon={<FaRegThumbsDown />}
        />
        {Math.abs(post.downvote)}
      </Flex>
    </Flex>
  );
};
