import {useState, useEffect} from "react";

import type {Account} from "../../../example-mocks/energyAccountsAPIMock";
import type {DueCharges} from "../../../example-mocks/dueChargesAPIMock";

import {MOCK_ENERGY_ACCOUNTS_API} from "../../../example-mocks/energyAccountsAPIMock";
import {MOCK_DUE_CHARGES_API} from "../../../example-mocks/dueChargesAPIMock";

export const useEnergyAccounts = (showModal: boolean, reload: boolean) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [charges, setCharges] = useState<DueCharges[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [accRes, chargeRes] = await Promise.all([
          MOCK_ENERGY_ACCOUNTS_API(),
          MOCK_DUE_CHARGES_API(),
        ]);
        setAccounts(accRes);
        setCharges(chargeRes);
      } catch (err) {
        console.error("Failed to load energy data:", err);
      }
    };

    fetchAll();
  }, [showModal, reload]);

  return { accounts, charges };
};