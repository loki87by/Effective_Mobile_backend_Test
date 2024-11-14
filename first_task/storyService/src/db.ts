import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db', 'login', 'pass', {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize;
