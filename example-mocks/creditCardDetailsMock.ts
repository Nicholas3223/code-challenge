export interface CardDetails {
  amount: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

let cardDetails: CardDetails[] = [];

export const saveCardDetails = (cardData: CardDetails): Promise<{status: string; data: CardDetails}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const {amount, cardNumber, expiry, cvv} = cardData;

      if (!amount || !cardNumber || !expiry || !cvv) {
        reject("All fields are required.");
      } else {
        cardDetails.push(cardData);
        resolve({ status: "success", data: cardData });
      }
    }, 1000);
  });
};

export const getSavedCards = (): Promise<CardDetails[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cardDetails);
    }, 500);
  });
};