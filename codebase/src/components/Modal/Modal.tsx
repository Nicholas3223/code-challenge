import {useState} from "react";

import {saveCardDetails} from "../../../../example-mocks/creditCardDetailsMock";

import type {AccountWithCharges} from "../../App";

import {MOCK_PUT_UPDATE_DUE_CHARGES} from "../../../../example-mocks/dueChargesAPIMock";

import "./Modal.css";

interface ModalProps {
  setShowModal: (show: boolean) => void;
  selectedAccount: AccountWithCharges | null;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

type FormData = {
  amount: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

const Modal : React.FC<ModalProps> = ({setShowModal, selectedAccount, setReload}) => {
  if (!selectedAccount) return null;
  const [status, setStatus] = useState<string>("");
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const onClose = () => {
    setShowModal(false);
    setPaymentSuccess(false);
    setStatus("");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");
  
    try {
      const response = await saveCardDetails(formData);
      await MOCK_PUT_UPDATE_DUE_CHARGES(selectedAccount.id, Number(formData.amount));
  
      setStatus(`Payment successful! Paid $${response.data.amount}`);
      setPaymentSuccess(true);
      setFormData({ amount: "", cardNumber: "", expiry: "", cvv: "" });
      setReload((prev) => !prev);
    } catch (error: any) {
      setStatus(`Error: ${error.message || error.toString()}`);
    }
  };

  const disabled = !formData.amount ||
  !formData.cardNumber ||
  !formData.expiry ||
  !formData.cvv;

  return(
    <div className="modalContainer">
      <div className="titleContainer">
        <h4>Make a payment</h4>
        <button className="close-button" onClick={onClose}>x</button>
      </div>
      <div>
        {paymentSuccess ? (
          <div>{status}</div>
        ) : (<form autoComplete="on" onSubmit={handleSubmit}>
          <div>
            <p className="input">How much would you like to pay?</p>
            <input
              name="amount"
              onChange={handleChange}
              className="payment-form-input"
              placeholder="Amount"
              type="text"
              autoComplete="off"
            />
          </div>
          <div>
            <p>How would you like to pay?</p>
            <input
              name="cardNumber"
              onChange={handleChange}
              className="payment-form-input"
              placeholder="Card number"
              type="tel"
              autoComplete="cc-number"
            />
            <div className="payment-form-card-details-container">
              <input
                name="expiry"
                onChange={handleChange}
                className="payment-form-input"
                placeholder="Expiry"
                type="tel"
                autoComplete="cc-exp"
              />
              <input
                name="cvv"
                onChange={handleChange}
                className="payment-form-input"
                placeholder="CVV"
                type="tel"
                autoComplete="cc-csc"
              />
            </div>
          </div>
          <button type="submit" disabled={disabled}>Pay</button>
        </form>)
        }
      </div>
    </div>
  )
};

export default Modal;
