const injectScript = (tabId) => {
    chrome.scripting.executeScript({
        target: { tabId },
        files: ['script.js']
    }).catch(() => {});
    chrome.scripting.insertCSS({
        target: { tabId },
        files: ['script.css']
    }).catch(() => {});
};

const filter = { url: [{ urlContains: '.console.aws.amazon.com/s3/buckets/' }] };

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    injectScript(details.tabId);
}, filter);

chrome.webNavigation.onCompleted.addListener((details) => {
    injectScript(details.tabId);
}, filter);
