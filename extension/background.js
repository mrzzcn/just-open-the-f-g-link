
(function(window) {
  "use strict";
  const allowList = []

  function extractUrl() {
    const extractUrlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ig

    console.log('open-link')
    return document.title
  }

  function main() {
    chrome.webNavigation.onCompleted.addListener((details) => {
      const { url, tabId } = details;
      console.log('onCompleted', url)
      if (allowList.some(allowPrefix => url.indexOf(allowPrefix) === 0)) {
        console.log('matched', url)
        chrome.tabs.executeScript(
          tabId,
          {
            file: `open-link.js`
          },
          () => {

          }
        );
      }
    });

    chrome.storage.sync.get(['allowList'], function(result) {
      try {
        const list = (result.allowList || '').split('\n')
        console.log('Reading [allowList] from config:', list);
        allowList.push(...list)
      } catch (error) {
        console.error(error)
      }
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync' && changes.allowList?.newValue) {
        console.log('allowList changed:', changes.allowList?.newValue);
        allowList.push(...list)
      }
    });
  }

  main();
})(window);