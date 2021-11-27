import express from "express";
const router = express.Router();
import { UserModel } from "../models/user";
import md5 from "md5";
import jwt from "jsonwebtoken";
import { secretKey } from "../constants/config";

router.post("/", async function (req, res, next) {
  let user;
  let token;
  try {
    user = await UserModel.find({ email: req.body.email }).exec();
    if (user.length === 0 || md5(req.body.password) !== user[0].password) {
      return res.status(400).send("The email adress or password is wrong.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }

  token = await jwt.sign({ user_id: user[0]._id }, secretKey, {
    expiresIn: "10h",
  });
  res.status(200).send({ token: token, user: user[0] });
});

export default router;
