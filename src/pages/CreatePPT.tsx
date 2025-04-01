import { useDarkMode } from "../context/DarkModeContext";
import { PPTGenerator } from "../components";

const CreatePPT = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`${
        isDarkMode ? "bg-animatedWaveDark" : "bg-animatedWave"
      }  font-poppins  bg-cover bg-no-repeat py-10 pb-32 px-5`}
    >
      <PPTGenerator />
    </div>
  );
};

export default CreatePPT;
