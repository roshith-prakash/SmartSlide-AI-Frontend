import { useState } from "react";
import { axiosInstance } from "../utils/axios";
import CTAButton from "./CTAButton";

const DocumentGenerator = () => {
  const [topic, setTopic] = useState("");
  const [paragraphs, setParagraphs] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [documentURL, setDocumentURL] = useState();

  // To create a Word Document according to the provided parameters
  const handleGenerateDocument = async () => {
    try {
      // Disabled all inputs
      setDisabled(true);
      // Remove previous URL
      setDocumentURL();

      // Call API
      const response = await axiosInstance.post(
        "/create-document",
        { topic, paragraphs },
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      if (response.status != 400) {
        // Create a blob link to download the file
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          })
        );

        // Set URL to presentation
        setDocumentURL(url);

        // Create link to download the ppt
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Document.docx"); // Specify the file name
        document.body.appendChild(link);
        link.click();
        link.remove(); // Remove the link after clicking
      } else {
        console.log("Cannot create document on provided topic");
      }

      // Enable button
      setDisabled(false);
    } catch (error) {
      // Errors
      if (error.status == 400) {
        console.log("Cannot create document on provided topic");
      } else {
        console.error("Error generating Document:", error);
      }

      // Enable button
      setDisabled(false);
    }
  };

  // To download the document once it has been created
  const download = () => {
    const link = document.createElement("a");
    link.href = documentURL;
    link.setAttribute("download", "Document.docx"); // Specify the file name
    document.body.appendChild(link);
    link.click();
    link.remove(); // Remove the link after clicking
  };

  return (
    <>
      <div className="flex pb-10 h-full min-h-screen justify-center items-center">
        {/* Card */}
        <div className="max-w-[95%] px-5 py-10 flex flex-col gap-y-5 bg-white rounded-lg shadow">
          {/* Title */}
          <h1 className="pb-8 px-3 text-transparent bg-gradient-to-b from-cta to-hovercta bg-clip-text text-center text-3xl font-medium">
            SmartSlide AI -{" "}
            <span className="text-nowrap">
              Create Word Documents in a Flash!
            </span>
          </h1>
          {/* Insert Presentation topic */}
          <div className="flex items-center mx-3 gap-x-2 my-4">
            <label>Document Topic : </label>
            <input
              type="text"
              value={topic}
              disabled={disabled}
              className="border-2 h-10 flex-1 px-5 py-2 rounded-lg  disabled:bg-gray-200"
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter presentation topic"
            />
          </div>
          {/* Select number of slides */}
          <div className="flex items-center mx-3 gap-x-2 my-4">
            <label>Number of Paragraphs : </label>
            <select
              value={paragraphs}
              disabled={disabled}
              className="flex-1 h-10 border-2 rounded-lg p-1 text-center bg-transparent outline-none cursor-pointer"
              onChange={(e) => setParagraphs(e.target.value)}
            >
              {Array(10)
                .fill(0)
                .map((item, i) => {
                  return (
                    <option
                      key={i}
                      value={i + 1}
                      selected={paragraphs == i + 1}
                    >
                      {i + 1} Paragraph(s)
                    </option>
                  );
                })}
            </select>
          </div>

          {/* Word Doc Created */}
          {documentURL && (
            <p className="text-center mx-3 my-5">
              Your Word Document has been created!
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-x-5">
            <CTAButton
              disabled={disabled}
              onClick={handleGenerateDocument}
              text={
                disabled
                  ? "Creating your Document..."
                  : "Generate Word Document"
              }
            />
            {documentURL && (
              <CTAButton
                disabled={disabled}
                onClick={download}
                text={"Download your Document!"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentGenerator;
