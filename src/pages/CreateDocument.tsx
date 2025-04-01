import { useDarkMode } from "../context/DarkModeContext";
import { DocumentGenerator } from "../components";

const CreateDocument = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`${
        isDarkMode ? "bg-animatedWaveDark" : "bg-animatedWave"
      }  font-poppins  bg-cover bg-no-repeat py-10 pb-32 px-5`}
    >
      <DocumentGenerator />
    </div>
  );
};

export default CreateDocument;
