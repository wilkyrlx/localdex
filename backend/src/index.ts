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



// function insertData(req: any, res: any) {
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);
//     const data = req.body;
//     collection.insertOne(data)
//         .then(result => {
//             logger.info(`Inserted data: ${JSON.stringify(data)}`);
//             res.status(201).json(result);
//         })
//         .catch(error => {
//             logger.error(`Error inserting data, error: ${error}`);
//             logger.error(`Error inserting data, data: ${JSON.stringify(data)}`);
//             res.status(500).json({ error: `Error inserting data` });
//         });
// }

// function getData(req: any, res: any) {
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);
//     collection.find({}).toArray()
//         .then(data => {
//             res.status(200).json(data);
//         })
//         .catch(error => {
//             res.status(500).json({ error: `Error retrieving data: ${error}` });
//         });
// }


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
