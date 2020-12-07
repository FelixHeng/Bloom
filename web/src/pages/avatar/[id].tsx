import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useGetAvatarQuery } from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { Heading, Box, Link } from "@chakra-ui/core";
import { EditDeletePostButtons } from "../../utils/EditDeletePostButtons";
import { Image } from "cloudinary-react";
import NextLink from "next/link";

const Avatar = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = useGetAvatarQuery({
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

  if (!data?.avatar) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <NextLink href="/avatar/[id]" as={`/avatar/${data.avatar.avatar}`}>
        <Image
          style={{ width: 100 }}
          cloudName="felixh"
          publicId={data?.avatar.avatar}
        />
      </NextLink>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Avatar);
