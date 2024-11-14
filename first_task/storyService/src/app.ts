import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Сервер логгирования запущен на порту: ${PORT}`);
});
