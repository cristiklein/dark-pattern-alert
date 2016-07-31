function closeAlert() {
  parent.postMessage('dark-pattern-alert-close-alert', '*');
}

document.getElementById('btn_close').addEventListener('click', function() {
  closeAlert();
});
