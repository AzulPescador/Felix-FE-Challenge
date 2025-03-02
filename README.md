# Félix Pago Remittance Dashboard

A web-based dashboard for tracking remittance transactions processed via WhatsApp. This application allows users to search, filter, and track the status of their money transfers efficiently.

## Features

- 📱 Responsive design that works on mobile, tablet, and desktop
- 🔍 Advanced search and filtering capabilities
- 📊 Detailed transaction information
- 🌐 Internationalization support (English/Spanish)
- 📝 Clean and modern UI with Tailwind CSS
- ⚡ Built with React and TypeScript for type safety
- 🧪 Comprehensive test coverage

## Tech Stack

- React 18
- TypeScript
- Vite
- React Query for data fetching
- TailwindCSS for styling
- i18next for internationalization
- Vitest for testing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/felix-pago-dashboard.git
   cd felix-pago-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Locally preview production build
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## Project Structure

```
src/
├── components/          # React components
│   ├── TransactionList/
│   ├── TransactionFilters/
│   └── TransactionModal/
├── services/           # API services
├── types/              # TypeScript types
├── i18n/              # Internationalization
│   └── locales/       # Translation files
├── App.tsx            # Main App component
└── main.tsx           # Entry point
```

## Features Implementation

### Transaction List
- Displays remittance transactions with key details
- Supports pagination
- Responsive table design

### Search and Filtering
- Search by WhatsApp number or Transaction ID
- Filter by status and date range
- Real-time filtering

### Transaction Details
- Modal view with comprehensive transaction information
- Status tracking
- Payment method details

### Internationalization
- Supports English and Spanish
- Easy language switching
- Extensible for additional languages

## Testing

The project includes unit tests for components and integration tests for key features. Run tests with:

```bash
npm run test
```

For test coverage report:

```bash
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Félix Pago for the challenge opportunity
- React and TypeScript communities for excellent documentation
- TailwindCSS for the utility-first CSS framework
