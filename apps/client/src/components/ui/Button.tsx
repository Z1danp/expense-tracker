// props def

interface ButtonProps {
  label: string;
  isDisabled: boolean;
}

const Button = ({ label, isDisabled }: ButtonProps) => {
    return (
        <button disabled={isDisabled} className="border-3 border-white bg-red text-white">
            {label}
        </button>
    )
};

export default Button