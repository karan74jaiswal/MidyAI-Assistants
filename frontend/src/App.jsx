import { useState, useEffect } from "react";
import "./App.css";
import AssistantPage from "./AssistantPage";
import Assistants from "./Assistants";
import Navbar from "./Navbar";
import Loader from "./Loader";
import { RotatingLines } from "react-loader-spinner";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeAssistant, setActiveAssistant] = useState(null);
  const [threadId, setThreadId] = useState(null);
  const [activeAssistantChatContent, setActiveAssistantChatContent] = useState([
    {
      content: [
        {
          type: "loading",
          text: { value: <Loader />, annotations: [] },
        },
      ],
      role: "assistant",
    },
  ]);

  const handleClick = function (assistantObj) {
    setActiveAssistant(assistantObj);
  };

  const resetActiveAssistant = function () {
    setActiveAssistant(null);
    setThreadId(null);
    setActiveAssistantChatContent([
      {
        content: [
          { type: "loading", text: { value: <Loader />, annotations: [] } },
        ],
        role: "assistant",
      },
    ]);
  };

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    console.log(darkModeMediaQuery);
    if (darkModeMediaQuery.matches) setIsDarkMode(true);
    else setIsDarkMode(false);
  }, []);
  return (
    <div className={`App ${isDarkMode ? "" : "light-mode"}`}>
      <Navbar
        reset={resetActiveAssistant}
        activeAssistant={activeAssistant}
        isDarkMode={isDarkMode}
      />
      {isLoading && (
        <div className="loader-element">
          <RotatingLines strokeColor={isDarkMode ? "#fff" : "#171717"} />
        </div>
      )}
      {activeAssistant ? (
        <AssistantPage
          assistantData={activeAssistant}
          key={activeAssistant.id}
          threadId={threadId}
          setThreadId={setThreadId}
          activeAssistantChatContent={activeAssistantChatContent}
          setActiveAssistantChatContent={setActiveAssistantChatContent}
          setIsDarkMode={setIsDarkMode}
          isDarkMode={isDarkMode}
        />
      ) : (
        <Assistants handleClick={handleClick} setIsLoading={setIsLoading} />
      )}
    </div>
  );
}

export default App;
