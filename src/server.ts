import express, { Response, Request } from 'express';
import { contacts } from './routes';

import UpdateUserAvatarService from './services/LoadCsvService';

const app = express();
app.use(express.json());

app.get('/', async function(request: Request, response : Response ) {
  const service = new UpdateUserAvatarService();
  const data = await service.execute({fileName: 'contacts.csv'});

  //console.log(data);
  return response.json(data);
});

app.get('/contacts', contacts);

app.listen(3333, () => {
  console.log('🤖️ Axur server started');
});
