import dotenv from 'dotenv';
import express from 'express';
import cors, { CorsOptions } from 'cors';

dotenv.config();

const { API_PORT } = process.env;

const app = express();

const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.send('Hello World!');
});

if (require.main === module) {
  try {
    app.listen(API_PORT, () => {
      console.log(`API server listening on port ${API_PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
