import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import React, { useState } from "react";
import { UpdootSection } from "../components/UpdootSection";
import { EditDeletePostButtons } from "../utils/EditDeletePostButtons";
import { Image } from "cloudinary-react";
import CreatePost from "../components/create-post";
import { isServer } from "../utils/isServer";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [{ data: dataMe, fetching: fetchingMe }] = useMeQuery({
    pause: isServer(),
  });

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }
  return (
    <Layout>
      {!dataMe?.me ? null : <CreatePost />}
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data?.posts.posts.map((p) =>
            !p ? null : (
              <Flex
                key={p.id}
                p={5}
                shadow="md"
                borderWidth="1px"
                flexDirection="column"
                backgroundColor="#9ac8fc3b"
              >
                <NextLink href="/profile/[id]" as={`/profile/${p.creator.id}`}>
                  <Link style={{ textDecoration: "none" }}>
                    <Flex justifyContent="center">
                      <Heading fontSize="xl">{p.creator.username}</Heading>
                    </Flex>
                    <Flex
                      mx="auto"
                      width="100px"
                      border="2px"
                      borderRadius="10%"
                    >
                      <Image cloudName="felixh" publicId={p.creator.avatar} />
                    </Flex>
                  </Link>
                </NextLink>

                <Box flex={1} ml={8}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text fontSize="small" color="grey">
                    posted by {p.creator.username}
                  </Text>
                  <Flex align="center">
                    <Text mt={4} flex={1}>
                      {p.textSnippet}
                    </Text>
                  </Flex>
                  <Flex mt={4}>
                    <UpdootSection post={p} />
                    <Box ml="auto">
                      <EditDeletePostButtons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
