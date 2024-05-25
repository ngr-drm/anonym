import { creditWallet, debitWallet, encryptPassword, isValidBalance, isValidPassword } from './shared/fixtures';

describe('fixtures', () => {
  it('should validate balance as expected', () => {
    const wallet = 100;
    const debitValue = 50;

    expect(isValidBalance(wallet, debitValue)).toBeTruthy();
  });

  it('should validate password encryption flow', async () => {
    expect.assertions(2);
    const password = '5988';
    const hash = encryptPassword(password);
    expect(hash).toBeDefined();
    expect(await isValidPassword(password, hash)).toBeTruthy();
  });

  it('should validate the debit in the wallet', () => {
    const wallet = 100;
    const debitValue = 50;
    expect(debitWallet(wallet, debitValue)).toEqual(50);
  });

  it('should validate the credit in the wallet', () => {
    const wallet = 100;
    const creditValue = 50;
    expect(creditWallet(wallet, creditValue)).toEqual(150);
  });
});
