import { save } from '../persistence/transfers-repository';
import { debitWallet, serializeVoucher } from '../shared/fixtures';
import { Transfer } from '../shared/value-objects';

export async function makeTransfer(data: Transfer, wallet: number) {
  try {
    const newOriginBalance = debitWallet(wallet, data.value);
    const voucher = await save(data, newOriginBalance);
    return serializeVoucher(voucher);
  } catch (error) {
    throw new Error(`failure to transfer -> ${error}`);
  }
}
