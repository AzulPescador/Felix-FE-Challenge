import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TransactionFilters,
  TransactionStatus,
} from '../../../../types/transaction';
import Button from '../../../../components/ui/buttons/Button';

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

const SearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { t } = useTranslation();

  return (
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
        value={value}
        onChange={onChange}
        placeholder={t('dashboard.search.placeholder')}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

const StatusFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <label
        htmlFor="status"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {t('dashboard.filters.status.label')}
      </label>
      <select
        id="status"
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">{t('dashboard.filters.status.all')}</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {t(
              `dashboard.filters.status.${status.toLowerCase().replace(' ', '')}`
            )}
          </option>
        ))}
      </select>
    </div>
  );
};

const DateFilter = ({
  label,
  id,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  id: 'startDate' | 'endDate';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type="date"
        id={id}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

const TransactionFiltersComponent: React.FC<TransactionFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const { t } = useTranslation();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange =
    (field: keyof TransactionFilters) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setLocalFilters((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleDateChange =
    (field: 'startDate' | 'endDate') => (e: ChangeEvent<HTMLInputElement>) => {
      const newDate = e.target.value;

      if (
        field === 'startDate' &&
        localFilters.endDate &&
        newDate > localFilters.endDate
      ) {
        setLocalFilters((prev) => ({
          ...prev,
          startDate: newDate,
          endDate: newDate,
        }));
        return;
      }
      if (
        field === 'endDate' &&
        localFilters.startDate &&
        newDate < localFilters.startDate
      ) {
        setLocalFilters((prev) => ({
          ...prev,
          endDate: localFilters.startDate,
        }));
        return;
      }
      setLocalFilters((prev) => ({ ...prev, [field]: newDate }));
    };

  const handleSearchSubmit = () => {
    onFilterChange(localFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SearchInput
          value={localFilters.search}
          onChange={handleInputChange('search')}
        />
        <StatusFilter
          value={localFilters.status}
          onChange={handleInputChange('status')}
        />
        <DateFilter
          label={t('dashboard.filters.date.startDate')}
          id="startDate"
          value={localFilters.startDate}
          onChange={handleDateChange('startDate')}
          max={localFilters.endDate}
        />
        <DateFilter
          label={t('dashboard.filters.date.endDate')}
          id="endDate"
          value={localFilters.endDate}
          onChange={handleDateChange('endDate')}
          min={localFilters.startDate}
        />
      </div>
      <div className="mt-4 text-right">
        <Button onClick={handleSearchSubmit}>
          {t('dashboard.search.label')}
        </Button>
      </div>
    </div>
  );
};

export default TransactionFiltersComponent;
