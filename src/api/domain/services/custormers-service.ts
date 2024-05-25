import { getOne, save } from '../persistence/customers-repository';
import { encryptPassword } from '../shared/fixtures';
import { Customer } from '../shared/value-objects';

export async function openAccount(data: Customer) {
  try {
    const passwordHash = encryptPassword(data.password);
    data.password = passwordHash;
    return await save(data);
  } catch (error) {
    throw new Error(`failure to process account opening -> ${error}`);
  }
}

export async function obtainInfo(account: bigint) {
  try {
    return await getOne(account);
  } catch (error) {
    throw new Error(`failure to obtain customer data -> ${error}`);
  }
}
