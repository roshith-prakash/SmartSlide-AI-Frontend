import { MouseEventHandler } from "react";

const CTAButton = ({
  text,
  onClick,
  disabled = false,
  className,
  color = "bg-cta disabled:bg-cta/45",
}: {
  text: string | React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  color?: string;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`font-poppins text-white py-1.5 px-5 rounded-lg font-medium hover:scale-105 transition-all ${color} ${className}`}
    >
      {text}
    </button>
  );
};

export default CTAButton;
