import { useState } from "react";
import { axiosInstance } from "../utils/axios";
import CTAButton from "../components/CTAButton";

const PPTGenerator = () => {
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState(1);
  const [points, setPoints] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const [includeTable, setIncludeTable] = useState(false);
  const [presentationURL, setPresentationURL] = useState();

  // To create a Presentation according to the provided parameters
  const handleGeneratePPT = async () => {
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
      } else {
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
    <div className="flex pb-10 h-full min-h-screen justify-center items-center">
      <div className="px-5 py-10 flex flex-col gap-y-5 bg-white rounded shadow">
        <h1 className="px-3 text-transparent bg-gradient-to-b from-cta to-hovercta bg-clip-text text-center text-3xl italic font-medium font-serif">
          SmartSlide AI - Create Presentations in a Flash!
        </h1>
        {/* Insert Presentation topic */}
        <div className="flex items-center mx-3 gap-x-2 my-4">
          <label>Presentation Topic : </label>
          <input
            type="text"
            value={topic}
            disabled={disabled}
            className="border-2 flex-1 px-5 py-2 rounded-lg  disabled:bg-gray-200"
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter presentation topic"
          />
        </div>
        {/* Select number of slides */}
        <div className="flex items-center mx-3 gap-x-2 my-4">
          <label>Number of Slides : </label>
          <select
            value={slides}
            disabled={disabled}
            className="flex-1 border-2 rounded-lg p-1 text-center bg-transparent outline-none cursor-pointer"
            onChange={(e) => setSlides(e.target.value)}
          >
            {Array(10)
              .fill(0)
              .map((item, i) => {
                return (
                  <option key={i} value={i + 1} selected={points == i + 1}>
                    {i + 1}
                  </option>
                );
              })}
          </select>
        </div>
        {/* Select number of points */}
        <div className="flex items-center mx-3 gap-x-2 my-4">
          <label>Number of Points : </label>
          <select
            value={points}
            disabled={disabled}
            className="flex-1 border-2 rounded-lg p-1 text-center bg-transparent outline-none cursor-pointer"
            onChange={(e) => setPoints(e.target.value)}
          >
            {Array(5)
              .fill(0)
              .map((item, i) => {
                return (
                  <option key={i} value={i + 1} selected={points == i + 1}>
                    {i + 1}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="flex py-5 justify-evenly">
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
          <p className="mx-3 my-5">Your Presentation has been created!</p>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-x-5">
          <CTAButton
            disabled={disabled}
            onClick={handleGeneratePPT}
            text={disabled ? "Creating your PPT..." : "Generate PPT"}
          />
          {presentationURL && (
            <CTAButton
              disabled={disabled}
              onClick={download}
              text={"Download your Presentation!"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PPTGenerator;
