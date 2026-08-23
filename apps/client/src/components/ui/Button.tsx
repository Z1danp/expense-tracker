// props def

import type { ReactNode } from 'react';

interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  className?: string;
  isDisabled?: boolean;
  onClick: () => void;
}

const Button = ({ label, isDisabled, className, icon, onClick }: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      className={`border-3 border-white bg-red text-white ${className}`}
      onClick={onClick}
    >
      {label ? label: icon}
    </button>
  );
};

export default Button;
