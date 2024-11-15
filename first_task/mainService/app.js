const express = require('express');
const cors = require ("cors");
const sequelize = require('./db');
const stockRouter = require('./routes/stockRouter');
const productRouter = require('./routes/productRouter');
const notFoundRouter = require('./routes/notFoundRouter');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use('/stocks', stockRouter);
app.use('/products', productRouter);
app.use('/*', notFoundRouter);

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log(`Сервер логгирования запущен на порту: ${PORT}`);
        });
    })
    .catch(error => console.log(`При синхроне с БД произошла ошибка: ${error}`));
