import { Link } from "react-router-dom";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import CTAButton from "./CTAButton";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { IoMoon, IoSunnySharp } from "react-icons/io5";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    // Navbar - Displayed on Large Screens
    <div className="font-poppins bg-white border-b-4 border-darkbg dark:border-darkmodetext/75 dark:bg-darkbg relative w-full flex p-5 shadow-md z-5 justify-between items-center dark:text-darkmodetext">
      {/* Logo + Title - Link to home page */}
      <Link to="/" className="flex items-center gap-x-3 ml-3">
        <img
          src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1729153733/logo_bje77d.png"
          className="h-9 w-9"
          alt="SmartSlide AI"
        />
        <span className="text-xl text-cta dark:text-darkmodeCTA font-semibold">
          SmartSlide AI
        </span>
      </Link>
      {/* Links on the right side */}
      <div className="hidden pr-10 md:flex items-center gap-x-10 font-medium">
        {/* To Presentation Page */}
        <Link
          to="/create-ppt"
          className="flex gap-x-3 items-center hover:text-cta dark:hover:text-darkmodeCTA transition-all"
        >
          Create Presentation
        </Link>
        <Link
          to="/create-word"
          className="flex gap-x-3 items-center hover:text-cta dark:hover:text-darkmodeCTA transition-all"
        >
          Create Word Document
        </Link>
        <button
          onClick={toggleDarkMode}
          className="hidden md:block outline-none "
        >
          {isDarkMode ? (
            <IoSunnySharp className="text-2xl hover:text-cta dark:hover:text-darkmodeCTA transition-all" />
          ) : (
            <IoMoon className="text-2xl hover:text-cta dark:hover:text-darkmodeCTA transition-all" />
          )}
        </button>
      </div>
      {/* Open Drawer button */}
      <div className="md:hidden flex gap-x-5 items-center">
        <button onClick={toggleDarkMode} className="outline-none">
          {isDarkMode ? (
            <IoSunnySharp className="text-2xl hover:text-cta dark:hover:text-darkmodeCTA transition-all" />
          ) : (
            <IoMoon className="text-2xl hover:text-cta dark:hover:text-darkmodeCTA transition-all" />
          )}
        </button>

        <RxHamburgerMenu
          onClick={() => setOpen(true)}
          className="md:hidden text-xl cursor-pointer hover:text-cta dark:hover:text-darkmodeCTA transition-all"
        />
      </div>

      {/* Pop out div - displayed when hamburger is clicked  */}
      <div
        className={`dark:bg-darkbg bg-animatedWave dark:bg-animatedWaveDark bg-cover h-screen w-full text-xl md:text-lg fixed top-0 right-0 z-50 bg-white pb-6 text-center shadow-md ${
          open ? "translate-x-0" : "translate-x-[100%]"
        } transition-all flex flex-col justify-between duration-500`}
      >
        {/* Top Section - Logo + Cross button */}
        <div className="flex justify-between items-center pt-5 px-5 lg:px-10 ">
          {/* Logo +Title */}
          <div
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
            className="flex items-center gap-x-3 ml-3 cursor-pointer"
          >
            <img
              src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1729153733/logo_bje77d.png"
              alt="SmartSlide AI"
              className="h-10 pointer-events-none bg-white dark:bg-darkbg rounded-full p-1 border-2 border-hovercta"
            />
            <p className="text-xl dark:text-darkmodeCTA text-white font-semibold  pr-2">
              SmartSlide AI
            </p>
          </div>
          {/* Close drawer */}
          <RxCross2
            onClick={() => setOpen(false)}
            className="cursor-pointer text-2xl dark:text-darkmodeCTA text-white"
          />
        </div>
        {/* Main Section */}
        <div className="px-8 text-2xl flex flex-col items-center gap-y-6">
          {/* Logo */}
          <img
            src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1729153733/logo_bje77d.png"
            className="p-1 w-52 border-cta border-4 pointer-events-none bg-white bg-opacity-50 dark:bg-darkbg rounded-full spin-slow"
          />
          {/* Title + subtitle */}
          <p className="font-medium mt-8 bg-gradient-to-br from-cta to-hovercta text-transparent bg-clip-text w-[70%]">
            SmartSlide AI -{" "}
            <span className="text-nowrap">
              Create Presentations in a Flash!
            </span>
          </p>
          {/* Presentation button */}
          <div className="mt-5 flex flex-col items-center gap-y-8">
            <CTAButton
              text={"Create Presentation"}
              onClick={() => {
                navigate("/create-ppt");
                setOpen(false);
              }}
              className="text-lg w-52"
            />
            <CTAButton
              text={"Create Word Document"}
              onClick={() => {
                navigate("/create-word");
                setOpen(false);
              }}
              className="text-lg w-52"
            />
          </div>
        </div>
        {/* Empty div so that justify works as required  */}
        <div></div>
      </div>
    </div>
  );
};

export default Navbar;
