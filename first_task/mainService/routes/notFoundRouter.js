const express = require("express");

const notFoundRouter = express.Router();

notFoundRouter.all("/*", async (req, res) => {
  res.status(404).json({
    error: "Такого эндпоинта не существует или используется неверный метод.",
  });
});

module.exports = notFoundRouter;
