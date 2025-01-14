import { useState } from "react";
import { axiosInstance } from "../utils/axios";
import CTAButton from "./CTAButton";
import toast from "react-hot-toast";

const DocumentGenerator = () => {
  const [topic, setTopic] = useState("");
  const [paragraphs, setParagraphs] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [documentURL, setDocumentURL] = useState<string | null>(null);
  const [error, setError] = useState(0);

  // To create a Word Document according to the provided parameters
  const handleGenerateDocument = async () => {
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
      setDocumentURL(null);

      // Call API
      const response = await axiosInstance.post(
        "/create-document",
        { topic, paragraphs },
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      // If document was created
      if (response.status != 400) {
        // Create a blob link to download the file
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          })
        );

        // Set URL to document
        setDocumentURL(url);

        // Create link to download the document
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Document.docx"); // Specify the file name
        document.body.appendChild(link);
        link.click();
        link.remove(); // Remove the link after clicking
      }
      // Document was not created
      else {
        console.log("Cannot create document on provided topic");
        toast.error("Cannot create a document on the provided topic.");
      }

      // Enable button
      setDisabled(false);
    } catch (error) {
      // Errors
      if (error.status == 400) {
        console.log("Cannot create document on provided topic");
        toast.error("Could not create a document on the provided topic.");
      } else {
        console.error("Error generating document:", error);
        toast.error("OOPS! Something went wrong.");
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
        <div
          data-aos="fade-up"
          className="max-w-[95%] px-8 py-10 flex flex-col gap-y-5 bg-white rounded-lg shadow max-[376px]:mt-0 -mt-8 md:mt-0 border-2"
        >
          {/* Title */}
          <h1 className="pb-8 px-3 text-transparent bg-gradient-to-b from-[#113e8f] to-[#2463bf] bg-clip-text text-center text-2xl md:text-3xl font-medium">
            SmartSlide AI -{" "}
            <span className="text-lg md:text-3xl text-nowrap">
              Create Word Documents in a Flash!
            </span>
          </h1>
          {/* Insert document topic */}
          <div className="flex flex-col gap-y-3 md:flex-row md:items-center gap-x-2 my-4">
            <label className="text-lg lg:text-base font-medium">
              Document Topic :
            </label>
            <input
              type="text"
              value={topic}
              disabled={disabled}
              className="border-2 h-10 flex-1 px-5 py-2 rounded-lg  disabled:bg-gray-200"
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic for the document"
            />
          </div>
          {error == 1 && (
            <p className="text-red-500 ">
              Please enter a topic for the document.
            </p>
          )}
          {/* Select number of paragraphs */}
          <div className="flex flex-col gap-y-3 md:flex-row md:items-center gap-x-2 my-4">
            <label className="text-lg lg:text-base font-medium">
              Number of Paragraphs :{" "}
            </label>
            <select
              value={paragraphs}
              disabled={disabled}
              className="flex-1 h-10 border-2 rounded-lg p-1 text-center bg-transparent outline-none cursor-pointer"
              onChange={(e) => setParagraphs(Number(e.target.value))}
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
          <div className="flex flex-wrap gap-y-5 justify-center py-5 gap-x-5">
            <CTAButton
              disabled={disabled}
              onClick={handleGenerateDocument}
              text={
                disabled
                  ? "Creating your Document..."
                  : "Generate Word Document"
              }
              color={"bg-[#2463bf] disabled:bg-[#2463bf]/45"}
              className={"text-lg lg:text-base"}
            />
            {documentURL && (
              <CTAButton
                disabled={disabled}
                onClick={download}
                text={"Download your Document!"}
                color={"bg-[#2463bf] disabled:bg-[#2463bf]/45"}
                className={"text-lg lg:text-base"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentGenerator;