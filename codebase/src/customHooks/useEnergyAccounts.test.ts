import {renderHook, waitFor} from '@testing-library/react';
import {vi} from 'vitest';
import {useEnergyAccounts} from './useEnergyAccounts';

import type {Account} from "../../../example-mocks/energyAccountsAPIMock";
import type {DueCharges} from "../../../example-mocks/dueChargesAPIMock";

import * as energyAccountsMock from '../../../example-mocks/energyAccountsAPIMock';
import * as dueChargesMock from '../../../example-mocks/dueChargesAPIMock';

describe('useEnergyAccounts', () => {
  const mockAccounts: Account[]= [
    {
      id: '1',
      type: 'ELECTRICITY',
      address: '123 Main St',
      meterNumber: 'M-1'
    },
  ];

  const mockCharges: DueCharges[] = [
    {
      id: 'c-1',
      accountId: '1',
      amount: 50,
      date: '2023-01-01',
    },
  ];

  beforeEach(() => {
    vi.spyOn(energyAccountsMock, 'MOCK_ENERGY_ACCOUNTS_API').mockResolvedValue(mockAccounts);
    vi.spyOn(dueChargesMock, 'MOCK_DUE_CHARGES_API').mockResolvedValue(mockCharges);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('fetches energy accounts and charges on mount', async () => {
    const {result} = renderHook(() => useEnergyAccounts(false, false));

    await waitFor(() => {
      expect(result.current.accounts).toEqual(mockAccounts);
      expect(result.current.charges).toEqual(mockCharges);
    });

    expect(energyAccountsMock.MOCK_ENERGY_ACCOUNTS_API).toHaveBeenCalledTimes(1);
    expect(dueChargesMock.MOCK_DUE_CHARGES_API).toHaveBeenCalledTimes(1);
  });

  it('re-fetches data when reload or showModal changes', async () => {
    const { result, rerender } = renderHook(
      ({ showModal, reload }) => useEnergyAccounts(showModal, reload),
      {
        initialProps: { showModal: false, reload: false },
      }
    );

    await waitFor(() => {
      expect(result.current.accounts).toEqual(mockAccounts);
    });

    rerender({ showModal: true, reload: false });

    await waitFor(() => {
      expect(energyAccountsMock.MOCK_ENERGY_ACCOUNTS_API).toHaveBeenCalledTimes(2);
    });

    rerender({ showModal: true, reload: true });

    await waitFor(() => {
      expect(energyAccountsMock.MOCK_ENERGY_ACCOUNTS_API).toHaveBeenCalledTimes(3);
    });
  });
});