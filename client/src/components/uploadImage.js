import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const UploadImage = ({ onImageUpload }) => {
  const [uploadImg, setUploadImg] = useState(null);

  const afterClick = async (e) => {
    e.preventDefault();
    try {
      const imgref = ref(storage, `images/${uploadImg.name}`);
      await uploadBytes(imgref, uploadImg);
      const url = await getDownloadURL(imgref);
      onImageUpload(url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="uploadImage">
      <label htmlFor="upload" id="uploadImageLabel">
        Upload Image
      </label>
      <input
        id="upload"
        type="file"
        onChange={(e) => setUploadImg(e.target.files[0])}
      />
      <button onClick={afterClick} className="uploadButton">
        Upload
      </button>
    </div>
  );
};
