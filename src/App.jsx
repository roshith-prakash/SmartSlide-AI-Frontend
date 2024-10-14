import { useQuery } from "@tanstack/react-query";
import PPTGenerator from "./pages/PPTGenerator";
import { axiosInstance } from "./utils/axios";
import { SyncLoader } from "react-spinners";
import { Typewriter } from "react-simple-typewriter";

function App() {
  // Check if server is active
  const { isLoading, error } = useQuery({
    queryKey: ["check"],
    queryFn: () => {
      return axiosInstance.get("/");
    },
    refetchInterval: 10000,
    retry: 5,
  });

  return (
    <>
      {/* If server isn't ready for use, show a loading indicator */}
      {isLoading && (
        <div className="h-screen w-full flex flex-col gap-y-10 justify-center items-center">
          <img
            src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1728917400/file_oxldxw.png"
            className="w-72 pointer-events-none"
          />
          {/* Three dots loading indicator */}
          <SyncLoader
            color={"#3b82f6"}
            loading={isLoading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {/* Typewriter effect to show 4 different texts. Gradient text */}
          <p className="text-blue-500 text-xl">
            <Typewriter
              words={[
                "Slides made easy—just click, and boom!",
                "Turn ideas into slides, in seconds.",
                "No fuss, just flawless presentations.",
                "From zero to wow, instantly.",
                "Less work, more wow!",
              ]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
        </div>
      )}

      {error && (
        <div className="h-screen w-full flex flex-col gap-y-10 justify-center items-center">
          {/* Error text */}
          <p className="text-red-600 text-2xl">
            Cannot connect to server. Please try later.
          </p>
        </div>
      )}

      {!isLoading && !error && <PPTGenerator />}
    </>
  );
}

export default App;
