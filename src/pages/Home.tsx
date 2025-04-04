import { useNavigate } from "react-router-dom";
import { CTAButton } from "../components";
import { useDarkMode } from "../context/DarkModeContext";

const Home = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`${
        isDarkMode ? "bg-animatedWaveDark" : "bg-animatedWave"
      }  font-poppins  bg-cover bg-no-repeat py-20 pb-32 px-5`}
    >
      {/* AI Image */}
      <div data-aos="zoom-in" className="flex justify-center items-center">
        <img
          src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1729153733/logo_bje77d.png"
          className="p-1 w-60 border-cta border-4 pointer-events-none bg-white bg-opacity-50 dark:bg-darkbg rounded-full spin-slow"
        />
      </div>
      {/* Title */}
      <p
        data-aos="fade-up"
        data-aos-delay="150"
        className="text-white drop-shadow-lg font-bold text-3xl text-center mt-10"
      >
        Create Stunning Presentations & Documents in Minutes with AI !
      </p>
      {/* Subtitle */}
      <p
        data-aos="fade-up"
        data-aos-delay="300"
        className="text-white font-medium text-xl drop-shadow-lg drop-shadow-cta text-center mt-8"
      >
        Transform your ideas into visually captivating slides or documents
        effortlessly. Simply input your content, and let AI do the magic!
      </p>

      {/* Choose either Presentation or Document  */}
      <div data-aos="fade-up" data-aos-delay="600">
        <p className="text-white drop-shadow-lg mt-10 text-xl font-semibold text-center">
          What should we create for you?
        </p>

        <div className="flex mt-10 justify-center gap-x-10 gap-y-10 flex-wrap">
          <CTAButton
            text={"Create Presentation"}
            onClick={() => {
              navigate("/create-ppt");
            }}
          />
          <CTAButton
            text={"Create Word Document"}
            onClick={() => {
              navigate("/create-word");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
