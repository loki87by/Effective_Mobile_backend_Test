import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./db";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер логгирования запущен на порту: ${PORT}`);
    });
  })
  .catch((error: Error) =>
    console.log(`При синхроне с БД произошла ошибка: ${error}`)
  );
