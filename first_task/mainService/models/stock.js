const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Product = require("./product");

const Stock = sequelize.define("stock", {
  in_cell: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  in_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shop_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Stock.belongsTo(Product, {
  foreignKey: "product_id",
});

module.exports = Stock;
