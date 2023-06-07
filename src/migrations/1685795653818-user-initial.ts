import { getDb } from '../migrations-utils/db';

export const up = async () => {
  const db = await getDb();
  db.collection('users').insertOne({
    email: 'admin@gmail.com',
    role: 'ADMIN',
  });
};

export const down = async () => {
  const db = await getDb();
  db.collection('users').deleteOne({ email: 'admin@gmail.com' });
};
