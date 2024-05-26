import { finalize, reversed } from '../persistence/conciliation-repository';
import { getTransfer } from '../persistence/transfers-repository';
import { creditWallet } from '../shared/fixtures';
import { Conciliation, TransactionStatusEnum } from '../shared/value-objects';
import { getWallet } from './custormers-service';

export async function conciliation(transaction: Conciliation) {
  try {
    const transfer = await getTransfer(transaction.token);

    if (transaction.status === TransactionStatusEnum.REFUSED) {
      if (transfer.status == TransactionStatusEnum.REVERSED) {
        throw new Error(`transaction already reversed: ${transaction.token}`);
      }
      const newBalance = await updateWallet(transfer.origin_account, transfer.value);
      return await reversed(transfer.origin_account, newBalance, transfer.token);
    }
    if (transfer.status === TransactionStatusEnum.FINISHED) {
      throw new Error(`transaction already finished: ${transaction.token}`);
    }
    const newBalance = await updateWallet(transfer.target_account, transfer.value);
    await finalize(transfer.target_account, newBalance, transfer.token);
  } catch (error) {
    throw new Error(`conciliation failed -> ${error}`);
  }
}

async function updateWallet(account: number, value: number) {
  const wallet = await getWallet(account);
  const newBalance = creditWallet(wallet, value);
  return newBalance;
}
