import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

interface StatusStep {
  label: string;
  status: 'completed' | 'current' | 'upcoming' | 'failed';
}

interface StatusStepsProps {
  currentStatus: 'Pending' | 'Completed' | 'Failed' | 'In Progress';
  className?: string;
}

const StatusSteps: React.FC<StatusStepsProps> = ({
  currentStatus,
  className,
}) => {
  const { t } = useTranslation();

  const statusFlow: Record<StatusStepsProps['currentStatus'], string[]> = {
    Pending: ['Sent', 'Processing', 'Delivered'],
    'In Progress': ['Sent', 'Processing', 'Delivered'],
    Completed: ['Sent', 'Processing', 'Delivered', 'Completed'],
    Failed: ['Failed'],
  };

  const steps = statusFlow[currentStatus] || [];

  const statusSteps: StatusStep[] = steps.map((step, index) => ({
    label: t(`transaction.status.${step.toLowerCase()}`),
    status:
      currentStatus === 'Failed'
        ? 'failed'
        : currentStatus === 'In Progress'
          ? index === steps.length - 1
            ? 'current'
            : 'completed'
          : index < steps.length - 1
            ? 'completed'
            : 'current',
  }));

  return (
    <div className={twMerge('flex justify-between items-center', className)}>
      {statusSteps.map((step, index) => (
        <div key={step.label} className="flex items-center">
          <div className="relative">
            <div
              className={twMerge(
                'w-8 h-8 rounded-full flex items-center justify-center text-white text-sm',
                step.status === 'completed' && 'bg-green-500',
                step.status === 'current' && 'bg-blue-500',
                step.status === 'failed' && 'bg-red-500',
                step.status === 'upcoming' && 'bg-gray-200'
              )}
            >
              {index + 1}
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs">
              {step.label}
            </span>
          </div>
          {index < statusSteps.length - 1 && (
            <div
              className={twMerge(
                'w-full h-1 mx-2',
                step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StatusSteps;
