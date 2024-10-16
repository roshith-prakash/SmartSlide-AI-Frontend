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
    <div className="px-5">
      <h1 className="px-3 py-8 text-3xl italic font-medium font-serif">
        Generate PPT Presentation
      </h1>
      {/* Insert Presentation topic */}
      <div className="flex items-center mx-3 gap-x-2 my-4">
        <label>Presentation Topic : </label>
        <input
          type="text"
          value={topic}
          disabled={disabled}
          className="border-2 mx-3 px-5 py-2 rounded-lg  disabled:bg-gray-200"
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
          className="w-full lg:w-40 border-2 rounded-lg p-1 text-center bg-transparent outline-none"
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
          className="w-full lg:w-40 border-b-2 p-1 text-center bg-transparent outline-none"
          onChange={(e) => setPoints(e.target.value)}
        >
          <option selected={points == 1} value={1}>
            1
          </option>
          <option selected={points == 2} value={2}>
            2
          </option>
          <option selected={points == 3} value={3}>
            3
          </option>
          <option selected={points == 4} value={4}>
            4
          </option>
          <option selected={points == 5} value={5}>
            5
          </option>
        </select>
      </div>
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
      {/* Presentation Created */}
      {presentationURL && (
        <p className="mx-3 my-5">Your Presentation has been created!</p>
      )}

      {/* Buttons */}
      <div className="flex gap-x-5">
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
  );
};

export default PPTGenerator;
