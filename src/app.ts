import express from "express";
import bodyParser from "body-parser";
import Routes from "./routes";
import cors from "cors";

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

new Routes(app);

export default app;
