# InstaShop

## Introduction
This repository contains a project with a backend built on Node.js and a frontend using Angular. Follow the instructions below to set up and run the project successfully.

## Backend Setup

```bash
# Clone the repository
git clone https://github.com/nektgr/InstaShop.git
```
### Navigate to the backend directory
```bash
cd backend
```
### Create an .env file
```text
NODE_ENV: Specifies the environment in which the application is running (development, production, etc.).
NODE_ENV=

DB_URI: The URI or connection string for your database.
DB_URI=

APP_ID: The application ID for your Parse Server.
APP_ID=

MASTER_KEY: The master key used for administrative tasks in Parse Server.
MASTER_KEY=

PUBLIC_SERVER_URL: The public URL of your Parse Server accessible from the client side.
PUBLIC_SERVER_URL=

SERVER_URL: The URL of your Parse Server used for internal communication (not exposed to the client side).
SERVER_URL=

SERVER_PORT: The port on which your Parse Server is running.
SERVER_PORT=

APP_NAME: The name of your application.
APP_NAME=

APP_USER: The username for a specific purpose or user (dashboard).
APP_USER=

APP_PASS: The password associated with the specified username.
APP_PASS=

cookieSessionSecret: A secret key used for signing session cookies.
cookieSessionSecret=
```
### Install dependencies
```bash
npm install
```
### Run the backend server
```bash
npm run start
```

# Frontend Setup
```bash
# Navigate to the frontend directory
cd landmark-app
```

### Create an `environment.ts` file

In the `environment.ts` file, you can configure various environment-specific settings. Below is an example with comments explaining each field:

```typescript
// In the 'environment.ts' file, you can configure various environment-specific settings.

export const environment = {
  // Set to 'true' for production environment, 'false' for development environment.
  production: false,
  
  // The API URL where the backend server is hosted.
  apiUrl: 'https://example.com/api',

  // Your application's unique identifier.
  appId: 'your_app_id',

  // Width of photos used in the application.
  PHOTO_WIDTH: '800px',

  // Height of photos used in the application.
  PHOTO_HEIGHT: '600px'
};
```

### Install dependencies
```bash
npm install
```
### Run the frontend development server
```bash
ng serve
```
# Access the Application
### Once both the backend and frontend servers are running, you can access the application in your web browser at the following address:

# Frontend: http://localhost:4200/
# Backend (dashboard): http://localhost:5000/dashboard 
###### Make sure the backend and frontend servers are running simultaneously for the complete functionality of the application.

# Testing 
### For backend testing
- navigate to backend and run:
```bash
npm test
```

### For frontend testing 
-navigate to landmark-app
```bash
ng test
```
