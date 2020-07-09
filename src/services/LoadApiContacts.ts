import * as hubspot from '@hubspot/api-client';
import { config } from '../config';
import VerifyContactList from './VerifyContactList';

class LoadApiContacts {

    public async execute() {

        const hubspotClient = new hubspot.Client({ apiKey: config.api_key });

        const contactList = new VerifyContactList();
        const resultContactList = await contactList.execute();

        const { listId } = resultContactList;
        const responseAllContacts = await hubspotClient.apiRequest({
          method: 'GET',
          path: `/contacts/v1/lists/${listId}/contacts/all?hapikey=${config.api_key}&property=email`
        });

        const { contacts } = responseAllContacts.body;

        const domains = [];

        contacts.map(async function(contact) {
          const email = contact.properties.email.value;
          const domain = email.split('@')[1];
          domains[domain] = (domains[domain] ? domains[domain] + 1 : 1);
        });

        const resultDomains = [];
        for(const k in domains) {
          resultDomains = {"domain": k, "quantity": domains[k]};
        }

        return resultDomains;
    }

}

export default LoadApiContacts;
