import express from "express";
import indexRouter from "./routes/index";
import dotenv from "dotenv";
dotenv.config();

const app: express.Express = express();
const port = 3000;
app.use("/", indexRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
