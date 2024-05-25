import { finalize, reversed } from '../persistence/conciliation-repository';
import { getTransfer } from '../persistence/transfers-repository';
import { creditWallet } from '../shared/fixtures';
import { Conciliation, TransactionStatusEnum } from '../shared/value-objects';
import { obtainInfo } from './custormers-service';

export async function conciliation(transaction: Conciliation) {
  try {
    const transfer = await getTransfer(transaction.token, transaction.value);
    if (transaction.status === TransactionStatusEnum.REFUSED) {
      const customer = await obtainInfo(transfer.account_origin);
      const newBalance = creditWallet(customer.wallet, transfer.value);
      await reversed(transfer.origin_account, newBalance, transfer.token);
    }
    const customer = await obtainInfo(transfer.target_account);
    const newBalance = creditWallet(customer.wallet, transfer.value);
    await finalize(transfer.target_account, newBalance, transfer.token);
  } catch (error) {
    throw new Error(`conciliation failed -> ${error}`);
  }
}
