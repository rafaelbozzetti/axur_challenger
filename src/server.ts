import express, { response } from 'express';
import { contacts } from './routes';

const app = express();

app.get('/contacts', contacts);

app.listen(3333, () => {
  console.log('🤖️ Axur server started');
});
