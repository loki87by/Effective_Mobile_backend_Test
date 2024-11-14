const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('product', {
    plu: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Product;
