# The Period Purse - Backend Documentation

## For Developers

The backend setup followed [this guide](https://medium.com/swlh/how-to-create-your-first-mern-mongodb-express-js-react-js-and-node-js-stack-7e8b20463e66). You may consult this link to see what was followed.

Important: BodyParser was deprecated since the writing of this guide. It is not used for the backend.

## A word of warning

For development / sandbox purposes, the Mongo database is currently hosted on MongoDB Atlas, and only has 512MB of space allocated to it. 

**DO NOT INSERT A LOT OF DATA INTO IT.**

If the database grows too big, Tammy might decide to eat up all the data and it will all disappear.

All developers will be given the credentials to the **admin** user of the database. This means that you can **read AND write** to the database with these credentials.

You may delete db entries on your own, so if you make a mistake with the data you're inserting, you may go ahead and delete it yourself. You do not have to ask Chloe or Faye to delete it.

## Running the backend

To run the backend locally, you must:

1. Ask Chloe for the `.env` file. You will place it at the root of the `backend` folder. This means that it should be in the same folder as the `package.json` files.

The `.env` file contains the username and password to access the database. Git should be automatically configured to ignore `.env`, so we should not be seeing the `.env` file on our Github at all.

Ensure you are in the `backend` folder.

```bash
nodemon start
```

We are using `nodemon`, which will **restart the server everytime you edit your files.** Once you save your file, nodemon will rerun the server for you, so you don't have to manually run the server each time.

## Environment Set-Up (Windows)

Ensure that you have `node` and `npm` installed. To check if you have it on your system:

```bash
node -v
npm -v
```

Otherwise, please go to [Nodejs Download Page](https://nodejs.org/en/download/) and download the latest LTS version. This will install both Node and npm!

Next, navigate to the backend folder and install the npm dependencies for the backend.
```bash
cd the-period-purse/backend
npm install
```

You will also need the official MongoDB GUI called MongoDB Compass (version `1.29.4 stable`):

On the right hand side, you can select how you prefer to install applications (exe vs msi).

[Download MongoDB Compass](https://www.mongodb.com/try/download/compass) 

Once you have installed MongoDB Compass, ask Chloe for the login credentials to the database. She will give you a link to connect to the database!

## Environment Set-up (MacOS)

Ensure that you have `node` and `npm` installed. To check if you have it on your system by running this in your command line:

```bash
node -v
npm -v
```
Otherwise, please go to [Nodejs Download Page](https://nodejs.org/en/download/) and download the latest LTS version (`macOS Installer (.pkg)`). This will install both Node and npm!

You will also need the official MongoDB GUI called MongoDB Compass (version `1.29.4 stable`):

On the right hand side, select the only MacOS option and download it.

[Download MongoDB Compass](https://www.mongodb.com/try/download/compass)

Once you have installed MongoDB Compass, ask Chloe for the login credentials to the database. She will give you a link to connect to the database!

## Envrionment Set-up (Linux)

TBD
