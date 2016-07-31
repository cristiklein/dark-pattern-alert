function onReceiveAlerts(response) {
  if (response == undefined)
    return;

  if (Object.keys(response).length == 0)
    return;

  alerts = response;
    
  var iframe = document.createElement('iframe');
  iframe.allowtransparency = true;
  document.documentElement.appendChild(iframe);
  iframe.style.position = 'fixed';
  iframe.style.top = 0;
  iframe.style.borderStyle = 'none';
  iframe.style.zIndex = 100000;
  iframe.style.width = '100%';
  iframe.style.height = '100px';

  iframe.src = chrome.runtime.getURL('alert.html');

  iframe.onload = function() {
    iframe.contentWindow.postMessage(alerts, '*');
  };

  function receiveMessage(event) {
    if (event.origin + '/' != chrome.runtime.getURL(""))
      return;

    if (event.data == 'dark-pattern-alert-close-alert') {
      document.documentElement.removeChild(iframe);
    }
  }

  addEventListener("message", receiveMessage, false);
}

chrome.runtime.sendMessage('query-dark-pattern-alerts-for-current-tab',
  onReceiveAlerts);
