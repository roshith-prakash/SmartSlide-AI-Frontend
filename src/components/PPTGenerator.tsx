import { useState } from "react";
import { axiosInstance } from "../utils/axios";
import CTAButton from "./CTAButton";
import toast from "react-hot-toast";
import Select from "./reuseit/Select";

const PPTGenerator = () => {
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState<number | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const [includeTable, setIncludeTable] = useState(false);
  const [presentationURL, setPresentationURL] = useState(null);
  const [error, setError] = useState(0);

  // To create a Presentation according to the provided parameters
  const handleGeneratePPT = async () => {
    setError(0);

    // Topic not entered by user
    if (!topic || topic?.length == 0) {
      setError(1);
      return;
    } else if (!slides || slides <= 0) {
      setError(2);
      return;
    } else if (!points || points <= 0) {
      setError(3);
      return;
    }

    try {
      // Disabled all inputs
      setDisabled(true);
      // Remove previous URL
      setPresentationURL(null);

      // Call API
      const response = await axiosInstance.post(
        "/create-ppt",
        { topic, slides, points, includeChart, includeTable },
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      // Presentation was created
      if (response.status != 400) {
        // Create a blob link to download the file
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          })
        );

        // Set URL to presentation
        setPresentationURL(url);

        // Create link to download the ppt
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Presentation.pptx"); // Specify the file name
        document.body.appendChild(link);
        link.click();
        link.remove(); // Remove the link after clicking
      }
      // Presentation was not created
      else {
        console.log("Cannot create PPT on provided topic");
        toast.error("Cannot create a Presentation on the provided topic.");
      }

      // Enable button
      setDisabled(false);
    } catch (error) {
      // Errors
      if (error.status == 400) {
        console.log("Cannot create PPT on provided topic");
        toast.error("Could not create a presentation on the provided topic.");
      } else {
        console.error("Error generating PPT:", error);
        toast.error("OOPS! Something went wrong.");
      }

      // Enable button
      setDisabled(false);
    }
  };

  // To download the presentation once it has been created
  const download = () => {
    const link = document.createElement("a");
    link.href = presentationURL;
    link.setAttribute("download", "Presentation.pptx"); // Specify the file name
    document.body.appendChild(link);
    link.click();
    link.remove(); // Remove the link after clicking
  };

  return (
    <>
      <div className="flex pb-10 h-full min-h-screen justify-center items-center">
        {/* Card */}
        <div
          data-aos="fade-up"
          className="max-w-[95%] px-8 py-10 flex flex-col gap-y-5 bg-white dark:bg-secondarydarkbg rounded-lg shadow border-2 dark:border-darkmodetext/50"
        >
          {/* Title */}
          <h1 className="pb-8 px-3 flex gap-x-1 justify-center items-center flex-wrap text-cta dark:text-darkmodeCTA text-center text-2xl md:text-3xl font-medium ">
            SmartSlide AI -
            <span className="text-nowrap">
              Create Presentations in a Flash!
            </span>
          </h1>
          {/* Insert Presentation topic */}
          <div className="flex flex-col gap-y-3 md:flex-row md:items-center gap-x-2 my-4">
            <label className="text-lg lg:text-base font-medium">
              Presentation Topic :{" "}
            </label>
            <input
              type="text"
              value={topic}
              disabled={disabled}
              className="border-2 dark:border-darkmodetext/50 bg-transparent h-10 flex-1 px-5 py-2 rounded-lg disabled:bg-gray-200"
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter presentation topic"
            />
          </div>
          {error == 1 && (
            <p className="text-red-500">
              Please enter a topic for the document.
            </p>
          )}
          {/* Select number of slides */}
          <div className="flex flex-col gap-y-3 md:flex-row md:items-center gap-x-2 my-4">
            <label className="text-lg lg:text-base font-medium">
              Number of Slides :{" "}
            </label>
            <Select
              options={[
                { text: "1 Slide(s)", value: 1 },
                { text: "2 Slide(s)", value: 2 },
                { text: "3 Slide(s)", value: 3 },
                { text: "4 Slide(s)", value: 4 },
                { text: "5 Slide(s)", value: 5 },
                { text: "6 Slide(s)", value: 6 },
                { text: "7 Slide(s)", value: 7 },
                { text: "8 Slide(s)", value: 8 },
                { text: "9 Slide(s)", value: 9 },
                { text: "10 Slide(s)", value: 10 },
              ]}
              className="flex-1 h-10 border-2 py-2 rounded-lg p-1 text-center bg-transparent outline-none cursor-pointer"
              onChange={(e) => setSlides(Number(e))}
            />
          </div>
          {/* Select number of points */}
          <div className="flex flex-col gap-y-3 md:flex-row md:items-center gap-x-2 my-4">
            <label className="text-lg lg:text-base font-medium">
              Number of Points :{" "}
            </label>
            <Select
              options={[
                { text: "1 Point(s)", value: 1 },
                { text: "2 Point(s)", value: 2 },
                { text: "3 Point(s)", value: 3 },
                { text: "4 Point(s)", value: 4 },
                { text: "5 Point(s)", value: 5 },
              ]}
              className="flex-1 h-10 border-2 py-2 rounded-lg p-1 text-center bg-transparent outline-none cursor-pointer"
              onChange={(e) => setPoints(Number(e))}
            />
          </div>
          {/* Checkboxes */}
          <div className="flex flex-wrap text-lg lg:text-base font-medium py-5 justify-evenly">
            {/* Checkbox for Graphs */}
            <div className="flex items-center mx-3 gap-x-2 my-4">
              <input
                disabled={disabled}
                type="checkbox"
                className="h-5 w-5 cursor-pointer accent-cta"
                onChange={(e) => setIncludeChart(e.target.checked)}
              />
              <label>Include Graphs</label>
            </div>
            {/* Checkbox for Tables */}
            <div className="flex items-center mx-3 gap-x-2 my-4">
              <input
                disabled={disabled}
                type="checkbox"
                className=" h-5 w-5 cursor-pointer accent-cta"
                onChange={(e) => setIncludeTable(e.target.checked)}
              />
              <label>Include Tables</label>
            </div>
          </div>
          {/* Presentation Created */}
          {presentationURL && (
            <p className="text-center mx-3 my-5">
              Your Presentation has been created!
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-y-5 justify-center py-5 gap-x-5">
            <CTAButton
              disabled={disabled}
              onClick={handleGeneratePPT}
              text={
                disabled
                  ? "Creating your Presentation..."
                  : "Generate Presentation"
              }
              className={":text-lg lg:text-base"}
            />
            {presentationURL && (
              <CTAButton
                disabled={disabled}
                onClick={download}
                text={"Download your Presentation!"}
                className={":text-lg lg:text-base"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PPTGenerator;
