import express from 'express';
import { ParseServer } from 'parse-server';
import path from 'path';
import dotenv from 'dotenv';
const __dirname = path.resolve();
import http from 'http';
import fs from 'fs';

const envFilePath = path.resolve(__dirname, '.env');
console.log('Loading .env file from:', envFilePath);

dotenv.config({ path: envFilePath });
console.log('dotenv configuration result:', dotenv.config());

export const config = {
  databaseURI: process.env.DB_URI,
  appId: process.env.APP_ID || 'defaultAppId', // Provide a default value if not set
  masterKey: process.env.MASTER_KEY || 'defaultMasterKey', // Provide a default value if not set
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Provide a default value if not set
  port: process.env.SERVER_PORT,
};
export const app = express();

app.use('/public', express.static(path.join(__dirname, '/public')));

(async () => {
  try {
    const server = new ParseServer(config);
    await server.start();
    app.use('/parse', server.app);
  } catch (error) {
    console.error('Error starting Parse Server:', error);
  }


  if (!process.env.TESTING) {
    const port = process.env.SERVER_PORT || 1337; // Provide a default value if not set
    const httpServer = http.createServer(app);
    httpServer.listen(port, function () {
      console.log('parse-server-example running on port ' + port + '.');
    });
  }
})();