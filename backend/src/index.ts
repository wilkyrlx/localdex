import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DatabaseManager from './mongoClient';
import DuplicateProcessor from './duplicateProcessor';

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
        res.status(401).send({ error: `this client does not have access: ${req.headers['localdex-api-key']}` });
    }
}



async function main() {

    // Connect to the MongoDB cluster
    // remember to make sure IP is whitelisted on mongoDB if running locally - otherwise may see conn error
    await databaseManager.databaseConnect()

    // Insert contact
    app.post('/insertContact', async (req, res) => {
        try {
            const data = await databaseManager.insertContact(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    });

    // Insert multiple contacts
    app.post('/insertMultipleContacts', async (req, res) => {
        try {
            const data = await databaseManager.insertMultipleContacts(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    });

    // Update contact by ID
    app.post('/updateContact', async (req, res) => {
        try {
            const data = await databaseManager.updateContact(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    });

    // Delete contact by ID
    app.post('/deleteContact', async (req, res) => {
        try {
            const data = await databaseManager.deleteContact(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    });

    // Retrieve data
    app.get('/data', isAuthenticated, async (req, res) => {
        try {
            const data = await databaseManager.getData();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    });

    app.get('/helloWorld', isAuthenticated, (req, res) => {
        res.status(200).json({ message: 'Hello World!' });
    });

    // FIXME: for some reason this is necessary for render deploy to work
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}
main().catch(console.error);
