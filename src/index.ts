import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user";
import loginRouter from "./routes/login";
import registerRouter from "./routes/register";
import schema from "./schemas";
import jwt from "jsonwebtoken";
import { secretKey } from "./constants/config";

mongoose.connect('mongodb://root:root@mongodb-primary:27017,mongodb-secondary:27017,mongodb-arbiter:27017',{
  replicaSet      : 'rs0',
})
const app: express.Express = express();
const port = 3000;

app.use(
  cors({
    origin: process.env.FRONT_BASE_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "cookie", "access-token"],
  })
);
app.use(bodyParser.json());
app.use("/login", loginRouter);
app.use("/register", registerRouter);

const server = new ApolloServer({
  schema: schema,
});
server.applyMiddleware({
  app,
  path: "/graphql",
});

app.use(function (req: any, res: any, next: any) {
  let token = req.body.token || req.query.token || req.headers["access-token"];
  if (!token) {
    return res
      .status(403)
      .send({ success: false, message: "No token provided." });
  }

  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      return res.json({ success: false, message: "Invalid token." });
    }

    req.decoded = decoded;
    next();
  });
});

app.use("/user", userRouter);

app.listen(port, () => console.info(`App listening on port ${port}!`));
