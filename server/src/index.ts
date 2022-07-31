import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import FakerController from './controllers/FakerController';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hey There!');
});

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Hey There, This is an api endpoint!',
    status: 'success',
    code: 200,
  });
});

app.get('/api/faker', async (req, res) => await FakerController(req, res));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at  http://127.0.0.1:${PORT}`);
});
