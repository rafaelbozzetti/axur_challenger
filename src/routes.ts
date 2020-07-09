import { Response, Request, request } from 'express';
import LoadApiContacts from './services/LoadApiContacts';

export function contacts(request: Request, response: Response) {
    const loadApiContacts = new LoadApiContacts();
    const contacts = loadApiContacts.execute();
    return response.json(contacts);
};
