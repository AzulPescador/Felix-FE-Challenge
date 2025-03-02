import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TransactionFilters,
  TransactionStatus,
} from '../../../../types/transaction';

interface TransactionFiltersProps {
  filters: TransactionFilters;
  onFilterChange: (filters: Partial<TransactionFilters>) => void;
}

const statusOptions: TransactionStatus[] = [
  'Pending',
  'In Progress',
  'Completed',
  'Failed',
];

const TransactionFiltersComponent: React.FC<TransactionFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const { t } = useTranslation();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ status: e.target.value as TransactionStatus | '' });
  };

  const handleDateChange =
    (field: 'startDate' | 'endDate') => (e: ChangeEvent<HTMLInputElement>) => {
      const newDate = e.target.value;

      // If setting start date, ensure it's not after end date
      if (
        field === 'startDate' &&
        filters.endDate &&
        newDate > filters.endDate
      ) {
        onFilterChange({ startDate: newDate, endDate: newDate });
        return;
      }

      // If setting end date, ensure it's not before start date
      if (
        field === 'endDate' &&
        filters.startDate &&
        newDate < filters.startDate
      ) {
        onFilterChange({ endDate: filters.startDate });
        return;
      }

      onFilterChange({ [field]: newDate });
    };

  const getStatusTranslation = (status: string) => {
    const statusKey = status.toLowerCase().replace(' ', '');
    return t(`dashboard.filters.status.${statusKey}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t('dashboard.search.label')}
          </label>
          <input
            type="text"
            id="search"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder={t('dashboard.search.placeholder')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t('dashboard.filters.status.label')}
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('dashboard.filters.status.all')}</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {getStatusTranslation(status)}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filters */}
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t('dashboard.filters.date.startDate')}
          </label>
          <input
            type="date"
            id="startDate"
            value={filters.startDate}
            onChange={handleDateChange('startDate')}
            max={filters.endDate || undefined}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t('dashboard.filters.date.endDate')}
          </label>
          <input
            type="date"
            id="endDate"
            value={filters.endDate}
            onChange={handleDateChange('endDate')}
            min={filters.startDate || undefined}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionFiltersComponent;
