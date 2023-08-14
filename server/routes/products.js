import { ProductModel } from "../models/Product.js";
import express from "express";

const router = express.Router();

router.post("/addProduct", async (req, res) => {
  const product = new ProductModel(req.body);
  try {
    const response = await product.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await ProductModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.get("/userProducts/:userID", async (req, res) => {
  try {
    const response = await ProductModel.find({ user: req.params.userID });
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/product/:productID", async (req, res) => {
  try {
    const response = await ProductModel.findById(req.params.productID);
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.get("/search", async (req, res) => {
  const searchTerm = req.query.q;

  try {
    const response = await ProductModel.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    response.sort((a, b) => {
      const aStartsWithSearchTerm = a.name
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());
      const bStartsWithSearchTerm = b.name
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());
      if (aStartsWithSearchTerm && !bStartsWithSearchTerm) {
        return -1;
      } else if (!aStartsWithSearchTerm && bStartsWithSearchTerm) {
        return 1;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    res.json({ message: "found some data", products: response });
  } catch (err) {
    res.json(err);
  }
});

router.put("/addProductImages/:productID", async (req, res) => {
  const productID = req.params.productID;
  const { newProductImage } = req.body;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productID,
      { $push: { productImages: newProductImage } },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.json(err);
  }
});

router.put("/updatePrice/:productID", async (req, res) => {
  const productID = req.params.productID;
  const { price } = req.body;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productID,
      { price: price },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.json(err);
  }
});

router.put("/updateDescription/:productID", async (req, res) => {
  const productID = req.params.productID;
  const { description } = req.body;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productID,
      { description: description },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.json(err);
  }
});

router.put("/updateName/:productID", async (req, res) => {
  const productID = req.params.productID;
  const { name } = req.body;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productID,
      { name: name },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.json(err);
  }
});

export { router as ProductRouter };
