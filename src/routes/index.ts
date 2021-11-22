var express = require("express");
var router = express.Router();
// var mongoose = require("mongoose");
import mongoose from "mongoose";
import { UserModel } from "../models/user-model";

const getUsers = async () => {
  try {
    await mongoose.connect("mongodb://root:root@mongo:27017");
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
