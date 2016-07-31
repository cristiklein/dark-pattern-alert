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

function receiveMessage(event) {
  if (event.origin + '/' != chrome.runtime.getURL(""))
    return;

  if (event.data == 'dark-pattern-alert-close-alert') {
    document.documentElement.removeChild(iframe);
  }
}

addEventListener("message", receiveMessage, false);
