// db.js
import Dexie from 'dexie';
export const db = new Dexie('database');
db.version(1).stores({
  users: 'address , balance'
});