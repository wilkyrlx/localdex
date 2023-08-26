import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import logger from './util/logger';

dotenv.config();

// TODO: change admin password, move into class
const mongoUri: string = `mongodb+srv://dbAdmin:${process.env.MONGO_DB_ADMIN_PASSWORD}@localdex-dev-cluster-0.3gefrrj.mongodb.net/?retryWrites=true&w=majority`;
const dbName: string = 'LocalDex-Dev-Cluster-0';
const collectionName: string = process.env.MONGO_DB_COLLECTION_NAME || "dev_collection";

class DatabaseManager {
    private client: MongoClient;

    constructor() {
        this.client = new MongoClient(mongoUri);
    }

    private getCollection() {
        const db = this.client.db(dbName);
        return db.collection(collectionName);
    }

    async databaseConnect() {
        return this.client.connect();
    }

    async authenticateIP(req: any, res: any) {
        if(req.ip == "IP") {
            res.status(201).json({result: "good IP"})
        }
    }

    /**
     * adds a contact to the collection
     * @param req.body - a Contact object 
     */
    async insertData(req: any, res: any) {
        const collection = this.getCollection();
        const data = req.body;
        try {
            const result = await collection.insertOne(data);
            logger.info(`Inserted data: ${JSON.stringify(data)}`);
            res.status(201).json(result);
        } catch (error) {
            logger.error(`Error inserting data, error: ${error}`);
            logger.error(`Error inserting data, data: ${JSON.stringify(data)}`);
            res.status(500).json({ error: 'Error inserting data' });
        }
    }


    async getData(req: any, res: any) {
        const collection = this.getCollection();
        try {
            const data = await collection.find({}).toArray();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: `Error retrieving data: ${error}` });
        }
    }
}

export default DatabaseManager;
