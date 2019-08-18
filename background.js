(function() {
  const networkFilters = {
    urls: [
      "https://signin.aws.amazon.com/saml"
    ]
  };

  function copyTextToClipboard(text) {
    var copyFrom = document.createElement("textarea");
    copyFrom.textContent = text;
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    document.body.removeChild(copyFrom);
    console.log("Copied to clipboard");
  };

  function iconClicked() {
    chrome.storage.sync.get('capture', function(data) {
      var current = data.capture;
      if (current == 0) {
        chrome.browserAction.setTitle({title: "AWS SAML Capture - Enabled"});
        chrome.browserAction.setIcon({path: "icon-enabled.png"});

        chrome.storage.sync.set({capture: 1}, function() {
          chrome.webRequest.onBeforeRequest.addListener(captureFunc, networkFilters, ["requestBody"]);
          console.log("enabled capture");
        });
      } else if (current == 1) {
        chrome.browserAction.setTitle({title: "AWS SAML Capture - Disabled"});
        chrome.browserAction.setIcon({path: "icon-disabled.png"});

        chrome.storage.sync.set({capture: 0}, function() {
          chrome.webRequest.onBeforeRequest.removeListener(captureFunc);
          console.log("disabled capture");

        });
      }
    });
  };

  chrome.browserAction.onClicked.addListener(iconClicked);

  chrome.runtime.onInstalled.addListener(function() {
    console.log("Installed AWS SAML Capture");
    chrome.storage.sync.set({capture: 0}, function() {
      console.log("disabled capture");
    });
  });


  function captureFunc(details) {
    if (details.method == "POST") {
      let formData = details.requestBody.formData;

      if (formData) {
        Object.keys(formData).forEach(key => {
          if (key == "SAMLResponse") {
            if (formData[key].length == 1) {
              copyTextToClipboard(formData[key][0]);
              console.log("successfully captured SAMLResponse and copied to clipboard");
              alert("SAML Response copied to clipboard");
            }
          }
        });
      }
    }
  };

}());
