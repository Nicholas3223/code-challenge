import type {AccountWithCharges} from "../../App";

import "./Card.css";

interface CardProps {
  account: AccountWithCharges,
  setShowModal: (show: boolean) => void;
  setSelectedAccount: (account: AccountWithCharges) => void;
}

const Card : React.FC<CardProps> = ({account, setShowModal, setSelectedAccount}) => {
  const {type, id, address, accountBalance} = account;

  const getBalanceClass = () => {
    if (accountBalance > 0) return "positive-balance";
    if (accountBalance < 0) return "negative-balance";
    return "neutral-balance";
  };

  const handleClick = () => {
    setSelectedAccount(account);
    setShowModal(true);
  };

  return(
    <div className="card-container">
      <div>{type === "ELECTRICITY" ? "⚡" : "🔥"}</div>
      <div className="card-data">
        <div>
          <h4>{type}</h4>
          <p>{id}</p>
          <p>{address}</p>
        </div>
        <div className="card-bottom">
          <div >
            <p>Account Balance</p>
            <button onClick={handleClick}>Make a Payment</button>
          </div>
          <p className={getBalanceClass()}>${accountBalance}</p>
        </div>
      </div>
    </div>
  )
};

export default Card;