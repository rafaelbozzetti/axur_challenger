import express, { Response, Request } from 'express';
import { contacts } from './routes';
import VerifyContactList from './services/VerifyContactList';
import LoadCsvService from './services/LoadCsvService';

const app = express();

app.use(express.json());

const contactList = new VerifyContactList();

contactList.execute().then(function(data) {

  const { name, type, listId } = data;

  if(type == 'new') {
    console.log( `Lista criada: ${name}`);

    const loadList = new LoadCsvService();
    loadList.execute({listId:listId});
  }

});

app.get('/', function(request, response) {
  return response.json({'Message': 'User /contacts endpoint to list contacts grouped by domain'});
});

app.get('/contacts', contacts);

app.listen(3333, () => {
  console.log('Axur server started');
});
