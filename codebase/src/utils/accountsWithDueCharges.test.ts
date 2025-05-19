import {accountsWithDueCharges} from './accountsWithDueCharges'; // Adjust the path
import type {Account} from '../../../example-mocks/energyAccountsAPIMock';
import type {DueCharges} from '../../../example-mocks/dueChargesAPIMock';

describe('accountsWithDueCharges', () => {
  it('should calculate account balances correctly for mixed account types', () => {
    const accounts: Account[] = [
      {
        id: 'acc1',
        type: 'ELECTRICITY',
        address: '123 Electric Ave',
        meterNumber: 'E-12345',
      },
      {
        id: 'acc2',
        type: 'GAS',
        address: '456 Gas St',
        volume: 120,
      },
    ];

    const charges: DueCharges[] = [
      { id: 'c1', accountId: 'acc1', date: '2024-01-01', amount: 50 },
      { id: 'c2', accountId: 'acc1', date: '2024-01-15', amount: 25 },
      { id: 'c3', accountId: 'acc2', date: '2024-01-20', amount: 100 },
    ];

    const result = accountsWithDueCharges({ accounts, charges });

    expect(result).toEqual([
      {
        id: 'acc1',
        type: 'ELECTRICITY',
        address: '123 Electric Ave',
        meterNumber: 'E-12345',
        accountBalance: 75,
      },
      {
        id: 'acc2',
        type: 'GAS',
        address: '456 Gas St',
        volume: 120,
        accountBalance: 100,
      },
    ]);
  });

  it('should return zero balance for accounts with no charges', () => {
    const accounts: Account[] = [
      {
        id: 'acc1',
        type: 'ELECTRICITY',
        address: '123 Electric Ave',
        meterNumber: 'E-12345',
      },
      {
        id: 'acc2',
        type: 'GAS',
        address: '456 Gas St',
        volume: 200,
      },
    ];

    const charges: DueCharges[] = [
      { id: 'c1', accountId: 'acc1', date: '2024-01-01', amount: 30 },
    ];

    const result = accountsWithDueCharges({ accounts, charges });

    expect(result).toEqual([
      {
        id: 'acc1',
        type: 'ELECTRICITY',
        address: '123 Electric Ave',
        meterNumber: 'E-12345',
        accountBalance: 30,
      },
      {
        id: 'acc2',
        type: 'GAS',
        address: '456 Gas St',
        volume: 200,
        accountBalance: 0,
      },
    ]);
  });

  it('should handle empty charges array', () => {
    const accounts: Account[] = [
      {
        id: 'acc1',
        type: 'ELECTRICITY',
        address: '123 Electric Ave',
        meterNumber: 'E-12345',
      },
    ];

    const charges: DueCharges[] = [];

    const result = accountsWithDueCharges({ accounts, charges });

    expect(result).toEqual([
      {
        id: 'acc1',
        type: 'ELECTRICITY',
        address: '123 Electric Ave',
        meterNumber: 'E-12345',
        accountBalance: 0,
      },
    ]);
  });

  it('should handle empty accounts array', () => {
    const accounts: Account[] = [];
    const charges: DueCharges[] = [
      { id: 'c1', accountId: 'acc1', date: '2024-01-01', amount: 40 },
    ];

    const result = accountsWithDueCharges({ accounts, charges });

    expect(result).toEqual([]);
  });
});