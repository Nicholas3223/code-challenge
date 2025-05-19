import {useState} from "react";
import type {Account} from "../../example-mocks/energyAccountsAPIMock";

import {accountsWithDueCharges} from "./utils/accountsWithDueCharges";
import {useEnergyAccounts} from "./customHooks/useEnergyAccounts";

import Card from "./components/Card/Card";
import Modal from "./components/Modal/Modal";
import Dropdown from "./components/Dropdown/Dropdown";

import './App.css';

export type AccountWithCharges = Account & {
  accountBalance: number;
};

const accountTypeFilter = (data: AccountWithCharges[], type: string) => {
  return data.filter((item) => item.type === type);
};

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountWithCharges | null>(null);
  const [filterType, setFilterType] = useState("");
  const [reload, setReload] = useState(false);

  const {accounts, charges} = useEnergyAccounts(showModal, reload);

  const cardData = accountsWithDueCharges({accounts, charges});
  
  const options = [
    {value: "ELECTRICITY", label: "Electricity"},
    {value: "GAS", label: "Gas"},
    {value: "", label: "Show All"}
  ]

  const filteredAccounts = filterType
    ? accountTypeFilter(cardData, filterType)
    : cardData;

  return (
    <div className="container">
      <h1>Customer Energy Accounts</h1> 
      <Dropdown
        onSelect={setFilterType}
        options={options}
      />
      {filteredAccounts.map((account) => {
        return(
          <Card
            key={account.id}
            account={account}
            setShowModal={setShowModal}
            setSelectedAccount={setSelectedAccount}
          />
        )
      })}
      {(showModal && selectedAccount) &&
        <Modal
          setShowModal={setShowModal}
          selectedAccount={selectedAccount}
          setReload={setReload}
        />
      }
    </div>
  )
}

export default App;
