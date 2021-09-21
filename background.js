// Initialize storage with default values
chrome.runtime.onInstalled.addListener(() => {
    setUpDefaultValues();
});


// Clears the last password
chrome.alarms.onAlarm.addListener(() => {
    chrome.storage.sync.remove("lastPassword");
});

const setUpDefaultValues = () => {
    chrome.storage.sync.set({ "incAlphaLower": true });
    chrome.storage.sync.set({ "incAlphaUpper": true });
    chrome.storage.sync.set({ "incNumbers": true });
    chrome.storage.sync.set({ "incSymbols": true });
    chrome.storage.sync.set({ "passwordLength": 16 });
}

