(function(window) {
  'use strict';
  const extractUrlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ig

  const urls = document.body.innerText.match(extractUrlRegex)
  if (!urls || !urls.length) return
  if (urls.length === 1) {
    console.log('openning:', urls[0])
    window.location.replace(urls[0])
  } else {
    // TODO: chosen link index
    console.log('chosen link index')
  }
})(window);