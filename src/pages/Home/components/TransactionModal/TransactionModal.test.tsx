import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../../i18n/config';
import TransactionModal from './TransactionModal';
import type { Transaction } from '../../../../types/transaction';
import type { UserDetails } from '../../../../types/user';

// Mock PDF generation
jest.mock('../TransactionPDF/TransactionPDF', () => ({
  __esModule: true,
  default: ({ onPDFGenerated }: { onPDFGenerated: (url: string) => void }) => {
    return (
      <button
        onClick={() => onPDFGenerated('mock-pdf-url')}
        data-testid="pdf-button"
      >
        Download PDF
      </button>
    );
  },
}));

// Mock data
const mockTransaction: Transaction = {
  transaction_id: '123456',
  sender_whatsapp: '+1234567890',
  receiver_whatsapp: '+0987654321',
  amount_sent: 100,
  amount_received: 1950,
  exchange_rate: 19.5,
  fee: 5,
  status: 'Completed',
  date: '2023-01-01T12:00:00Z',
  payment_method: 'Bank deposit',
  payment_details: 'Account ending in 1234',
  currency_sent: 'USD',
  currency_received: 'MXN',
};

const mockSenderDetails: UserDetails = {
  whatsapp_number: '+1234567890',
  first_name: 'John',
  last_name: 'Doe',
  country_code: 'US',
  verification_status: 'Verified',
};

const mockReceiverDetails: UserDetails = {
  whatsapp_number: '+0987654321',
  first_name: 'Jane',
  last_name: 'Smith',
  country_code: 'MX',
  verification_status: 'Verified',
};

describe('TransactionModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.open
    window.open = jest.fn();
  });

  it('renders loading spinner when isLoadingDetails is true', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <TransactionModal
          transaction={mockTransaction}
          senderDetails={null}
          receiverDetails={null}
          onClose={mockOnClose}
          isLoadingDetails={true}
        />
      </I18nextProvider>
    );

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders transaction details correctly', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <TransactionModal
          transaction={mockTransaction}
          senderDetails={mockSenderDetails}
          receiverDetails={mockReceiverDetails}
          onClose={mockOnClose}
          isLoadingDetails={false}
        />
      </I18nextProvider>
    );

    // Check sender details
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('+1234567890')).toBeInTheDocument();

    // Check receiver details
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('+0987654321')).toBeInTheDocument();

    // Check transaction amounts
    expect(screen.getByText('$100.00 USD')).toBeInTheDocument();
    expect(screen.getByText('1950.00 MXN')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <TransactionModal
          transaction={mockTransaction}
          senderDetails={mockSenderDetails}
          receiverDetails={mockReceiverDetails}
          onClose={mockOnClose}
          isLoadingDetails={false}
        />
      </I18nextProvider>
    );

    const closeButton = screen.getByRole('close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('opens WhatsApp share when share button is clicked', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <TransactionModal
          transaction={mockTransaction}
          senderDetails={mockSenderDetails}
          receiverDetails={mockReceiverDetails}
          onClose={mockOnClose}
          isLoadingDetails={false}
        />
      </I18nextProvider>
    );

    const pdfButton = screen.getByTestId('pdf-button');
    fireEvent.click(pdfButton);

    const shareButton = screen.getByText(/share on whatsapp/i);
    fireEvent.click(shareButton);

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/?text='),
      '_blank'
    );
  });
});
