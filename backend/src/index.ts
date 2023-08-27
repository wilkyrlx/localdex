import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import logger from './util/logger';
import dotenv from 'dotenv';
import DatabaseManager from './mongoClient';

dotenv.config();
logger.info("=================== LOG BREAK ===================")
logger.info("Starting server...")

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());

const databaseManager = new DatabaseManager();

// TODO: change to something more secure than IP
function isAuthenticated(req: any, res: any, next: any) {
    if (req.ip == process.env.WHITELISTED_IP) {
        return next(); // User is authenticated, proceed to the next middleware/route handler
    } else {
        res.status(401).send({error: `this IP does not have access: ${req.ip}`});
    }
}


async function main() {
    
    await databaseManager.databaseConnect()

    // Insert example data
    app.post('/insertContact', (res, req) => { databaseManager.insertContact(res, req) });

    // Retrieve example data
    app.get('/data', isAuthenticated, (res, req) => { databaseManager.getData(res, req) });

    app.get('/helloWorld', isAuthenticated, (req, res) => {
        res.status(200).json({ message: 'Hello World!' });
    });

    // FIXME: for some reason this is necessary for render deploy to work
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        logger.info(`Server is running ${port}`);
    });

}
console.log(process.env.WHITELISTED_IP)
main().catch(console.error);
