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
    async insertContact(data: any) {
        const collection = this.getCollection();
        try {
            const result = await collection.insertOne(data);
            return result;
        } catch (error) {
            throw new Error(`Error inserting data: ${error}`);
        }
    }

    async insertMultipleContacts(data: any) {
        const collection = this.getCollection();
        try {
            const result = await collection.insertMany(data);
            return result;
        } catch (error) {
            throw new Error(`Error inserting data: ${error}`);
        }
    }

    async updateContact(data: any) {

        // const documentIdToUpdate: ObjectId = new ObjectId('64eac72400e15a6fc87c6fe1');

        const collection = this.getCollection();
        const documentIdToUpdate: ObjectId = new ObjectId(data._id);
        const dataToUpdate = data;
        delete dataToUpdate._id;

        try {
            const result = await collection.updateOne({ _id: documentIdToUpdate }, { $set: dataToUpdate });
            console.log(`${result.matchedCount} document(s) matched and ${result.modifiedCount} document(s) modified, ID was ${data._id}`);
            return result;
        } catch (error) {
            throw new Error(`Error updating data: ${error}`);
        }
    }

    async deleteContact(data: any) {
        const collection = this.getCollection();
        const documentIdToDelete: ObjectId = new ObjectId(data._id);
        try {
            const result = await collection.deleteOne({ _id: documentIdToDelete });
            console.log(`${result.deletedCount} document(s) deleted, ID was ${data._id}`);
            return result;
        } catch (error) {
            throw new Error(`Error deleting data: ${error}`);
        }
    }
    
    async getData() {
        const collection = this.getCollection();
        try {
            const data = await collection.find({}).toArray();
            return data;
        } catch (error) {
            throw new Error(`Error retrieving data: ${error}`);
        }
    }
}

export default DatabaseManager;
