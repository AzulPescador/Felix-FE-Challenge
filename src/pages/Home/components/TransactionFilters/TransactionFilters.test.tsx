import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../../i18n/config';
import TransactionFiltersComponent from './TransactionFilters';
import type { TransactionFilters } from '../../../../types/transaction';

describe('TransactionFilters Component', () => {
  const initialFilters: TransactionFilters = {
    search: '',
    status: '',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10,
  };

  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <I18nextProvider i18n={i18n}>
        <TransactionFiltersComponent
          filters={initialFilters}
          onFilterChange={mockOnFilterChange}
        />
      </I18nextProvider>
    );
  });

  it('renders all filter inputs', () => {
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
  });

  it('updates search input value', () => {
    const searchInput = screen.getByLabelText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(searchInput).toHaveValue('test search');
  });

  it('updates status select value', () => {
    const statusSelect = screen.getByLabelText(/status/i);
    fireEvent.change(statusSelect, { target: { value: 'Completed' } });
    expect(statusSelect).toHaveValue('Completed');
  });

  it('updates date inputs', () => {
    const startDateInput = screen.getByLabelText(/start date/i);
    const endDateInput = screen.getByLabelText(/end date/i);

    fireEvent.change(startDateInput, { target: { value: '2025-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2025-01-31' } });

    expect(startDateInput).toHaveValue('2025-01-01');
    expect(endDateInput).toHaveValue('2025-01-31');
  });

  it('calls onFilterChange when search button is clicked', () => {
    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: 'test search' },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'Completed' },
    });
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2025-01-01' },
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: '2025-01-31' },
    });

    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: 'test search',
      status: 'Completed',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      page: 1,
      limit: 10,
    });
  });

  it('adjusts end date if start date is later', () => {
    const startDateInput = screen.getByLabelText(/start date/i);
    const endDateInput = screen.getByLabelText(/end date/i);

    fireEvent.change(endDateInput, { target: { value: '2025-01-15' } });
    fireEvent.change(startDateInput, { target: { value: '2025-01-20' } });

    expect(endDateInput).toHaveValue('2025-01-20');
  });
});
