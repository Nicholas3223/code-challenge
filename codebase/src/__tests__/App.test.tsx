import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import type {Account} from '../../../example-mocks/energyAccountsAPIMock';
import type {AccountWithCharges} from '../App';

const mockAccounts: Account[] = [
  {id: '1', type: 'ELECTRICITY', address: '12 Volt Way', meterNumber: 'E-1'},
  {id: '2', type: 'GAS',         address: '34 Gas Rd',   volume: 200},
  {id: '3', type: 'ELECTRICITY', address: '56 Amp St',   meterNumber: 'E-2'},
];

const mockDueCharges: AccountWithCharges[] = [
  {...mockAccounts[0], accountBalance: 50},
  {...mockAccounts[1], accountBalance: 20},
  {...mockAccounts[2], accountBalance: 70},
];

vi.mock('../customHooks/useEnergyAccounts', () => ({
  __esModule: true,
  useEnergyAccounts: vi.fn(() => ({
    accounts: mockAccounts,
    charges: [],
  })),
}));

vi.mock('../utils/accountsWithDueCharges', () => ({
  __esModule: true,
  accountsWithDueCharges: vi.fn(() => mockDueCharges),
}));

vi.mock('../components/Dropdown/Dropdown', () => ({
  __esModule: true,
  default: ({ onSelect, options }: any) => (
    <select
      data-testid="dropdown"
      onChange={(e) => onSelect(e.target.value)}
    >
      {options.map((o: any) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  ),
}));

vi.mock('../components/Card/Card', () => ({
  __esModule: true,
  default: ({
    account,
    setShowModal,
    setSelectedAccount,
  }: any) => (
    <div
      data-testid={`card-${account.id}`}
    >
      <p>Card {account.id}</p>
      <button
        data-testid={`button-${account.id}`}
        onClick={() => {
          setSelectedAccount(account);
          setShowModal(true);
        }}
      ></button>
    </div>
  ),
}));

vi.mock('../components/Modal/Modal', () => ({
  __esModule: true,
  default: ({ selectedAccount, setShowModal }: any) => (
    <div data-testid="modal">
      Modal for {selectedAccount?.id}
      <button
        data-testid="close-modal"
        onClick={() => setShowModal(false)}
      >
        Close
      </button>
    </div>
  ),
}));

import App from '../App';
import {accountsWithDueCharges as mockUtil} from '../utils/accountsWithDueCharges';

describe('<App />', () => {
  it('renders all accounts on first load', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {name: /customer energy accounts/i})
    ).toBeInTheDocument();

    expect(screen.getAllByTestId(/card-/)).toHaveLength(mockDueCharges.length);

    expect(mockUtil).toHaveBeenCalledWith({
      accounts: mockAccounts,
      charges: [],
    });
  });

  it('filters accounts by type via the dropdown', () => {
    render(<App />);

    fireEvent.change(screen.getByTestId('dropdown'), {
      target: {value: 'ELECTRICITY'},
    });

    expect(screen.getAllByTestId(/card-/)).toHaveLength(2);
    expect(screen.queryByTestId('card-2')).not.toBeInTheDocument();
  });

  it('opens and closes the modal when a card is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('button-1'));
    expect(screen.getByTestId('modal')).toHaveTextContent('Modal for 1');

    fireEvent.click(screen.getByTestId('close-modal'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
