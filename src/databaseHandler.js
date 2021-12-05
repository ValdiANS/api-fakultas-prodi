import { dbName, collectionName, client } from './database.config.js';
import { Collection } from 'mongodb';

const getListProdi = async (collection, fakultasName) => {
  const listProdi = await collection.find({
    fakultas: fakultasName,
  })
    .project({
      _id: 0,
      fakultas: 0,
    })
    .toArray();

  listProdi.forEach((prodi) => {
    prodi.kodeProdi = prodi.kode;
    prodi.namaProdi = prodi.prodi;

    delete prodi.kode;
    delete prodi.prodi;
  });
  
  return {
    namaFakultas: fakultasName,
    listProdi,
  };
};

const getListProdiOfFakultas = async (fakultasName) => {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  
  const fakultas = await getListProdi(collection, fakultasName);
  
  client.close();

  return fakultas;
};

const getFakultasList = async () => {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const fakultasNameList = await collection.distinct('fakultas');
  const listFakultas = [];

  for (let i = 0; i < fakultasNameList.length; i++) {
    const prodi = await getListProdi(collection, fakultasNameList[i]);

    listFakultas.push(prodi);
  }

  client.close();

  return listFakultas;
};

const getFakultasNameList = async () => {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  let fakultasNameList = await collection.distinct('fakultas');

  client.close();

  fakultasNameList = fakultasNameList.map((name) => ({
    namaFakultas: name,
  }))

  return fakultasNameList;
};

const getAllProdi = async () => {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const allProdi = await collection.find({})
    .project({
      _id: 0,
      fakultas: 0,
    })
    .toArray();

  client.close();

  return allProdi;
};

const getProdi = async (kodeProdi) => {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const prodi = await collection.find({
    kode: kodeProdi,
  })
    .project({
      _id: 0,
    })
    .toArray();

  client.close();

  return prodi[0];
};

export {
  getFakultasList,
  getFakultasNameList,
  getListProdiOfFakultas,
  getAllProdi,
  getProdi,
};
