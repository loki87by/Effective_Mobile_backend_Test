const express = require('express');
const sequelize = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log(`Сервер логгирования запущен на порту: ${PORT}`);
        });
    })
    .catch(error => console.log(`При синхроне с БД произошла ошибка: ${error}`));
