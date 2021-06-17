function fillAllowList() {
  chrome.storage.sync.get(['allowList'], function(result) {
    try {
      console.log('Reading [allowList] from config:', result.allowList);
      allowListBox.value = result.allowList
    } catch (error) {
      console.error(error);
    }
  });
}

function watchStorage() {
  chrome.storage.onChanged.addListener((changes, area) => {
    fillAllowList()
  });
}

function closeToast(title, message) {
  toastBox.classList.add('hide');
  toastBox.classList.remove('fase');
  toastBox.classList.remove('show');
}

let closeToastTimer;
function showToast({ title, message, duration = 3000 }) {
  clearTimeout(closeToastTimer)
  toastBox.classList.remove('hide');
  toastBox.classList.add('fase');
  toastBox.classList.add('show');
  toastTitle.innerText = title;
  toastContent.innerText = message;

  closeToastTimer = setTimeout(() => {
    closeToast()
  }, duration)
}

function saveAllowList(event) {
  chrome.storage.sync.set(
    { allowList: event.target.value },
    function() {
      try {
        console.log('Set [allowList] to config succeed.');
        showToast({
          title: 'Saved',
          message: 'Set [allowList] to config succeed.'
        })
      } catch (error) {
        console.error(error);
      }
    }
  );
}

window.onload = function() {
  fillAllowList();
  watchStorage();
  allowListBox.addEventListener('change', saveAllowList, false)
}