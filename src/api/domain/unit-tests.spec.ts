import { creditWallet, debitWallet, encryptPassword, isValidBalance, isValidPassword, securingMonetaryValues } from './shared/fixtures';

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
    const wallet = 100.55;
    const debitValue = 50.25;
    expect(debitWallet(wallet, debitValue)).toEqual(50.3);
  });

  it('should validate the credit in the wallet', () => {
    const wallet = 89.5;
    const creditValue = 10.5;
    expect(creditWallet(wallet, creditValue)).toEqual(100);
  });

  it('should guarantee conversion to the numeric type', () => {
    expect.assertions(2);
    const value = '10.5';
    const casting = securingMonetaryValues(value);
    expect(typeof casting).toBe('number');
    expect(securingMonetaryValues(value)).toEqual(10.5);
  });
});
