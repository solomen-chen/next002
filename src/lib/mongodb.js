// src/lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://aaqoo223goole:zMpOd7NACIGvAuIl@cluster0.mgjvwzy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = { useUnifiedTopology: true };

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;