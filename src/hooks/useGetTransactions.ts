import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TransactionFilters, Transaction } from '../types/transaction';
import { fetchServer } from '../services/utils/fetchServer';
import { FetchApiError } from '../services/utils/fetchServer';

const getTransactionsEndpoint = (
  filters: TransactionFilters,
  page: number,
  limit: number
) => {
  const queryParams = new URLSearchParams();

  if (filters.search) {
    const sanitizedSearch = filters.search.replace(/\+/g, '');
    queryParams.append('search', sanitizedSearch);
  }
  if (filters.status) queryParams.append('status', filters.status);

  // Do not send date filters in the request, we will filter on the frontend
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());

  return `/transactions?${queryParams.toString()}`;
};

const useGetTransactions = (
  filters: TransactionFilters,
  page: number = 1,
  limit: number = 10
): UseQueryResult<Transaction[], Error> => {
  return useQuery({
    queryKey: ['transactions', filters, page, limit],
    queryFn: async () => {
      const result = await fetchServer({
        method: 'GET',
        url: getTransactionsEndpoint(filters, page, limit),
      });

      // Filter transactions by date on the frontend since MockAPI does not support date range filtering
      let filteredTransactions = result;
      if (filters.startDate && filters.endDate) {
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);

        filteredTransactions = filteredTransactions.filter(
          (transaction: Transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startDate && transactionDate <= endDate;
          }
        );
      }

      return filteredTransactions;
    },
    placeholderData: (previousData) => previousData,
    retry: (failureCount, error) => {
      if (error instanceof FetchApiError && error.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export default useGetTransactions;
