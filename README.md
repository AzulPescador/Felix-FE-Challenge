# ![Felix Pago Logo](favicon.png) Felix Pago - Remittance Dashboard



## Objective
 
The objective of this code is to respond to the functionality presented in the Felix frontend challenge.

See this app in action here: https://felix-fe-challenge.vercel.app/

### Developer:
#### Guillermo Agustín Chiarotto
#### Email: agustin.chiarotto.dev@gmail.com 
#### Phone: +542994575660 
#### Linkedin: https://www.linkedin.com/in/agustinchiarotto/

## Features

- **Transaction Management**: View, filter, and search through remittance transactions
- **Detailed Transaction View**: By clicking in a row, access comprehensive information about each transaction
- **Multi-language Support**: Toggle between English and Spanish interfaces
- **Responsive Design**: Optimized for both desktop and mobile devices
- **PDF Generation**: Download transaction details as PDF documents
- **Status Tracking**: Visual representation of transaction status

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query for server state
- **Internationalization**: i18next
- **PDF Generation**: @react-pdf/renderer
- **HTTP Client**: Axios

## Demo
![demo1](https://github.com/user-attachments/assets/34baa19c-44de-4e56-aaa1-bc3b2ce03458)
![demo2](https://github.com/user-attachments/assets/4c751cb0-06cb-4043-8ed3-ea0107178ca5)
![demo3](https://github.com/user-attachments/assets/a3e911cb-fd0f-42f1-aa83-d8c2a0154793)
![demo4](https://github.com/user-attachments/assets/c19b68f9-68bc-4721-a13b-efb56a64e3c0)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AzulPescador/Felix-FE-Challenge.git
   cd felix-pago

2. Install dependencies:

```shellscript
npm install
# or
yarn
```


3. Create a `.env` file in the root directory with the following variables:

```plaintext
VITE_APP_BACK_URL=your_api_url
VITE_APP_ENV=development
```




### Running the Application

1. Start the development server:

```shellscript
npm run dev
# or
yarn dev
```


2. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```plaintext
felix-pago/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── constants/          # Application constants
│   ├── hooks/              # Custom React hooks
│   ├── i18n/               # Internationalization files
│   ├── pages/              # Application pages - Page specific components
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── .env                    # Environment variables
├── index.html              # HTML template
├── package.json            # Project dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Key Components

### TransactionTable

The `TransactionTable` component is the core of the dashboard, displaying all transactions in a tabular format. It includes:

- Pagination for handling large datasets
- Integration with the filtering system


### TransactionModal

The `TransactionModal` component provides a detailed view of a selected transaction, including:

- Sender and receiver information
- Transaction status and history
- Payment details
- Options to download PDF


### TransactionFilters

The `TransactionFilters` component allows users to filter transactions based on various criteria:

- Date range
- Transaction status
- Search by sender or receiver information


### Internationalization

The application uses i18next for internationalization. Language files are stored in `src/i18n/locales/` and can be easily extended to support additional languages.

## State Management

React Query is used for managing server state, providing:

- Efficient data fetching and caching
- Automatic refetching and background updates


## Styling

Tailwind CSS is used for styling, providing:

- Rapid UI development
- Consistent design across the application
- Easy customization and theming

## Testing

The project includes a comprehensive test suite using Jest and React Testing Library. To run the tests:

```shellscript
npm run test
# or
yarn test
```

