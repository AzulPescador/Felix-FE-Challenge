import { useTranslation } from 'react-i18next';
import { Transaction, TransactionFilters } from '../../../../types/transaction';
import { twMerge } from 'tailwind-merge';
import TransactionFiltersComponent from '../TransactionFilters/TransactionFilters';
import LoadingSpinner from '../../../../components/ui/loading/LoadingSpinner';
import ErrorMessage from '../../../../components/ui/feedback/ErrorMessage';
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableBody,
} from '../../../../components/ui/table';
import Pagination from '../../../../components/ui/table/Pagination';

interface TransactionTableProps {
  data?: Transaction[];
  isLoading: boolean;
  error: unknown;
  filters: TransactionFilters;
  onFilterChange: (filters: Partial<TransactionFilters>) => void;
  onPageChange: (page: number) => void;
  onSelect: (transaction: Transaction) => void;
  currentPage: number;
  itemsPerPage: number;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  isLoading,
  error,
  filters,
  onFilterChange,
  onPageChange,
  onSelect,
  currentPage,
  itemsPerPage,
}) => {
  const { t } = useTranslation();

  if (isLoading) return <LoadingSpinner />;

  const headers = [
    t('dashboard.table.senderWhatsapp'),
    t('dashboard.table.receiverWhatsapp'),
    t('dashboard.table.amountSent'),
    t('dashboard.table.amountReceived'),
    t('dashboard.table.exchangeRate'),
    t('dashboard.table.status'),
    t('dashboard.table.dateTime'),
    t('dashboard.table.paymentMethod'),
  ];

  const getStatusClass = (status: string) => {
    return twMerge(
      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
      status === 'Completed' && 'bg-green-100 text-green-800',
      status === 'Failed' && 'bg-red-100 text-red-800',
      status === 'Pending' && 'bg-yellow-100 text-yellow-800',
      status === 'In Progress' && 'bg-blue-100 text-blue-800',
      !['Completed', 'Failed', 'Pending', 'In Progress'].includes(status) &&
        'bg-gray-100 text-gray-800'
    );
  };

  const getStatusTranslation = (status: string) => {
    const statusKey = status.toLowerCase().replace(' ', '');
    return t(`dashboard.filters.status.${statusKey}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <TransactionFiltersComponent
        filters={filters}
        onFilterChange={onFilterChange}
      />

      {error || !data ? (
        <ErrorMessage message={t('errors.noData')} />
      ) : (
        <>
          <div className="mt-8">
            <Table>
              <TableHeader headers={headers} />
              <TableBody>
                {data.map((transaction: Transaction) => (
                  <TableRow
                    key={transaction.transaction_id}
                    onClick={() => onSelect(transaction)}
                  >
                    <TableCell>{transaction.sender_whatsapp}</TableCell>
                    <TableCell>{transaction.receiver_whatsapp}</TableCell>
                    <TableCell>
                      ${transaction.amount_sent.toFixed(2)} USD
                    </TableCell>
                    <TableCell>
                      {transaction.amount_received.toFixed(2)}{' '}
                      {transaction.currency_received}
                    </TableCell>
                    <TableCell>
                      1 USD = {transaction.exchange_rate.toFixed(4)}{' '}
                      {transaction.currency_received}
                    </TableCell>
                    <TableCell>
                      <span className={getStatusClass(transaction.status)}>
                        {getStatusTranslation(transaction.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleString()}
                    </TableCell>
                    <TableCell>{transaction.payment_method}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {data.length === 10 && ( //dev comment: this is because we don't have the total amount in mocked api response. it should be removed once we have total amount
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={onPageChange}
              className="mt-4"
            />
          )}
        </>
      )}
    </div>
  );
};

export default TransactionTable;
