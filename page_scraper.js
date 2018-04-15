/* This file contains the script that will get the news text from the DOM of the
webpage and send it to the background for analysis. */

'use strict';

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        sendResponse(document.all[0].outerHTML);
    }
});


chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
