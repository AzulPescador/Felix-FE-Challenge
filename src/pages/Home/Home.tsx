import { useState, useEffect } from 'react';
import { Transaction } from '../../types/transaction';
import { UserDetails } from '../../types/user';
import TransactionTable from './components/TransactionTable/TransactionTable';
import TransactionModal from './components/TransactionModal/TransactionModal';
import { TransactionFilters as TransactionFiltersType } from '../../types/transaction';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import useGetTransactions from '../../hooks/useGetTransactions';
import useGetUserByWhatsappNumber from '../../hooks/useGetUserByWhatsappNumber';

const ITEMS_PER_PAGE = 10;

const Home = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [senderDetails, setSenderDetails] = useState<UserDetails | null>(null);
  const [receiverDetails, setReceiverDetails] = useState<UserDetails | null>(
    null
  );
  const [filters, setFilters] = useState<TransactionFiltersType>({
    search: '',
    status: '',
    startDate: '',
    endDate: '',
  });
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetTransactions(
    filters,
    page,
    ITEMS_PER_PAGE
  );

  const { data: senderData, isLoading: isLoadingSender } =
    useGetUserByWhatsappNumber(selectedTransaction?.sender_whatsapp || '');
  const { data: receiverData, isLoading: isLoadingReceiver } =
    useGetUserByWhatsappNumber(selectedTransaction?.receiver_whatsapp || '');

  useEffect(() => {
    if (selectedTransaction) {
      setSenderDetails(senderData?.user || null);
      setReceiverDetails(receiverData?.user || null);
    } else {
      setSenderDetails(null);
      setReceiverDetails(null);
    }
  }, [selectedTransaction, senderData, receiverData]);

  const onPageChangeHandler = (newPage: number) => {
    setPage(newPage);
  };

  const onFilterChangeHandler = (
    newFilters: Partial<TransactionFiltersType>
  ) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1); // Reset page when filters change
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mt-8">
          <TransactionTable
            data={data}
            isLoading={isLoading}
            error={error}
            filters={filters}
            onFilterChange={onFilterChangeHandler}
            onPageChange={onPageChangeHandler}
            onSelect={setSelectedTransaction}
            currentPage={page}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
        {selectedTransaction && (
          <TransactionModal
            isLoadingDetails={isLoadingReceiver || isLoadingSender}
            transaction={selectedTransaction}
            senderDetails={senderDetails}
            receiverDetails={receiverDetails}
            onClose={handleCloseModal}
          />
        )}
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Home;
