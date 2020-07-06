import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import * as hubspot from '@hubspot/api-client';
import { config } from '../config';


interface Request {
    fileName: string;    
}

class LoadCsvService {

    public async execute({fileName}:Request) {

      const filePath = path.resolve(__dirname, '..', 'data' );

      const hubspotClient = new hubspot.Client({ apiKey: config.api_key })
      const importRequest = {
          name: 'LISTA RAFAEL',
          files: [
              {
                  fileName: fileName,
                  fileImportPage: {
                      hasHeader: true,
                      columnMappings: [
                          {
                              columnName: 'First Name',
                              propertyName: 'firstname',
                              columnObjectType: 'CONTACT',
                          },
                          {
                            columnName: 'Last Name',
                            propertyName: 'lastname',
                            columnObjectType: 'CONTACT',
                          },
                          {
                              columnName: 'Email',
                              propertyName: 'email',
                              columnObjectType: 'CONTACT',
                          },
                      ],
                  },
              },
          ],
      }

      const importFilePath = `${filePath}/${fileName}`
      const importFileReadStream = fs.createReadStream(importFilePath)
      const result = await hubspotClient.crm.imports.coreApi.create(JSON.stringify(importRequest), importFileReadStream)
      
      console.log('Contatos Carregados');
      console.log(JSON.stringify(result.body))

    }

}

export default LoadCsvService;