import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Effective_mobile", "summer", "arctic_fox", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
