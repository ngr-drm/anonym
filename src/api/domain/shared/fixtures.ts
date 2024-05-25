import bcrypt from 'bcrypt';
import { Voucher } from './value-objects';
import { format } from 'date-fns';

export async function isAuthorized(type: string, password: string, passwordHash: string) {
  if (type === 'LOGISTA') return false;

  return await isValidPassword(password, passwordHash);
}

export function isValidBalance(balance: number, value: number) {
  return balance >= value;
}

// recommended -> convert to asynchronous in the production environment
export function encryptPassword(password: string) {
  const saltRounds = Math.random() * (10 - 5) + 5; // between 5 and 10

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export async function isValidPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export function debitWallet(wallet: number, value: number) {
  return wallet - value;
}

export function creditWallet(wallet: number, value: number) {
  return wallet + value;
}

export function serializeVoucher(data: any) {
  const voucher: Voucher = {
    origin_account: data.origin_account,
    target_account: data.target_account,
    value: data.value,
    date_time: standardizeDateAndTime(data.created_at),
    token: data.token,
  };
  return voucher;
}

function standardizeDateAndTime(dateTime: string) {
  return format(new Date(dateTime), 'dd-MM-yyyy HH:mm');
}
