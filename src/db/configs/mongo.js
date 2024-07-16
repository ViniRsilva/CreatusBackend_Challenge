import { MongoClient } from "mongodb";

let connection;

export default async function connectMongo() {
  if (connection) return connection;

  try {
    const uri = process.env.MONGO_HOST;
    const dataBaseName = process.env.MONGO_DATABASE;
    const database = new MongoClient(uri);

    await database.connect();

    connection = database.db(dataBaseName);
    return connection;
  } catch (e) {
    console.error(e);
    throw new Error("Erro ao conectar ao MongoDB");
  }
}
