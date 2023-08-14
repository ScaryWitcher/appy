import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Product = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const { productID } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/products/product/${productID}`
        );
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [productID]);

  // Function to handle image click and open the image viewer modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Function to close the image viewer modal
  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  return (
    <div className="productContainer">
      {product.productImages && product.productImages.length > 0 && (
        <img
          id="productMainImage"
          src={product.productImages[0]}
          className="productImageInProductPage"
          alt="Product"
          onClick={() => handleImageClick(product.productImages[0])}
        />
      )}
      <h1 id="productName">{product.name}</h1>
      <h2 id="productDescriptionHeading">Description</h2>
      <h3 id="productDescription">{product.description}</h3>
      <h2 id="ProductImagesHeading">Product Images</h2>
      <div className="productImages">
        {product.productImages && product.productImages.length > 0 && (
          <ul>
            {product.productImages.map((item, index) => (
              <img
                src={item}
                alt={`Product ${index + 1}`}
                key={index}
                onClick={() => handleImageClick(item)} // Open image viewer on click
              />
            ))}
          </ul>
        )}
      </div>

      {/* Image viewer modal */}
      {selectedImage && (
        <div className="imageViewerModal" onClick={closeImageViewer}>
          <div className="imageViewerContent">
            <img
              src={selectedImage}
              alt="Product"
              className="imageViewerImage"
            />
          </div>
        </div>
      )}
    </div>
  );
};
