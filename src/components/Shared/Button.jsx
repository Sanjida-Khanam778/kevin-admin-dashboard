const Button = ({ children, onClick, disabled = false, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-2 rounded-lg font-medium text-white
        bg-primary
        disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
        transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
