import connectMongo from "../configs/mongo.js";
import { ObjectId } from "mongodb";

async function insert(user) {
  try {
    if (!user) throw new Error("Adicição de usuario invalida");

    const db = await connectMongo();
    const collection = db.collection("users");
    return await collection.insertOne(user);
  } catch (err) {
    console.error(err);
    throw new Error("Erro ao adicionar usuario");
  }
}

async function getAll() {
  try {
    const db = await connectMongo();
    const collection = db.collection("users");
    return await collection.find().toArray();
  } catch (err) {
    console.error(err);
    throw new Error("Erro ao buscar usuarios");
  }
}

async function getById(idUser) {
  console.log("🚀 ~ getById ~ idUser:", idUser);
  try {
    if (!idUser) throw new Error("Id de usuario invalido");

    const db = await connectMongo();
    const collection = db.collection("users");
    const objectId = ObjectId.createFromHexString(idUser);

    return await collection.findOne({ _id: objectId });
  } catch (e) {
    console.error(e);
    throw new Error("Erro ao buscar usuario por id");
  }
}

async function getByEmail(email) {
  try {
    if (!email) throw new Error("Email invalido");
    const db = await connectMongo();
    const collection = db.collection("users");
    return await collection.findOne({ email });
  } catch (e) {
    console.error(e);
    throw new Error("Erro ao buscar usuario por email");
  }
}

async function update(idUser, uptadeData) {
  try {
    const db = await connectMongo();
    const collection = db.collection("users");
    const objectId = ObjectId.createFromHexString(idUser);

    return await collection.updateOne({ _id: objectId }, { $set: uptadeData });
  } catch (e) {
    console.error(e);
    throw new Error("Erro ao atualizar usuario");
  }
}

async function remove(idUser) {
  try {
    if (!idUser) throw new Error("Id de usuario invalido");
    const db = await connectMongo();
    const collection = db.collection("users");
    const objectId = ObjectId.createFromHexString(idUser);

    return await collection.deleteOne({ _id: objectId });
  } catch (e) {
    console.error(e);
    throw new Error("Erro ao deletar usuario");
  }
}

export { insert, getAll, getById, update, remove, getByEmail };
