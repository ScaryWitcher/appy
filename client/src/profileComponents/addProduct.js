import { useState } from "react";
import { GetUserID } from "../customHooks/userid";
import axios from "axios";
import { UploadImage } from "../components/uploadImage";

export const AddProduct = () => {
  const userId = GetUserID();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    user: userId,
    productImages: [],
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!imageUploaded) {
      return alert("upload image first");
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/products/addProduct`,
        product
      );
    } catch (err) {
      console.log(err);
    }
    alert("product added successfully");
    window.location.reload();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const [imageUploaded, setImageUploaded] = useState(false);

  const onImageUpload = (url) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      productImages: [...prevProduct.productImages, url],
    }));
    setImageUploaded(true);
  };

  return (
    <div className="addProductContainer">
      <form onSubmit={onSubmit} className="addProductForm">
        <h1>Add Product</h1>
        <label htmlFor="productNameInAddProduct">Name:</label>
        <input
          type="text"
          id="productNameInAddProduct"
          name="name"
          onChange={handleChange}
          className="inputField"
        />
        <label htmlFor="productDes">Description:</label>
        <input
          type="text"
          id="productDes"
          name="description"
          onChange={handleChange}
          className="inputField"
        />
        <UploadImage onImageUpload={onImageUpload} />
        {imageUploaded && <h2 id="imageUploadedSign">Image uploaded</h2>}
        <label htmlFor="productPrice">Price:</label>
        <input
          type="number"
          id="productPrice"
          name="price"
          onChange={handleChange}
          className="inputField"
        />
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
};
