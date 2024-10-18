import { useNavigate } from "react-router-dom";
import { CTAButton } from "../components";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`bg-wave font-poppins pb-10 bg-cover bg-no-repeat min-h-screen pt-10 px-5`}
    >
      <div className="flex justify-center items-center">
        <img
          src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1729153733/logo_bje77d.png"
          className="p-1 w-60 border-cta border-4 pointer-events-none bg-white bg-opacity-50 rounded-full"
        />
      </div>
      {/* Title */}
      <p className="text-white drop-shadow-lg font-bold text-3xl text-center mt-10">
        Create Stunning Presentations & Documents in Minutes with AI !
      </p>
      {/* Subtitle */}
      <p className="text-white font-medium text-xl drop-shadow-lg drop-shadow-cta text-center mt-8">
        Transform your ideas into visually captivating slides or documents
        effortlessly. Simply input your content, and let AI do the magic!
      </p>

      {/* Choose either FlashCards or MCQs  */}
      <p className="text-white drop-shadow-lg mt-10 text-xl font-semibold text-center">
        What should we create for you?
      </p>

      <div className="flex mt-10 justify-center gap-x-10 gap-y-10 flex-wrap">
        <CTAButton
          text={"Create Presentations"}
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
  );
};

export default Home;
