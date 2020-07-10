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
    console.log(`\nContact list created! \nId:${listId} Name:${name} \n`);
    const loadList = new LoadCsvService();
    loadList.execute( {listId:listId} ).then(function() {
      console.log('CSV import finished');
    });
  }

});

app.get('/contacts', async function(request: Request, response: Response) {
  
  const loadApiContacts =  new LoadApiContacts();
  const result = await loadApiContacts.execute();
  return response.json(result);

});

app.get('/', function(request: Request, response: Response) {
  
  return response.json({'Message': 'Use /contacts endpoint to list contacts grouped by domain'});

});

app.listen(3333, () => {
  console.log("🚀️ Axur started\n");
});
