import express, { response } from 'express';

const app = express();

app.get('/contacts', function() {
    console.log('contacts');
});

app.listen(3333, () => {
  console.log('🤖️ Axur server started');
});
