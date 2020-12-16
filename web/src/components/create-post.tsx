import { Box, Button, Flex } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "./InputField";
import { useCreatePostMutation } from "../generated/graphql";
// import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const CreatePost: React.FC<{}> = ({}) => {
  // const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  return (
    <Formik
      initialValues={{
        title: "",
        text: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        console.log(values);
        const { error } = await createPost({ input: values });
        if (!error) {
          // router.push("/");
          resetForm();
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box mt={8} mx="auto" maxW={"800px"} w="100%">
            <InputField
              name="title"
              placeholder="title"
              label="title"
              width="50%"
            />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Post"
                height="150px"
              />
            </Box>
            <Flex>
              <Button
                type="submit"
                isLoading={isSubmitting}
                bg="#9ac8fc"
                color="white"
                fontWeight="bolder"
                fontSize="20px"
                m="auto"
                mt="1.5em"
                mb="3em"
                resetform
              >
                create post
              </Button>
            </Flex>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
