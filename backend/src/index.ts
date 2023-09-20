import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DatabaseManager from './mongoClient';
import DuplicateProcessor from './duplicateProcessor';
import Contact from '../../shared/types/Contact';

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());

const databaseManager = new DatabaseManager();

function isAuthenticated(req: any, res: any, next: any) {
    if (req.headers['localdex-api-key'] == process.env.REACT_APP_LOCALDEX_API_KEY) {
        return next(); // User is authenticated, proceed to the next middleware/route handler
    } else {
        res.status(401).send({error: `this client does not have access: ${req.headers['localdex-api-key']}`});
    }
}


async function main() {
    
    // Connect to the MongoDB cluster
    // remember to make sure IP is whitelisted on mongoDB if running locally - otherwise may see conn error
    await databaseManager.databaseConnect()

    // Insert contact
    app.post('/insertContact', (res, req) => { databaseManager.insertContact(res, req) });

    // Insert multiple contacts
    app.post('/insertMultipleContacts', (res, req) => { databaseManager.insertMultipleContacts(res, req) });

    // Update contact by ID
    app.post('/updateContact', (res, req) => { databaseManager.updateContact(res, req) });

    // Delete contact by ID
    app.post('/deleteContact', (res, req) => { databaseManager.deleteContact(res, req) });

    // Retrieve data
    app.get('/data', isAuthenticated, (res, req) => { databaseManager.getData(res, req) });

    app.get('/helloWorld', isAuthenticated, (req, res) => {
        res.status(200).json({ message: 'Hello World!' });
    });

    // FIXME: for some reason this is necessary for render deploy to work
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}
main().catch(console.error);
