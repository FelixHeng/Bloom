import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "./InputField";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "./Layout";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  // useIsAuth();
  const [, createPost] = useCreatePostMutation();
  return (
    // <Layout variant="small">
    <Formik
      initialValues={{
        title: "",
        text: "",
      }}
      onSubmit={async (values, {}) => {
        console.log(values);
        const { error } = await createPost({ input: values });
        if (!error) {
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="title" placeholder="title" label="title" />
          <Box mt={4}>
            <InputField
              textarea
              name="text"
              placeholder="text..."
              label="Body"
            />
          </Box>
          <Button
            mt={4}
            type="submit"
            isLoading={isSubmitting}
            bg="#9ac8fc"
            color="white"
            fontWeight="bolder"
            fontSize="20px"
          >
            create post
          </Button>
        </Form>
      )}
    </Formik>
    // </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
