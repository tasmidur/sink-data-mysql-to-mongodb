//mongodb://localhost:27017
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri ="mongodb://localhost:27017"

const client = new MongoClient(uri);

const updateOrCreate = async (collectionName,payload)=> {
        try {
          await client.connect();
          const db=client.db('sink_db');
          const collection = db.collection(collectionName);
          const query = { id: payload.id };
          const update = { $set: payload};
          const options = { upsert: true };
          const result= await collection.updateOne(query, update, options);
          console.log(result);
        } catch(error) {
          console.log("error: ", error)
        }
      };

const deleteDoc = async (collectionName,payload)=> {
        try {
            await client.connect();
            const db=client.db('sink_db');
            const query = { id: payload.id };
            const collection = db.collection(collectionName);
            const result = await collection.deleteOne(query);
            console.log(result);
        } catch(error) {
            console.log("error: ", error)
          }
      }

module.exports={
    updateOrCreate,
    deleteDoc
}