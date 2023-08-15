import mongoose from "mongoose";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";
import { ContactModel } from "../models/Contact.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });
  if (user) {
    return res.status(400).json({ message: "User already exists!  " });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new UserModel({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();
  } catch (err) {
    if (err.name == "ValidationError") {
      res.status(401).json({ message: "invalid Username or password" });
      return;
    }
  }
  res.json({ message: "User successfully created" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });
  if (!user) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  const ispasswordValid = await bcrypt.compare(password, user.password);
  if (!ispasswordValid) {
    return res.status(401).json({ message: "password is invalid" });
  }

  const token = await jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

router.get("/people", async (req, res) => {
  try {
    const response = await UserModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.get("/user/:userID", async (req, res) => {
  try {
    const response = await UserModel.findById(req.params.userID);
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/updateProfilePicture/:userID", async (req, res) => {
  const userID = req.params.userID;
  const { profilePicture } = req.body;

  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    user.profilePicture = profilePicture;
    const updatedUser = await user.save();

    res.json({ message: "user updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "error updating the user" });
  }
});

router.get("/search", async (req, res) => {
  const searchTerm = req.query.q;

  try {
    const response = await UserModel.find({
      username: { $regex: searchTerm, $options: "i" },
    });
    response.sort((a, b) => {
      const aStartsWithSearchTerm = a.username
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());
      const bStartsWithSearchTerm = b.username
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());
      if (aStartsWithSearchTerm && !bStartsWithSearchTerm) {
        return -1;
      } else if (!aStartsWithSearchTerm && bStartsWithSearchTerm) {
        return 1;
      } else {
        return a.username.localeCompare(b.username);
      }
    });
    res.json({ message: "found some data", users: response });
  } catch (err) {
    res.json(err);
  }
});

router.put("/updateInstagram/:contactID", async (req, res) => {
  const contactID = req.params.contactID;
  const { instagram } = req.body;

  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      contactID,
      { instagram: instagram },
      { new: true }
    );
    res.json(updatedContact);
  } catch (err) {
    res.json(err);
  }
});

router.put("/updateFaceBook/:contactID", async (req, res) => {
  const contactID = req.params.contactID;
  const { facebook } = req.body;

  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      contactID,
      { facebook: facebook },
      { new: true }
    );
    res.json(updatedContact);
  } catch (err) {
    res.json(err);
  }
});
router.put("/updateYotube/:contactID", async (req, res) => {
  const contactID = req.params.contactID;
  const { youtube } = req.body;

  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      contactID,
      { youtube: youtube },
      { new: true }
    );
    res.json(updatedContact);
  } catch (err) {
    res.json(err);
  }
});
router.put("/updateEmail/:contactID", async (req, res) => {
  const contactID = req.params.contactID;
  const { email } = req.body;

  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      contactID,
      { email: email },
      { new: true }
    );
    res.json(updatedContact);
  } catch (err) {
    res.json(err);
  }
});
router.put("/updatePhoneNumber/:contactID", async (req, res) => {
  const contactID = req.params.contactID;
  const { phNo } = req.body;

  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      contactID,
      { phNo: phNo },
      { new: true }
    );
    res.json(updatedContact);
  } catch (err) {
    res.json(err);
  }
});
router.put("/updateX/:contactID", async (req, res) => {
  const contactID = req.params.contactID;
  const { x } = req.body;

  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      contactID,
      { x: x },
      { new: true }
    );
    res.json(updatedContact);
  } catch (err) {
    res.json(err);
  }
});

router.post("/addContactDetails", async (req, res) => {
  try {
    const newContact = new ContactModel(req.body);
    const contact = await ContactModel.findOne({ user: newContact.user });
    if (contact) {
      return res
        .status(400)
        .json({ message: "You should update you contactDetails" });
    }
    const response = await newContact.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

export { router as userRouter };
