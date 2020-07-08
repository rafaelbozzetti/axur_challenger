import express, { Response, Request } from 'express';
import { contacts } from './routes';
import VerifyContactList from './services/VerifyContactList';
import LoadCsvService from './services/LoadCsvService';

const app = express();

app.use(express.json());


const contactList = new VerifyContactList();
contactList.execute().then(function(data) {
 
  const { type, listId } = data;

  if(type == 'new') {
    const loadList = new LoadCsvService();
    loadList.execute({listId:listId});
  }

});





//app.get('/contacts', contacts);

app.listen(3333, () => {
  console.log('Axur server started');
});
