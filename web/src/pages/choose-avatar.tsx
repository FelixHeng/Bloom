import axios from "axios";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useAvatarMutation } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import { Layout } from "../components/Layout";
import { Button, Img, Input, Box, Heading, Flex } from "@chakra-ui/core";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";

interface ChooseAvatarProps {}

export const ChooseAvatar: React.FC<ChooseAvatarProps> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const [imageSelected, setImageSelected] = useState("");
  const [public_Id, setPublic_Id] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [, getPublicId] = useAvatarMutation();
  const { getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    if (!public_Id) {
      return;
    }
    getPublicId({
      publicId: public_Id,
    });
  }, [public_Id]);

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
    setImageSelected(file);
    // setFileInputState(e.target.value);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadImage = async (files: string) => {
    console.log(files[0]);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "bloompictures");
    await axios
      .post("https://api.cloudinary.com/v1_1/felixh/image/upload", formData)
      .then((response) => setPublic_Id(response.data.public_id));
    router.push("/");
  };
  console.log("publicId", public_Id);
  return (
    <Layout>
      <Flex
        align="center"
        flexDirection="column"
        border="2px black solid"
        w="70%"
        h="40em"
        m="auto"
      >
        <Heading color="black" mt="2em" align="center">
          CLICK BELOW TO
          <br />
          CHOOSE YOUR AVATAR
        </Heading>
        <Box
          {...getRootProps()}
          type="file"
          bg="white"
          borderRadius="300px"
          height="300px"
          width="300px"
          cursor="pointer"
          mt="5em"
        >
          <Input {...getInputProps()} onChange={handleFileInputChange} />
          <p>
            {previewSource ? (
              <Img
                src={previewSource}
                alt="chosen"
                height="300px"
                borderRadius="300px"
                // pb="2em"
                // style={{ height: "300px", }}
              />
            ) : (
              <Img
                src="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                height="300px"
                borderRadius="300px"
              />
            )}
          </p>
        </Box>

        <Box align="center" pb="20em">
          <Button
            onClick={uploadImage}
            mt="3em"
            bg="#9ac8fc"
            color="white"
            fontWeight="bolder"
            fontSize="20px"
          >
            Upload Image
          </Button>
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ChooseAvatar);
