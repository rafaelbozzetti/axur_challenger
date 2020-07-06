import express, { Response, Request } from 'express';
import { contacts, populate } from './routes';

const app = express();

app.use(express.json());


app.get('/', populate);
app.get('/contacts', contacts);


app.listen(3333, () => {
  console.log('🤖️ Axur server started');
});
