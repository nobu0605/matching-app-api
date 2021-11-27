import md5 from "md5";
import jwt from "jsonwebtoken";
import { secretKey } from "../constants/config";
import { UserModel } from "../models/user";
import express from "express";
const router = express.Router();

router.post("/", async function (req, res, next) {
  let user;
  let token;
  try {
    const exsistingUser = await UserModel.find({
      email: req.body.email,
    }).exec();

    if (exsistingUser.length > 0) {
      return res.status(400).send("This email adress is already registered");
    }
    user = new UserModel();
    user.username = req.body.username;
    user.password = md5(req.body.password);
    user.email = req.body.email;
    await user.save();
    token = await jwt.sign({ email: req.body.email }, secretKey, {
      expiresIn: "24h",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }

  res.status(200).send({ token: token, user: user });
});

export default router;
