const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Effective_mobile', 'god', 'IDDQD', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
