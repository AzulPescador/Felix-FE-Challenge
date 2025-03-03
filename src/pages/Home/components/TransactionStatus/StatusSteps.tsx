import type React from 'react';
import { twMerge } from 'tailwind-merge';

interface StatusStepsProps {
  currentStatus: 'Pending' | 'Completed' | 'Failed' | 'In Progress';
  className?: string;
}

const StatusSteps: React.FC<StatusStepsProps> = ({
  currentStatus,
  className,
}) => {
  const steps = ['Sent', 'Processing', 'Delivered'];

  return (
    <div className={twMerge('w-full max-w-md mx-auto', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted =
            currentStatus === 'Completed' ||
            (currentStatus === 'In Progress' && index < 2) ||
            (currentStatus === 'Pending' && index === 0);
          const isCurrent =
            (currentStatus === 'In Progress' && index === 2) ||
            (currentStatus === 'Pending' && index === 1);
          const isFailed = currentStatus === 'Failed';

          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={twMerge(
                  'w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium',
                  isCompleted && 'bg-green-500 border-green-500 text-white',
                  isCurrent && 'bg-blue-500 border-blue-500 text-white',
                  isFailed && 'bg-red-500 border-red-500 text-white',
                  !isCompleted &&
                    !isCurrent &&
                    !isFailed &&
                    'border-gray-300 text-gray-500'
                )}
              >
                {isCompleted && (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {isFailed && (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {!isCompleted && !isFailed && index + 1}
              </div>
              <span
                className={twMerge(
                  'mt-2 text-xs font-medium',
                  isCompleted && 'text-green-500',
                  isCurrent && 'text-blue-500',
                  isFailed && 'text-red-500',
                  !isCompleted && !isCurrent && !isFailed && 'text-gray-500'
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusSteps;
