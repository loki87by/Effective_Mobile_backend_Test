import express from "express";
import cors from "cors";
import sequelize from "./db";
import router from "./router";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use("/", router);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер логгирования запущен на порту: ${PORT}`);
    });
  })
  .catch((error: Error) =>
    console.log(`При синхроне с БД произошла ошибка: ${error}`)
  );
