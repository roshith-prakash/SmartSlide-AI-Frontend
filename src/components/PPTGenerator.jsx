import { useState } from "react";
import { axiosInstance } from "../utils/axios";
import CTAButton from "./CTAButton";

const PPTGenerator = () => {
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState(1);
  const [points, setPoints] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const [includeTable, setIncludeTable] = useState(false);
  const [presentationURL, setPresentationURL] = useState();
  const [error, setError] = useState(0);

  // To create a Presentation according to the provided parameters
  const handleGeneratePPT = async () => {
    setError(0);

    // Topic not entered by user
    if (!topic || topic?.length == 0) {
      setError(1);
      return;
    }

    try {
      // Disabled all inputs
      setDisabled(true);
      // Remove previous URL
      setPresentationURL();

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
      }

      // Enable button
      setDisabled(false);
    } catch (error) {
      // Errors
      if (error.status == 400) {
        console.log("Cannot create PPT on provided topic");
      } else {
        console.error("Error generating PPT:", error);
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
        <div className="max-w-[95%] px-8 py-10 flex flex-col gap-y-5 bg-white rounded-lg shadow max-[376px]:translate-y-0 -translate-y-8 md:translate-y-0 border-2">
          {/* Title */}
          <h1 className="pb-8 px-3 text-transparent bg-gradient-to-b from-[#bc3718] to-[#ff9777] bg-clip-text text-center text-2xl md:text-3xl font-medium ">
            SmartSlide AI -{" "}
            <span className="text-xl md:text-3xl text-nowrap">
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
              className="border-2 h-10 flex-1 px-5 py-2 rounded-lg disabled:bg-gray-200"
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
            <select
              value={slides}
              disabled={disabled}
              className="flex-1 h-10 border-2 py-2 rounded-lg p-1 text-center bg-transparent outline-none cursor-pointer"
              onChange={(e) => setSlides(e.target.value)}
            >
              {Array(10)
                .fill(0)
                .map((item, i) => {
                  return (
                    <option key={i} value={i + 1} selected={points == i + 1}>
                      {i + 1} Slide(s)
                    </option>
                  );
                })}
            </select>
          </div>
          {/* Select number of points */}
          <div className="flex flex-col gap-y-3 md:flex-row md:items-center gap-x-2 my-4">
            <label className="text-lg lg:text-base font-medium">
              Number of Points :{" "}
            </label>
            <select
              value={points}
              disabled={disabled}
              className="flex-1 h-10 border-2 rounded-lg p-1 text-center bg-transparent outline-none cursor-pointer"
              onChange={(e) => setPoints(e.target.value)}
            >
              {Array(5)
                .fill(0)
                .map((item, i) => {
                  return (
                    <option key={i} value={i + 1} selected={points == i + 1}>
                      {i + 1} Point(s) per Slide
                    </option>
                  );
                })}
            </select>
          </div>
          {/* Checkboxes */}
          <div className="flex flex-wrap text-lg lg:text-base font-medium py-5 justify-evenly">
            {/* Checkbox for Graphs */}
            <div className="flex items-center mx-3 gap-x-2 my-4">
              <input
                disabled={disabled}
                type="checkbox"
                className="h-5 w-5 cursor-pointer accent-[#b93927]"
                onChange={(e) => setIncludeChart(e.target.checked)}
              />
              <label>Include Graphs</label>
            </div>
            {/* Checkbox for Tables */}
            <div className="flex items-center mx-3 gap-x-2 my-4">
              <input
                disabled={disabled}
                type="checkbox"
                className=" h-5 w-5 cursor-pointer accent-[#b93927]"
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
          <div className="flex justify-center py-5 gap-x-5">
            <CTAButton
              disabled={disabled}
              onClick={handleGeneratePPT}
              text={
                disabled
                  ? "Creating your Presentation..."
                  : "Generate Presentation"
              }
              color={"bg-[#b93927] disabled:bg-[#b93927]/45"}
              className={"text-xl md:text-lg lg:text-base"}
            />
            {presentationURL && (
              <CTAButton
                disabled={disabled}
                onClick={download}
                text={"Download your Presentation!"}
                color={"bg-[#b93927] disabled:bg-[#b93927]/45"}
                className={"text-xl md:text-lg lg:text-base"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PPTGenerator;
