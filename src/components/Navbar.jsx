import { Link } from "react-router-dom";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import CTAButton from "./CTAButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    // Navbar - Displayed on Large Screens
    <div className="font-poppins relative w-full flex p-5 shadow-md z-5 justify-between items-center">
      {/* Logo + Title - Link to home page */}
      <Link to="/" className="flex items-center gap-x-3 ml-3">
        <img
          src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1729153733/logo_bje77d.png"
          className="h-9 w-9"
          alt="SmartSlide AI"
        />
        <span className="text-xl text-cta font-medium">SmartSlide AI</span>
      </Link>
      {/* Links on the right side */}
      <div className="hidden pr-10 md:flex items-center gap-x-10 font-medium">
        {/* To Presentation Page */}
        <Link
          to="/create-ppt"
          className="flex gap-x-3 items-center hover:text-cta transition-all"
        >
          Create Presentation
        </Link>
      </div>
      {/* Hamburger button to open drawer */}
      <RxHamburgerMenu
        onClick={() => setOpen(true)}
        className="md:hidden text-xl cursor-pointer text-cta transition-all"
      />

      {/* Pop out div - displayed when hamburger is clicked  */}
      <div
        className={`bg-wave2 bg-cover h-screen w-full text-xl md:text-lg fixed top-0 right-0 z-50 bg-white pb-6 text-center shadow-md ${
          open ? "translate-x-0" : "translate-x-[100%]"
        } transition-all duration-500`}
      >
        {/* Top Section - Logo + Cross button */}
        <div className="flex justify-between items-center pt-5 px-5 lg:px-10 mb-14">
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
              className="h-10 pointer-events-none"
            />
            <p className="text-xl text-cta font-semibold  pr-2">
              SmartSlide AI
            </p>
          </div>
          {/* Close drawer */}
          <RxCross2
            onClick={() => setOpen(false)}
            className="cursor-pointer text-2xl text-cta"
          />
        </div>
        {/* Main Section */}
        <div className="px-8 mt-14 text-2xl flex flex-col items-center gap-y-6">
          {/* Logo */}
          <img
            src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1729153733/logo_bje77d.png"
            className="w-40 pointer-events-none"
          />
          {/* Title + subtitle */}
          <p className="font-medium mt-8 text-hovercta w-[70%]">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
