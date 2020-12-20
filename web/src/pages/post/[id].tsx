import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { usePostQuery } from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { Heading, Box, Link, Flex, flexbox } from "@chakra-ui/core";
import { EditDeletePostButtons } from "../../utils/EditDeletePostButtons";
import { Image } from "cloudinary-react";
import NextLink from "next/link";

const Post = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* <NextLink href="/avatar/[id]" as={`/avatar/${data.post.creator.id}`}> */}
      <Image
        style={{ width: 100 }}
        cloudName="felixh"
        publicId={data?.post?.creator.avatar}
      />
      {/* </NextLink> */}
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={8}>{data.post.text}</Box>
      <Flex flex={1} justifyContent="flex-end">
        <EditDeletePostButtons
          id={data.post.id}
          creatorId={data.post.creator.id}
        />
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
