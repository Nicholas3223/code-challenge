import type {Account} from "../../../example-mocks/energyAccountsAPIMock";
import type {DueCharges} from "../../../example-mocks/dueChargesAPIMock";

export const accountsWithDueCharges = ({
  accounts = [],
  charges = []
}: {
  accounts: Account[],
  charges: DueCharges[]
}) : (Account & { accountBalance: number })[] => {
  return accounts.map((account) => {
    const accountBalance = charges.reduce((acc, cur) => {
      return cur.accountId === account.id ? acc + cur.amount : acc;
    }, 0);

    return {
      ...account,
      accountBalance,
    };
  });
};