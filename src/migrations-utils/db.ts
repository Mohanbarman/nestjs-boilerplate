import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

export const getDb = async () => {
  dotenv.configDotenv();
  const MONGO_URL = process.env.MONGO_URI;
  const client = await MongoClient.connect(MONGO_URL, {});
  return client.db();
};
