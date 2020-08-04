import knex from 'knex';
import { resolve } from 'path';

const db = knex({
  client: 'sqlite',
  connection: {
    filename: resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
});

export default db;
