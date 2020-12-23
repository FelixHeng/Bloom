import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { usePostQuery } from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { Heading, Box, Link, Flex, Text } from "@chakra-ui/core";
import { EditDeletePostButtons } from "../../utils/EditDeletePostButtons";
import { Image } from "cloudinary-react";
import { UpdootSection } from "../../components/UpdootSection";
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
      <Flex
        shadow="md"
        borderWidth="1px"
        flexDirection="column"
        backgroundColor="#9ac8fc3b"
        padding="30px"
      >
        <NextLink href="/profile/[id]" as={`/profile/${data.post.creator.id}`}>
          <Link style={{ textDecoration: "none" }}>
            <Flex justifyContent="center">
              <Heading fontSize="xl">{data.post.creator.username}</Heading>
            </Flex>
            <Flex
              mx="auto"
              width="100px"
              border="2px"
              borderRadius="10%"
              marginBottom="30px"
            >
              <Image
                style={{ width: 100 }}
                cloudName="felixh"
                publicId={data?.post?.creator.avatar}
              />
            </Flex>
          </Link>
        </NextLink>
        <Heading mb={4}>{data.post.title}</Heading>
        <Box mb={2}>{data.post.text}</Box>
        <Flex mb={8} justifyContent="flex-end">
          <Text fontSize="small" color="grey">
            posted by {data.post.creator.username}
          </Text>
        </Flex>
        <Flex flex={1} justifyContent="space-between" alignItems="center">
          <UpdootSection post={data.post} />

          <EditDeletePostButtons
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </Flex>
        <Flex justifyContent="center" mt={10}>
          <NextLink href="/">
            <Link
              bg="#9ac8fc"
              color="white"
              fontWeight="bolder"
              fontSize="20px"
              style={{ textDecoration: "none" }}
              borderRadius={6}
              padding="10px"
              textAlign="center"
            >
              View all posts
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
