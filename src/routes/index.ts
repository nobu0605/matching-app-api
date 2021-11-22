import express from "express";
var router = express.Router();
import mongoose from "mongoose";
import { UserModel } from "../models/user-model";

const getUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const user = await UserModel.find({}).exec();

    return user;
  } catch (error) {
    console.error(error);
  }
};

export default router.get("/", async function (req, res, next) {
  const users = await getUsers();

  res.status(200).send(users);
});
