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

      console.log(response);

      if (response.status != 400) {
        // Create a blob link to download the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
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
    <div>
      <h1 className="p-5">Generate PPT Presentation</h1>
      <input
        type="text"
        value={topic}
        className="border-2 border-black mx-3"
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter presentation topic"
      />
      <input
        type="number"
        value={slides}
        className="border-2 border-black mx-3"
        onChange={(e) => setSlides(e.target.value)}
        placeholder="Enter number of slides"
      />
      <input
        type="number"
        value={points}
        className="border-2 border-black mx-3"
        onChange={(e) => setPoints(e.target.value)}
        placeholder="Enter number of points per slide"
      />
      <input
        type="checkbox"
        className="mx-1"
        onChange={(e) => setIncludeChart(e.target.checked)}
      />
      <label>Include Graphs</label>
      <button
        disabled={disabled}
        className="border-2 border-black mx-3"
        onClick={handleGeneratePPT}
      >
        Generate PPT
      </button>
    </div>
  );
};

export default PPTGenerator;
