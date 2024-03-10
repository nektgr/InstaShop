// Import necessary modules and libraries
import express from 'express';
import { ParseServer } from 'parse-server';
import path from 'path';
import dotenv from 'dotenv';
import http from 'http';
import ParseDashboard from 'parse-dashboard';

// Resolving the path for the environment variables file and configuring dotenv to use the specified environment variables file 
const __dirname = path.resolve();
const envFilePath = path.resolve(__dirname, '.env');
dotenv.config({ path: envFilePath });

// Configuration settings for Parse Server
export const config = {
  // MongoDB connection URI
  databaseURI: process.env.DB_URI,
  // Parse Server application ID with a default value
  appId: process.env.APP_ID || 'defaultAppId',
  // Parse Server master key with a default value
  masterKey: process.env.MASTER_KEY || 'defaultMasterKey',
  // Parse Server URL with a default value
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
  // Port for the server to listen on
  port: process.env.SERVER_PORT,
};

// Create an Express app instance
export const app = express();
app.use('/public', express.static(path.join(__dirname, '/public')));

// Asynchronous IIFE for starting Parse Server
(async () => {
  try {
    // Create a new Parse Server instance and start it
    const server = new ParseServer(config);
    await server.start();
    app.use('/parse', server.app);

    // Create Parse Dashboard instance with configuration settings
    const dashboard = new ParseDashboard({
      "apps": [
        {
          "serverURL": process.env.SERVER_URL,
          "appId": process.env.APP_ID,
          "masterKey": process.env.MASTER_KEY,
          "appName": process.env.APP_NAME
        }
      ],
      "users": [
        {
          "user": process.env.APP_USER,
          "pass": process.env.APP_PASS
        },
      ]
    });

    // Mount Parse Dashboard at the '/dashboard' endpoint of the Express app
    app.use('/dashboard', dashboard);

    // Serve the test.html file for the '/test' endpoint
    app.get('/test', function (req, res) {
      res.sendFile(path.join(__dirname, '/public/test.html'));
    });

  } catch (error) {
    // Handle errors while starting Parse Server
    console.error('Error starting Parse Server:', error);
  }

  // Start the server only if not in testing mode
  if (!process.env.TESTING) {
    // Use the specified port or default to 1337
    const port = process.env.SERVER_PORT || 1337;
    const httpServer = http.createServer(app);
    httpServer.listen(port, function () {
      console.log('parse-server-example running on port ' + port + '.');
    });
  }
})();
