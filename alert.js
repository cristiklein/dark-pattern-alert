function closeAlert() {
  parent.postMessage('dark-pattern-alert-close-alert', '*');
}

document.getElementById('btn_close').addEventListener('click', function() {
  closeAlert();
});

// TODO: Avoid duplication
function onReceiveAlerts(response) {
  if (response == undefined)
    return;

  if (Object.keys(response).length == 0)
    return;

  alerts = response;

  d = document;
  ul = document.getElementById('alertlist');
  for (var type in alerts) {
    var detail = alerts[type];
    li = d.createElement('li');
    li.appendChild(d.createTextNode(detail));
    ul.appendChild(li);
  }
}

chrome.runtime.sendMessage('query-dark-pattern-alerts-for-current-tab',
  onReceiveAlerts);

