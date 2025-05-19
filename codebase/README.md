# ⚡ Energy Accounts Frontend App

This is a React + TypeScript frontend application that displays customer energy accounts, allows filtering, and enables a simulated credit card payment via a modal.

> ✅ Frontend-only implementation  
> 📦 Backend interactions are **mocked** for demonstration purposes  

---

## Starting the application

### Install Dependencies:

npm install

### Start the application:

npm start

### Running tests

npm run test

---

## Tech Stack

- React
- TypeScript
- Vite
- React Testing Library
- Vitest

## Design Decisions

- Used Vite for fast dev server and build tooling
- Mocked backend with locally defined data to simulate full-stack behavior
- Used TypeScript throughout with strong types for accounts and charges
- Prioritized functionality and structure over detailed UI polish due to time constraints and assessment criteriae

---

## Features Implemented

- ✅ Display a list of customer energy accounts in card format
- ✅ Fetch account data from a mocked backend service
- ✅ Color-coded account balances:
  - Positive → Green
  - Negative → Red
  - Zero → Grey
- ✅ Filter accounts by energy type (e.g., gas, electricity)
- ✅ Search accounts by address
- ✅ "Make a Payment" button opens a modal with:
  - Credit card input form
  - Account balance
  - "Pay" button
- ✅ Submitting a payment shows a **"Payment Successful"** confirmation view with a close button

## Features Not Implemented

- Implement a different page/view that shows a history of payments made.
- Implement a search feature to search by account address.

---

## Project Structure

CODE-CHALLENGE/
│
├── example-mocks/
│   ├── energyAccountsAPIMock.ts
│   ├── dueChargesAPIMock.ts
│   └── creditCardDetailsMock.ts
│
└── CODEBASE/                    # Frontend application
    ├── src/
    │   ├── components/          # Reusable UI components (Modal, Card, Dropdown)
    │   ├── customHooks/         # Custom React hooks (e.g., useEnergyAccounts)
    │   ├── utils/               # Utility functions (e.g., calculate balance)
    │   ├── __tests__/           # Unit tests (e.g. component tests)
    │   ├── App.tsx             # Main app logic and UI
    │   └── main.tsx           # App bootstrap (Vite entry)
    │
    ├── index.html              # Vite HTML entry
    └── vite.config.ts          # Vite configuration

- App.tsx is the file that the renders main page view
- I had to add some files to run Vite/React Testing Library unit tests in the src folder. This was a bit rushed because it is my first time creating a Vite app. So I just needed to get the basic testing set up going.
- components folder contains 3 reusable components: Modal, Card and Dropdown. These could have been customised further to be of more generic use given more time.
- utils folder contains just the one util function that I am using to add the due charges to the accounts that we are using in the Card component.
- custom hooks folder contains the useEnergyAccounts.ts hook that we are using to fetch our data for the Card.

## Notes

I have saved the card data to the mock database in example-mocks/creditCardDetailsMock.ts. If you fetch it and console.log it, you can see the data. I was close to implementing the payments history page but ran out of time.

---

## Things I would have added given more time

- Better styling with the card and modal. I just had time for the basics for layout but would have liked to add a background colour, different font and sized the inputs on the modal to be more uniform.
- I would have included form input validations in the credit card form. Currently I only have the Pay button disabled if all of the fields are empty. I would usually have some checks that the format of the inputs are the correct length and format.
- Currently to close the modal and dropdown you need to click the close button and the button that opens the dropdown respectively. I would have included on click outside of the element to close them as well.
- For the custom hook and App.tsx I have no error or loading state currently. I would have added that to the custom hook and catered for it in App.tsx.
- I would have liked to add some real electricity and gas icons to the cards also.
- The mocks work fine at the moment but I would have liked to spend more time making more detailed ones. I am currently using the example mocks with some add ons.