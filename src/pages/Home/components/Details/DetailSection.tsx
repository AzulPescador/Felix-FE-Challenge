import { twMerge } from 'tailwind-merge';
interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DetailSection: React.FC<DetailSectionProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <div className={twMerge('bg-gray-50 p-4 rounded-lg', className)}>
      <h3 className="text-lg font-medium text-gray-500 mb-3">{title}</h3>
      {children}
    </div>
  );
};

export default DetailSection;
