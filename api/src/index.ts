import express from 'express';

const app = express();
const PORT = 8000;
app.get('/', (_, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
  console.log(`Server is running at https://localhost:${PORT}`)
});
