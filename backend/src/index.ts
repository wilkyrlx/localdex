import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import logger from './util/logger';
import dotenv from 'dotenv';
import DatabaseManager from './mongoClient';

dotenv.config();
logger.info("=================== LOG BREAK ===================")
logger.info("Starting server...")

const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());

const databaseManager = new DatabaseManager();

async function main() {
    await databaseManager.databaseConnect()

    // Insert example data
    app.post('/insert', (res, req) => { databaseManager.insertData(res, req) });

    // Retrieve example data
    app.get('/data', (res, req) => { databaseManager.getData(res, req) });

    app.get('/helloWorld', (req, res) => {
        res.status(200).json({ message: 'Hello World!' });
    });

    // FIXME: for some reason this is necessary for render deploy to work
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        logger.info(`Server is running on http://localhost:${port}`);
    });

}

main().catch(console.error);
