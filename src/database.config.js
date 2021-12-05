import { MongoClient } from 'mongodb';

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const dbName = 'kompetegram_publicdb';
const collectionName = 'fakultas_prodi';

const url = `mongodb+srv://${username}:${password}@cluster0.od9px.mongodb.net?retryWrites=true&w=majority&ssl=true`;
const client = new MongoClient(url);

// Connect to the server
// await client.connect();
// const db = client.db(dbName);
// const collection = db.collection(collectionName);

// const findResult = await collection.find({}).toArray();

// const cursor =  await collection.find().project({ fakultas: 1 });

// const fakultas = await collection.distinct('fakultas');

// console.log(findResult);

// client.close();

export { dbName, collectionName, client };
