const express = require("express");
const { Op } = require("sequelize");
const Stock = require("../models/stock");
const Product = require("../models/product");

const stockRouter = express.Router();

stockRouter.post("/", async (req, res) => {
  const { in_cell, in_order, product_id, shop_id } = req.body;
  if (in_cell < 0 || in_order < 0) {
    res.status(400).json({
      error: `Значение поля ${in_cell < 0 ? "in_cell" : "in_order"} не может быть отрицательным.`,
    });
    return;
  }
  try {
    const oldStock = await Stock.findAll({
      where: {
        product_id: product_id,
        shop_id: shop_id,
      },
    });

    if (oldStock.length > 0) {
      await Stock.update(req.body, {
        where: {
          product_id: product_id,
          shop_id: shop_id,
        },
      });
      const updatedStock = await Stock.findOne({
        where: {
          product_id: product_id,
          shop_id: shop_id,
        },
      });

      res.status(200).json(updatedStock);
      return;
    }
    const stock = await Stock.create(req.body);
    res.status(201).json(stock);
  } catch (error) {
    const message = error.message.includes("stock_fk")
      ? `Продукт с id=${product_id} не зарегистрирован в системе.`
      : error.message;
    res.status(400).json({ error: message });
  }
});

stockRouter.get("/", async (req, res) => {
  try {
    const filters = {};

    if (req.query.in_cell) {
      if (!isNaN(+req.query.in_cell)) {
        filters.in_cell = +req.query.in_cell;
      } else {
        const [min, max] = req.query.in_cell.split(",").map(Number);

        if (!isNaN(min) && !isNaN(max)) {
          filters.in_cell = { [Op.between]: [min, max] };
        }
      }
    }

    if (req.query.in_order) {
      if (!isNaN(+req.query.in_order)) {
        filters.in_cell = +req.query.in_order;
      } else {
        const [min, max] = req.query.in_order.split(",").map(Number);

        if (!isNaN(min) && !isNaN(max)) {
          filters.in_order = { [Op.between]: [min, max] };
        }
      }
    }

    Object.keys(req.query).forEach((key) => {
      if (!["in_cell", "in_order", "plu"].includes(key)) {
        filters[key] = req.query[key];
      }
    });

    if (req.query.plu) {
      const prod = await Product.findOne({
        where: {
          plu: req.query.plu,
        },
      });
      const id = prod.id;
      filters.product_id = id;
    }

    const stocks = await Stock.findAll({ where: filters });

    res.json(stocks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

stockRouter.put("/increase", async (req, res) => {
  try {
    const stock = await Stock.findByPk(req.body.id);
    if (!stock) {
      return res
        .status(404)
        .json({ error: "Не найден товар для исправления остатка." });
    }

    stock.in_cell += +req.body.amount;
    await stock.save();
    res.json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

stockRouter.put("/decrease", async (req, res) => {
  try {
    const stock = await Stock.findByPk(req.body.id);
    if (!stock) {
      return res
        .status(404)
        .json({ error: "Запасы товара иссякли, ожидайте новых поступлений." });
    }

    stock.in_cell -= req.body.amount;
    stock.in_order += req.body.amount;
    if (stock.in_cell > 0) {
      await stock.save();
      res.json(stock);
    } else {
      res
        .status(400)
        .json({ error: "Запас товара на полке меньше указанного в запросе" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = stockRouter;
