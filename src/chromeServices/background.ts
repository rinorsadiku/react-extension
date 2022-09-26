import { Colors } from "../types/Color.enum";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: Colors.Green });
  console.log(
    "Default background color set to %cgreen",
    `color: ${Colors.Green}`
  );
});
