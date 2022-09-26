import React, { useCallback, useEffect, useRef } from "react";

function App() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function setBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }

  const onClick = useCallback(async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id as number },
        func: setBackgroundColor,
      });
    }
  }, []);

  useEffect(() => {
    chrome.storage.sync.get("color", ({ color }) => {
      if (buttonRef.current)
        buttonRef.current.setAttribute("style", `background-color: ${color}`);
    });
  }, []);

  return (
    <div>
      <button onClick={onClick} ref={buttonRef} id="customButton" />
    </div>
  );
}

export default App;
