import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import logger from './util/logger';


const mongoUri = `mongodb+srv://dbAdmin:${"admin"}@localdex-dev-cluster-0.3gefrrj.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'LocalDex-Dev-Cluster-0';
const collectionName = 'dev_collection';

const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());

logger.info("=================== LOG BREAK ===================")
logger.info("Starting server...")

// Connect to MongoDB Atlas
MongoClient.connect(mongoUri)
    .then(client => {
        console.log('Connected to MongoDB Atlas');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Insert example data
        app.post('/insert', (req, res) => {
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
            collection.find({}).toArray()
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    res.status(500).json({ error: 'Error retrieving data' });
                });
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
            logger.info(`Server is running on http://localhost:${port}`)
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });