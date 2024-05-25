import { pgPool } from '../../providers/pg-db/pg-connector';
import { Transfer } from '../shared/value-objects';

async function dbConn() {
  return await pgPool().connect();
}

export async function save(data: Transfer, newOriginBalance: number) {
  const client = await dbConn();
  try {
    await client.query('BEGIN');

    const newTransfer = {
      text: `INSERT INTO managerial_account (value, origin_account, target_account)
      values($1, $2, $3) RETURNING *`,
      values: [data.value, data.origin_account, data.target_account],
    };

    const transfer = await client.query(newTransfer);

    const updateWallet = {
      text: `UPDATE customers SET wallet = $1
      WHERE account = $2;`,
      values: [newOriginBalance, data.origin_account],
    };

    await client.query(updateWallet);
    await client.query('COMMIT');

    return transfer.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function getTransfer(token: string, value: number) {
  const client = await dbConn();
  const query = {
    text: `SELECT * FROM managerial_account 
    WHERE token = $1
    AND value = $2`,
    values: [token, value],
  };
  const queryResult = await client.query(query);
  client.release();
  return queryResult.rows[0];
}
