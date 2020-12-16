import React from "react";
import { Box, Flex, Heading, IconButton, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";
import { IoLogOutOutline } from "react-icons/io5";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  let body = null;

  // data is loading
  if (fetching) {
    body = null;
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={4} fontSize="1.2em" fontWeight="bold">
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white" fontSize="1.2em" fontWeight="bold">
            register
          </Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex align="center">
        {/* <NextLink href="/create-post">
          <IconButton
            as={Link}
            mr={10}
            // variant="outline"
            colorScheme="white"
            icon={<BsPencilSquare size="35px" />}
            aria-label="Edit Post"
          />
        </NextLink> */}

        <Box color="white" mr={18} fontWeight="bolder" fontSize="1.5em">
          {data.me.username}
        </Box>
        <IconButton
          aria-label="Logout"
          color="black"
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
          variant="link"
          icon={<IoLogOutOutline size="30px" />}
        />
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="#9ac8fc" p={4}>
      <Flex flex={1} m="auto" maxW={800} align="center">
        <NextLink href="/">
          <Link>
            <Heading color={"white"} fontWeight="bolder" fontSize="2em">
              BlටටM
            </Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
