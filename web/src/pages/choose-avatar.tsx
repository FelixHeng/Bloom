import axios from "axios";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useAvatarMutation } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";

interface ChooseAvatarProps {}

export const ChooseAvatar: React.FC<ChooseAvatarProps> = ({}) => {
  useIsAuth();
  const [imageSelected, setImageSelected] = useState("");
  const [public_Id, setPublic_Id] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [, getPublicId] = useAvatarMutation();

  useEffect(() => {
    if (!public_Id) {
      return;
    }
    getPublicId({
      publicId: public_Id,
    });
  }, [public_Id]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setImageSelected(file);
    // setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadImage = (files: string) => {
    console.log(files[0]);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "bloompictures");
    axios
      .post("https://api.cloudinary.com/v1_1/felixh/image/upload", formData)
      .then((response) => setPublic_Id(response.data.public_id));
  };
  console.log("publicId", public_Id);
  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={uploadImage}>Upload Image</button>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(ChooseAvatar);
