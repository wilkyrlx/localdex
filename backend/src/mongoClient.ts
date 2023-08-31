import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

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



    /**
     * adds a contact to the collection
     * @param req.body - a Contact object 
     */
    async insertContact(req: any, res: any) {
        const collection = this.getCollection();
        const data = req.body;
        try {
            const result = await collection.insertOne(data);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Error inserting data' });
        }
    }

    async updateContact(req: any, res: any) {
        const collection = this.getCollection();
        const data = req.body;
        try {
            const result = await collection.updateOne({ _id: new ObjectId(data._id) }, { $set: data });
            console.log(`${result.matchedCount} document(s) matched and ${result.modifiedCount} document(s) modified`);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Error updating data' });
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
