let colour = "#3AA757";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ colour });
  console.log("Default colour set");
});
