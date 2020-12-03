import axios from "axios";
import React, { useState } from "react";

interface UploadFileProps {}

export const UploadFile: React.FC<UploadFileProps> = ({}) => {
  const [imageSelected, setImageSelected] = useState("");
  const uploadImage = (files: string) => {
    console.log(files[0]);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "bloompictures");
    axios
      .post("https://api.cloudinary.com/v1_1/felixh/image/upload", formData)
      .then((response) => console.log(response));
  };
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageSelected(event.target.files[0]);
        }}
      />
      <button onClick={() => uploadImage}>Upload Image</button>
    </div>
  );
};
