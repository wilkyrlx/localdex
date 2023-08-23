import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import logger from './util/logger';
import dotenv from 'dotenv';

dotenv.config();
logger.info("=================== LOG BREAK ===================")
logger.info("Starting server...")

// TODO: change admin password
const mongoUri: string = `mongodb+srv://dbAdmin:${process.env.MONGO_DB_ADMIN_PASSWORD}@localdex-dev-cluster-0.3gefrrj.mongodb.net/?retryWrites=true&w=majority`;
const dbName: string = 'LocalDex-Dev-Cluster-0';
const collectionName: string = process.env.MONGO_DB_COLLECTION_NAME || "dev_collection";

const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(mongoUri);

async function insertData(collection: any, data: any) {
    try {
        const result = await collection.insertOne(data);
        logger.info(`Inserted data: ${JSON.stringify(data)}`);
        return result;
    } catch (error) {
        logger.error(`Error inserting data, error: ${error}`);
        logger.error(`Error inserting data, data: ${JSON.stringify(data)}`);
        throw new Error('Error inserting data');
    }
}

async function retrieveData(collection: any) {
    try {
        const data = await collection.find({}).toArray();
        return data;
    } catch (error) {
        throw new Error('Error retrieving data');
    }
}


async function main() {
    await client.connect();

    // Insert example data
    app.post('/insert', (req, res) => {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const data = req.body;
        collection.insertOne(data)
            .then(result => {
                logger.info(`Inserted data: ${JSON.stringify(data)}`)
                res.status(201).json(result);
            })
            .catch(error => {
                logger.error(`Error inserting data, error: ${error}`)
                logger.error(`Error inserting data, data: ${JSON.stringify(data)}`)
                res.status(500).json({ error: `Error inserting data` });
            });
    });

    // Retrieve example data
    app.get('/data', (req, res) => {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.find({}).toArray()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(error => {
                res.status(500).json({ error: `Error retrieving data: ${error}` });
            });
    });

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
