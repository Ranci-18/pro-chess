import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) throw new Error("please add mongo URI to .env");

if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(url, options);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    client = new MongoClient(url, options);
    clientPromise = client.connect();
}

export async function getAuthCollection() {
    const client = await clientPromise;
    const db = client.db('prochessdb');
    return db.collection('users');
}