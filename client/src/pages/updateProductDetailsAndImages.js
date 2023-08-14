import React, { useState } from "react";
import axios from "axios";
import { UploadImage } from "../components/uploadImage";
import { useParams } from "react-router-dom";

const UpdateProductDetails = () => {
  const { productID } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const updateName = async () => {
    try {
      await axios.put(
        `http://localhost:3001/products/updateName/${productID}`,
        {
          name: name,
        }
      );
      alert("Product Name updated");
    } catch (err) {
      console.log(err);
    }
  };

  const updatePrice = async () => {
    try {
      await axios.put(
        `http://localhost:3001/products/updatePrice/${productID}`,
        {
          price: price,
        }
      );
      alert("product Price updated");
    } catch (err) {
      console.log(err);
    }
  };

  const updateDescription = async () => {
    try {
      await axios.put(
        `http://localhost:3001/products/updateDescription/${productID}`,
        {
          description: description,
        }
      );
      alert("Product Description updated");
    } catch (err) {
      console.log(err);
    }
  };

  const updateImages = async (url) => {
    try {
      await axios.put(
        `http://localhost:3001/products/addProductImages/${productID}`,
        {
          newProductImage: url,
        }
      );
      alert("Product Images updated");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="updateProductContainer">
      <h1 id="updateProductDetailsHeading">Update Product Details</h1>
      <div className="productImageUploadBlock">
        <UploadImage onImageUpload={updateImages} />
      </div>
      <div className="productDetailsBlock">
        <label htmlFor="productNameInput" className="productLabel">
          Name:
        </label>
        <input
          id="productNameInput"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="inputField"
        />
        <button
          id="productNameUpdateButton"
          onClick={updateName}
          className="updateButton"
        >
          Update
        </button>
      </div>
      <div className="productDetailsBlock">
        <label htmlFor="productPriceInput" className="productLabel">
          Price:
        </label>
        <input
          id="productPriceInput"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="inputField"
        />
        <button
          id="productPriceUpdateButton"
          onClick={updatePrice}
          className="updateButton"
        >
          Update
        </button>
      </div>
      <div className="productDetailsBlock">
        <label htmlFor="productDescriptionInput" className="productLabel">
          Description:
        </label>
        <input
          id="productDescriptionInput"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="inputField"
        />
        <button
          id="productDescriptionUpdateButton"
          onClick={updateDescription}
          className="updateButton"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateProductDetails;
