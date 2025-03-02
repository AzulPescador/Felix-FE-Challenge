interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  isTotal?: boolean;
  className?: string;
}

const DetailRow: React.FC<DetailRowProps> = ({
  label,
  value,
  isTotal = false,
  className = ''
}) => {
  const baseClasses = isTotal ? 'border-t pt-2' : '';
  const labelClasses = isTotal ? 'text-sm font-medium' : 'text-sm text-gray-500';
  const valueClasses = isTotal ? 'font-semibold' : 'font-medium';

  return (
    <div className={`flex justify-between ${baseClasses} ${className}`}>
      <span className={labelClasses}>{label}</span>
      <span className={valueClasses}>{value}</span>
    </div>
  );
};

export default DetailRow; 