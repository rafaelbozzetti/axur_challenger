import * as hubspot from '@hubspot/api-client';
import { config } from '../config';

class LoadApiContacts {

    public async execute() {

        const hubspotClient = new hubspot.Client({ apiKey: config.api_key })

        const allContacts = await hubspotClient.crm.contacts.getAll();

        const contacts = [];

        allContacts.map(contact  => {
            const newContact = contact.properties;
            contacts.push(newContact);
        });

        return contacts;
    }

}

export default LoadApiContacts;