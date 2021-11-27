import express from "express";
const router = express.Router();
import { UserModel } from "../models/user";
import jwt_decode from "jwt-decode";

type Decoded = {
  user_id: string;
  iat: number;
  exp: string;
};

router.get("/", async function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers["access-token"];
  let decoded: Decoded = jwt_decode(token);

  let user;
  try {
    user = await UserModel.find(
      { _id: decoded.user_id },
      { _id: true, username: true, password: true, email: true }
    ).exec();
  } catch (error) {
    console.error(error);
  }
  res.status(200).send(user[0]);
});

export default router;
