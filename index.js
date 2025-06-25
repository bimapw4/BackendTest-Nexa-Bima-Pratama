import express from "express";
import 'dotenv/config'

import router from './routes/routes.js';
import { logTransaction } from './middleware/log_trx_api.js';

const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());
app.use(logTransaction);
app.use(router);

app.listen(port, () => {
  console.log(` ${process.env.APP_NAME} listening on port ${port}`);
});