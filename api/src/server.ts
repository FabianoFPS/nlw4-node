import express, { Request, Response } from 'express';
import { log } from 'debug';

const app = express();
app.use(express.json());

app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello Word NLW#4' });
});

app.post('/', (request: Request, response: Response) => {
  const {info} = request.body;
  return response.json({ message: `${info}: Os dados foram salvos com sucesso!` });
});

app.listen(3333, log('Server listem port 3333'));
