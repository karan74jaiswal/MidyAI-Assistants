import { useEffect, useState, Fragment } from "react";
import Assistant from "./Assistant";
export default function Assistants({ handleClick, setIsLoading }) {
  const [assistantsList, setAssistantsList] = useState([]);

  useEffect(() => {
    async function getAssistantsList() {
      const list = await (
        await fetch(`${process.env.REACT_APP_BASE_URL}/api/assistants`)
      ).json();
      setIsLoading(false);
      setAssistantsList(list);
    }
    setIsLoading(true);
    getAssistantsList();
  }, [setIsLoading]);

  return (
    <div className="assistants-list">
      {assistantsList.map((assistant) => (
        <Fragment key={assistant.id}>
          <Assistant assistantObj={assistant} handleClick={handleClick} />
        </Fragment>
      ))}
    </div>
  );
}
