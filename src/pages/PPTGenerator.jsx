import { useState } from "react";
import { axiosInstance } from "../utils/axios";

const PPTGenerator = () => {
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState("");
  const [points, setPoints] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);

  const handleGeneratePPT = async () => {
    try {
      setDisabled(true);
      const response = await axiosInstance.post(
        "/create-ppt",
        { topic, slides, points, includeChart },
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

      setDisabled(false);
    } catch (error) {
      if (error.status == 400) {
        console.log("Cannot create PPT on provided topic");
      } else {
        console.error("Error generating PPT:", error);
      }

      setDisabled(false);
    }
  };

  return (
    <div className="px-5">
      <h1 className="px-3 py-8 text-3xl italic font-medium font-serif">
        Generate PPT Presentation
      </h1>
      <div className="flex items-center mx-3 gap-x-2 my-4">
        <label>Presentation Topic : </label>
        <input
          type="text"
          value={topic}
          disabled={disabled}
          className="border-2 border-black mx-3 px-5 py-2 rounded  disabled:bg-gray-200"
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter presentation topic"
        />
      </div>
      <div className="flex items-center mx-3 gap-x-2 my-4">
        <label>Number of Slides : </label>
        <input
          type="number"
          value={slides}
          disabled={disabled}
          className="border-2 border-black mx-3 px-5 py-2 rounded disabled:bg-gray-200"
          onChange={(e) => setSlides(e.target.value)}
          placeholder="Enter number of slides"
        />
      </div>
      <div className="flex items-center mx-3 gap-x-2 my-4">
        <label>Number of Points : </label>
        <input
          type="number"
          value={points}
          disabled={disabled}
          className="border-2 border-black mx-3 px-5 py-2 rounded  disabled:bg-gray-200"
          onChange={(e) => setPoints(e.target.value)}
          placeholder="Enter number of points per slide"
        />
      </div>
      <div className="flex items-center mx-3 gap-x-2 my-4">
        <input
          disabled={disabled}
          type="checkbox"
          className=" h-5 w-5"
          onChange={(e) => setIncludeChart(e.target.checked)}
        />
        <label>Include Graphs</label>
      </div>
      <button
        disabled={disabled}
        className="border-2 border-black mx-3 my-5 px-5 py-2 rounded hover:scale-105 transition-all  disabled:bg-gray-200"
        onClick={handleGeneratePPT}
      >
        {disabled ? "Creating your PPT..." : "Generate PPT"}
      </button>
      <br />
    </div>
  );
};

export default PPTGenerator;
