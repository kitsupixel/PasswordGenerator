
// Clears the last password
chrome.alarms.onAlarm.addListener(() => {
    chrome.storage.sync.remove("lastPassword");
});