import { Response, Request } from 'express';
import LoadApiContacts from './services/LoadApiContacts';

export function contacts(request: Request, response: Response) {

    const loadApiContacts = new LoadApiContacts();
    const contacts = loadApiContacts.execute();

    console.log(contacts);

    return response.json(contacts);
};
