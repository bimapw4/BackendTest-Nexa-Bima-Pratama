import express from "express";
import 'dotenv/config'

import router from './routes/routes.js';


const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(` ${process.env.APP_NAME} listening on port ${port}`);
});