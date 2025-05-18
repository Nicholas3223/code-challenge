import type {Account} from "../../../example-mocks/energyAccountsAPIMock";
import type {DueCharges} from "../../../example-mocks/dueChargesAPIMock";

export const accountsWithDueCharges = ({accounts, charges}: {accounts: Account[], charges: DueCharges[]}) => {
  return accounts?.map((account) => {
    const accountBalance = charges.reduce((acc, cur) => {
      if(cur.accountId === account.id) {
        return acc += cur.amount;
      }
      return acc;
    }, 0);
    return {
      ...account,
      accountBalance,
    };
  });
};