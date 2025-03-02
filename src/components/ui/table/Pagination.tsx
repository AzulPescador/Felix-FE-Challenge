import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import PaginationButton from './PaginationButton';

interface PaginationProps {
  currentPage: number;
  totalItems?: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems = 24, // API does not return total count, hardcoded for now
  itemsPerPage,
  onPageChange,
  className = '',
}) => {
  const { t } = useTranslation();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [1, '...', currentPage, '...', totalPages];
    }
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className={twMerge('flex items-center justify-between', className)}>
      <div className="flex-1 flex justify-between sm:hidden">
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          ariaLabel={t('dashboard.pagination.previous')}
        >
          {t('dashboard.pagination.previous')}
        </PaginationButton>
        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          ariaLabel={t('dashboard.pagination.next')}
        >
          {t('dashboard.pagination.next')}
        </PaginationButton>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          {t('dashboard.pagination.showing')}{' '}
          <span className="font-medium">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{' '}
          {t('dashboard.pagination.to')}{' '}
          <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{' '}
          {t('dashboard.pagination.of')}{' '}
          <span className="font-medium">{totalItems}</span>{' '}
          {t('dashboard.pagination.results')}
        </p>

        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <PaginationButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            ariaLabel={t('dashboard.pagination.previous')}
          >
            &lt;
          </PaginationButton>

          {pageNumbers.map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={twMerge(
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === currentPage
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                )}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-2 py-2 text-gray-500">
                ...
              </span>
            )
          )}

          <PaginationButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            ariaLabel={t('dashboard.pagination.next')}
          >
            &gt;
          </PaginationButton>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
