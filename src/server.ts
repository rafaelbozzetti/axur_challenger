import express, { Response, Request } from 'express';
import VerifyContactList from './services/VerifyContactList';
import LoadCsvService from './services/LoadCsvService';
import LoadApiContacts from './services/LoadApiContacts';

const app = express();

app.use(express.json());

const contactList = new VerifyContactList();
contactList.execute().then(function(data) {
  const { name, type, listId } = data;
  if(type == 'new') {
    console.log(`Lista criada! \nId:${listId} Nome:${name}`);
    const loadList = new LoadCsvService();
    loadList.execute({listId:listId});
  }
});

app.get('/', function(request, response) {
  return response.json({'Message': 'Use /contacts endpoint to list contacts grouped by domain'});
});

app.get('/contacts', async function(request, response) {
  
  const loadApiContacts =  new LoadApiContacts();
  const result = await loadApiContacts.execute();
  return response.json(result);
});

app.listen(3333, () => {
  console.log("🚀️ Axur server started\n");
});
