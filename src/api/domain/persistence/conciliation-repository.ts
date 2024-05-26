import { pgPool } from '../../providers/pg-db/pg-connector';
import { TransactionStatusEnum } from '../shared/value-objects';

async function dbConn() {
  return await pgPool().connect();
}

export async function reversed(account: number, value: number, token: string) {
  const client = await dbConn();
  try {
    await client.query('BEGIN');

    const updateWallet = {
      text: `UPDATE customers SET wallet = $1
      WHERE account = $2;`,
      values: [value, account],
    };
    await client.query(updateWallet);

    const updateTransaction = {
      text: `UPDATE managerial_account SET status = $1
      WHERE token = $2;`,
      values: [TransactionStatusEnum.REVERSED, token],
    };

    await client.query(updateTransaction);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function finalize(account: number, value: number, token: string) {
  const client = await dbConn();
  try {
    await client.query('BEGIN');

    const updateWallet = {
      text: `UPDATE customers SET wallet = $1
      WHERE account = $2;`,
      values: [value, account],
    };
    await client.query(updateWallet);

    const updateTransaction = {
      text: `UPDATE managerial_account SET status = $1
      WHERE token = $2;`,
      values: [TransactionStatusEnum.FINISHED, token],
    };

    await client.query(updateTransaction);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
