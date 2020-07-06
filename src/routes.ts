import { Response, Request, request } from 'express';
import LoadApiContacts from './services/LoadApiContacts';
import LoadCsvService from './services/LoadCsvService';

export function contacts(request: Request, response: Response) {

    const loadApiContacts = new LoadApiContacts();
    const contacts = loadApiContacts.execute();
    return response.json(contacts);
};

export function populate(request: Request, response: Response) {

    const loadCsvService = new LoadCsvService();
    const data = loadCsvService.execute({fileName: 'contacts.csv'});
    return response.json(data);
};