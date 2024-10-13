import { useState } from "react";
import axios from "axios";

const PPTGenerator = () => {
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState("");
  const [points, setPoints] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleGeneratePPT = async () => {
    try {
      setDisabled(true);
      const response = await axios.post(
        "https://ppt-creator.onrender.com/api/v1/create-ppt",
        { topic },
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      // Create a blob link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Presentation.pptx"); // Specify the file name
      document.body.appendChild(link);
      link.click();
      link.remove(); // Remove the link after clicking

      setDisabled(false);
    } catch (error) {
      console.error("Error generating PPT:", error);
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
