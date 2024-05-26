import { pgPool } from '../../providers/pg-db/pg-connector';
import { Customer } from '../shared/value-objects';

async function dbConn() {
  return await pgPool().connect();
}

export async function save(data: Customer) {
  const client = await dbConn();
  const query = {
    text: `INSERT INTO customers (name, doc, email, password, wallet, type, account)
    values($1, $2, $3, $4, $5, $6, nextval('account_number')) RETURNING account`,
    values: [data.name, data.doc, data.email, data.password, data.wallet, data.type],
  };
  const queryResult = await client.query(query);
  client.release();
  return queryResult.rows[0];
}

export async function balance(account: number) {
  const client = await dbConn();
  const query = {
    text: `SELECT wallet FROM customers WHERE account = $1`,
    values: [account],
  };

  const queryResult = await client.query(query);
  client.release();
  return queryResult.rows[0].wallet;
}

export async function customer(account: number) {
  const client = await dbConn();
  const query = {
    text: `SELECT * FROM customers WHERE account = $1`,
    values: [account],
  };

  const queryResult = await client.query(query);
  client.release();
  return queryResult.rows[0];
}
