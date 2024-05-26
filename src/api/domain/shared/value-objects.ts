export type Customer = {
  name: string;
  doc: string;
  email: string;
  password: string;
  wallet: number;
  type: CustomerType;
};

export type Transfer = {
  value: number;
  status: TransactionStatusEnum;
  password: string;
  origin_account: number;
  target_account: number;
};

export enum TransactionStatusEnum {
  FINISHED = 'FINISHED',
  REFUSED = 'REFUSED',
  REVERSED = 'REVERSED',
  PROCESSING = 'PROCESSING',
}

export enum CustomerType {
  COMUM = 'COMUM',
  LOGISTA = 'LOGISTA',
}

export type Voucher = {
  origin_account: number;
  target_account: number;
  date_time: string;
  value: number;
  token: string;
};

export type Conciliation = {
  value: number;
  token: string;
  status: Omit<TransactionStatusEnum, 'PROCESSING' | 'REVERSED'>;
};
