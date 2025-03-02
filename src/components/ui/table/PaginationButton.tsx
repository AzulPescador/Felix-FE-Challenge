import { twMerge } from 'tailwind-merge';

const PaginationButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  className?: string;
  ariaLabel: string;
}> = ({ onClick, disabled, children, className, ariaLabel }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={twMerge(
      'relative inline-flex items-center px-2 py-2 border text-sm font-medium',
      disabled
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
        : 'bg-white text-gray-700 hover:bg-gray-50',
      className
    )}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default PaginationButton;
