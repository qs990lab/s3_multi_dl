const toggle = document.getElementById('recursiveDownload');

chrome.storage.sync.get({ recursiveDownload: false }, (data) => {
  toggle.checked = data.recursiveDownload;
});

toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ recursiveDownload: toggle.checked });
});
