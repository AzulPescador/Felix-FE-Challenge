import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}
const Button: FC<ButtonProps> = ({ onClick, children, icon, className }) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'px-4 py-2 bg-logo-blue text-white rounded-md hover:bg-blue-600',
        className
      )}
    >
      {icon ? (
        <div className="flex gap-2 items-center text-sm">
          {icon} {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
