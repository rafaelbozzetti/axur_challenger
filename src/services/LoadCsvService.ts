
import fs from 'fs';
import path from 'path';
import * as hubspot from '@hubspot/api-client';
import { config } from '../config';
import csv from 'csv-parser';

interface Request {
    listId: number;
}

class LoadCsvService {

    public async execute({listId}:Request) {

        const hubspotClient = new hubspot.Client({ apiKey: config.api_key });

        const fileName = config.csv_load_file;
        
        const filePath = path.resolve(__dirname, '..', 'data' );

        fs.createReadStream(`${filePath}/${fileName}`)
        .pipe(csv())
        .on('data', async (row) => {

            const contactProperties = {
                "properties": [
                {
                    "property": "email",
                    "value": row.email
                },
                {
                    "property": "firstname",
                    "value": row.first_name
                },
                {
                    "property": "lastname",
                    "value": row.last_name
                },
                {
                    "property": "gender",
                    "value": row.gender
                },
            ]};

            const createResponse = await hubspotClient.apiRequest({
                method: 'POST',
                path: `/contacts/v1/contact/?hapikey=${config.api_key}`,
                body: contactProperties,
            });

            const { vid } = createResponse.body;

            const contactListProperties = {
                "vids": [
                    vid
                ]
            }

            try {
                const addListResponse = await hubspotClient.apiRequest({
                    method: 'POST',
                    path: `/contacts/v1/lists/${listId}/add/?hapikey=${config.api_key}`,
                    body: contactListProperties
                });

            }catch(err) {
                console.log(err);
            }

        })
        .on('end', () => {
            console.log('Importação finalizada');
        });

        return true;
    }

}

export default LoadCsvService;
