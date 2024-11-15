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
      console.log(`\u001b[36mСервер логгирования запущен на порту: ${PORT}\u001B[0m`);
    });
  })
  .catch((error: Error) =>
    console.log(`\u001b[38;5;196mПри синхроне с БД произошла ошибка: ${error}\u001b[0m`)
  );
