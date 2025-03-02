import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TransactionFilters, Transaction } from '../types/transaction';
import { fetchServer } from '../services/utils/fetchServer';

interface TransactionsResult {
  transactions: Transaction[];
  total: number;
}

const getTransactionsEndpoint = (
  filters: TransactionFilters,
  page: number,
  limit: number
) => {
  const queryParams = new URLSearchParams();

  if (filters.search) queryParams.append('search', filters.search);
  if (filters.status) queryParams.append('status', filters.status);
  if (filters.startDate) queryParams.append('startDate', filters.startDate);
  if (filters.endDate) queryParams.append('endDate', filters.endDate);

  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());

  return `/transactions?${queryParams.toString()}`;
};

const useGetTransactions = (
  filters: TransactionFilters,
  page: number = 1,
  limit: number = 10
): UseQueryResult<TransactionsResult, Error> => {
  return useQuery({
    queryKey: ['transactions', filters, page, limit],
    queryFn: async () => {
      return await fetchServer({
        method: 'GET',
        url: getTransactionsEndpoint(filters, page, limit),
        useToken: true,
      });
    },
    keepPreviousData: true,
  });
};

export default useGetTransactions;
