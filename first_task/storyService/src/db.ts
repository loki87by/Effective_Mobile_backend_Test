import { Sequelize } from 'sequelize';

const db = new Sequelize('db', 'login', 'pass', {
    host: 'localhost',
    dialect: 'postgres',
});

export default db;
