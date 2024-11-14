import { Router, Request, Response } from "express";
import { Op, WhereOptions } from "sequelize";
import Actions from "./model";

const router = Router();

router.post("/log", async (req, res) => {
  try {
    const action = await Actions.create(req.body);
    res.status(201).json(action);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Произошла неизвестная ошибка." });
    }
  }
});

router.get("/history", async (req: Request, res: Response): Promise<any> => {
  const {
    shop_id,
    plu,
    startDate,
    endDate,
    action,
    limit = "10",
    offset = "0",
  } = req.query;

  try {
    const filters: WhereOptions = {};

    if (shop_id) {
      filters.shop_id = shop_id;
    }
    if (plu) {
      filters.plu = plu;
    }

    if (startDate) {
      const date = new Date(startDate as unknown as string | number | Date);
      if (isNaN(date.getTime())) {
        return res.status(400).json({
          error: "Недействительная дата или формат даты не корректен",
        });
      }
      if (!filters.timestamp) filters.timestamp = {};
      filters.timestamp[Op.gte] = date;
    }

    if (endDate) {
      const date = new Date(endDate as unknown as string | number | Date);
      if (isNaN(date.getTime())) {
        return res.status(400).json({
          error: "Недействительная дата или формат даты не корректен",
        });
      }
      if (!filters.timestamp) filters.timestamp = {};
      filters.timestamp[Op.lte] = date;
    }

    if (action) {
      filters.action = action;
    }

    if (isNaN(+limit)) {
      return res.status(400).json({
        error: "Не корректно передан лимит",
      });
    }

    if (isNaN(+offset)) {
      return res.status(400).json({
        error: "Не корректно передан номер страницы",
      });
    }

    const history = await Actions.findAll({
      where: filters,
      limit: +limit,
      offset: +offset,
    });

    res.json(history);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Произошла неизвестная ошибка.",
    });
  }
});

router.all("/*", async (req, res) => {
  res.status(404).json({ error: "Такого эндпоинта не существует или используется неверный метод." });
})

export default router;
