const {MongoClient} = require("mongodb");
require('dotenv').config();

const uri = process.env.MONGO_DB_URL;
const collectionName=process.env.MONGO_DB_COLLECTION_NAME
const client = new MongoClient(uri);

const updateOrCreate = async (documentName, payload) => {
    try {
        await client.connect();
        const db = client.db(collectionName);
        const collection = db.collection(documentName);
        const query = {id: payload.id};
        const update = {$set: payload};
        const options = {upsert: true};
        const result = await collection.updateOne(query, update, options);
        console.log(result);
    } catch (error) {
        console.log("error: ", error)
    }
};

const deleteDoc = async (documentName, payload) => {
    try {
        await client.connect();
        const db = client.db(collectionName);
        const query = {id: payload.id};
        const collection = db.collection(documentName);
        const result = await collection.deleteOne(query);
        console.log(result);
    } catch (error) {
        console.log("error: ", error)
    }
}

module.exports = {
    updateOrCreate,
    deleteDoc
}