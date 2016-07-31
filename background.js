function reloadDarkPatterns() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      darkPatterns = JSON.parse(xhr.responseText);
      chrome.storage.local.set({ darkPatterns: darkPatterns });
      chrome.storage.local.get('darkPatterns', function (result) {
        console.log('Loaded ' + result.darkPatterns.length +
          ' dark pattern(s).')
      });
    }
  };

  xhr.open("GET", chrome.extension.getURL('darkpatterns.json'), true);
  xhr.send(); 
}

/**
 * Returns a list of dark patterns for a given URL or null, if the URL is clean.
 * @param url The URL to check for dark patterns
 * @param callback a callback of the form 'function(patterns)' called with
 * a dictionary of the form "{ 'dark_pattern_name': 'dark_pattern_details' }".
 */
function getAlertsForURL(url, callback) {
  chrome.storage.local.get('darkPatterns', function (result) {
    dps = result.darkPatterns;
  
    console.log('Matching ' + url + ' against ' + dps.length + ' dark patterns');
    alerts = {};
    // TODO: Currently O(n). Make it faster!
    for (var i in dps) {
      // TODO: pre-compile regexps
      if (url.match(dps[i].url_match)) {
        Object.assign(alerts, dps[i].alerts);
      }
    }
    callback(alerts);
  });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (sender.id != chrome.runtime.id)
    return;

  if (message == 'query-dark-pattern-alerts-for-current-tab') {
    url = sender.tab.url;
    getAlertsForURL(url, function(alerts) {
      sendResponse(alerts);
    });
  }

  return true; // reply asynchronously
});

chrome.runtime.onInstalled.addListener(function() {
  reloadDarkPatterns();
});
