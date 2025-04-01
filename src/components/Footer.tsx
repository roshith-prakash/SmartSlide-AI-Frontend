const Footer = () => {
  return (
    <footer
      className={`bg-[#e1e1e1] dark:bg-secondarydarkbg  border-t-8 border-darkbg dark:border-darkmodetext/75 font-inter min-h-50vh px-10 relative  pt-36 pb-20 dark:text-darkmodetext`}
    >
      {/* Floating Div */}
      <div className="border-darkbg dark:border-darkmodetext/75 absolute -top-16 left-1/2 flex h-32 w-[90vw] -translate-x-1/2 items-center justify-around rounded-lg bg-[#1f1e1e] text-white lg:w-[80vw] border-4">
        <p className="text-xl px-5 text-center font-medium">
          Create Stunning Presentations & Documents in Minutes with AI !
        </p>
      </div>

      {/* Main Footer section */}
      <div className="flex flex-wrap-reverse gap-y-8 pt-3 lg:flex-row">
        <div className="flex w-full md:flex-1 flex-col items-center justify-center">
          <p className="text-5xl font-bold text-cta dark:text-darkmodeCTA">
            SmartSlide AI
          </p>
          <p className="text-lg font-medium text-center text-hovercta/75 dark:text-darkmodeCTA/75 pt-5 px-6">
            Transform your ideas into visually captivating slides or documents
            effortlessly!
          </p>
        </div>

        <div className="w-full md:flex-1 items-center justify-center lg:flex">
          <img
            src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1729153733/logo_bje77d.png"
            alt="Quizzer AI"
            className="pointer-events-none h-32 md:h-60 mx-auto"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
