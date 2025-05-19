# ⚡ Energy Accounts Frontend App

This is a React + TypeScript frontend application that displays customer energy accounts, allows filtering, and enables a simulated credit card payment via a modal.

> ✅ Frontend-only implementation  
> 📦 Backend interactions are **mocked** for demonstration purposes  

---

## Starting the application

#### Install Dependencies:

```npm install```

#### Start the application:

```npm start```

#### Running tests

```npm run test``` 

- runs Vitest + React Testing Library

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
- Prioritized functionality and structure over detailed UI polish due to time constraints and assessment criteria

---

## Features Implemented

- ✅ Implement a page that renders a list of customer energy accounts.
- ✅ Fetch energy accounts from the backend.
- ✅ The accounts should be rendered in a Card UI format stacked on top of each other and centered on the page.
- ✅ The account balance should change color based on the value:
Positive: green
Negative: red
Zero: grey
- ✅ Implement a filter for filtering accounts by energy type.
- ✅ Clicking on the "Make a Payment" button should open a modal with:
title
credit card details
balance
A "Pay" button
- ✅ Clicking the "Pay" button should submit the credit card details to the backend, and on success, show a “Payment Successful” view with a close button.

## Features Not Implemented
- Implement a different page/view that shows a history of payments made.
- Implement a search feature to search by account address.


---

## Project Structure

```text
CODE-CHALLENGE/
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
    │   ├── App.tsx              # Main app logic and UI
    │   └── main.tsx             # App bootstrap (Vite entry)
    │
    ├── index.html               # Vite HTML entry
    └── vite.config.ts          # Vite configuration
```

The main test is in `__tests__/`, with additional tests colocated alongside components where relevant.  
The app is bootstrapped via `main.tsx`, with main logic handled in `App.tsx`.
The components/ folder contains reusable UI elements like Card, Modal, and Dropdown.
customHooks/ includes a typed hook for fetching account and charges data.
utils/ contains helper logic to add charges data to accounts.
Main test is in __tests__/, and the app is bootstrapped via main.tsx and App.tsx.
Other tests I have included in the respective folders

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
- Tests have been written for almost everything except the Card and Modal components. It would have been nice to have coverage there as well.
