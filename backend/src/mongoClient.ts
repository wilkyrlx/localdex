import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// TODO: change admin password, move into class
const mongoUri: string = `mongodb+srv://dbAdmin:${process.env.MONGO_DB_ADMIN_PASSWORD}@localdex-dev-cluster-0.3gefrrj.mongodb.net/?retryWrites=true&w=majority`;
const dbName: string = process.env.MONGO_DB_DB_NAME || 'LocalDex-Dev-Cluster-0';
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

    async insertMultipleContacts(req: any, res: any) {
        const collection = this.getCollection();
        const data = req.body;
        try {
            const result = await collection.insertMany(data);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Error inserting data' });
        }
    }

    async updateContact(req: any, res: any) {

        // const documentIdToUpdate: ObjectId = new ObjectId('64eac72400e15a6fc87c6fe1');

        const collection = this.getCollection();
        const data = req.body;
        const documentIdToUpdate: ObjectId = new ObjectId(data._id);
        const dataToUpdate = data;
        delete dataToUpdate._id;

        try {
            const result = await collection.updateOne({ _id: documentIdToUpdate }, { $set: dataToUpdate });
            console.log(`${result.matchedCount} document(s) matched and ${result.modifiedCount} document(s) modified, ID was ${data._id}`);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Error updating data' });
        }
    }

    async deleteContact(req: any, res: any) {
        const collection = this.getCollection();
        const data = req.body;
        const documentIdToDelete: ObjectId = new ObjectId(data._id);
        try {
            const result = await collection.deleteOne({ _id: documentIdToDelete });
            console.log(`${result.deletedCount} document(s) deleted, ID was ${data._id}`);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Error deleting data' });
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
