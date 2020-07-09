import * as hubspot from '@hubspot/api-client';
import { config } from '../config';

class VerifyContactList {

    public async execute() {
        
        const hubspotClient = new hubspot.Client({ apiKey: config.api_key });

        try {

           const response = await hubspotClient.apiRequest({
              method: 'GET',
              path: '/contacts/v1/lists/static',
            });
  
            const allLists = response.body.lists;
  
            const myList = allLists.map(function(list) {
                const regexp = `${config.list_name}`;
                if(list.name.match(regexp)) {
                    list.type = 'existent';
                    return list;
                }
            });

            if(myList.length == 0) {
                const timestamp =  new Date().getTime();

                try {
                    const createList = await hubspotClient.apiRequest({
                        method: 'POST',
                        path: '/contacts/v1/lists',
                        body: {"name": `${config.list_name}.${timestamp}`, "dynamic": false },
                    });
                
                    const newList = createList.body;
                    newList.type = 'new';

                    return newList;
            
                } catch (err) {
                    console.log(err);
                }
            }else{
                return myList[0];
            }
  
        }catch(err) {
  
        }  
    }
}

export default VerifyContactList;
