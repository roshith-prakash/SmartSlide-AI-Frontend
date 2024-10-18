import PropTypes from "prop-types";

const CTAButton = ({ text, onClick, disabled, className, color }) => {
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

CTAButton.propTypes = {
  text: PropTypes.string.isRequired, // Text to display on the button
  onClick: PropTypes.func.isRequired, // Function to call on button click
  disabled: PropTypes.bool, // Optional: Indicates if the button is disabled
  className: PropTypes.string, // Optional: Additional class names
  color: PropTypes.string, // Optional: Additional class names
};

CTAButton.defaultProps = {
  disabled: false, // Default value for disabled
  className: "", // Default value for className
  color: "bg-cta disabled:bg-cta/45",
};

export default CTAButton;
