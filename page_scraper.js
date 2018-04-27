/* This file contains the script that will get the news text from the DOM of the
webpage and send it to the background for analysis. */

'use strict';

// // Listen for messages
// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//     // If the received message has the expected format...
//     if (msg.text === 'report_back') {
//         // Call the specified callback, passing
//         // the web-page's DOM content as argument
        // sendResponse(document.all[0].outerHTML);
//     }
// });

// Remove HTML elements from the text, keeping text that is linked
function processHTML(html) {
  // Initialize all variables, booleans to false
  let i = 0;
  let txt = "";
  let insideElt = false;
  let isLink = false;
  let eltEncountered = false;
  let isComment = false;
  let isEndTag = false;
  // Iterate through the HTML, adding non-html elements unless they are links
  for (; i < html.length; i++) {
    if (html[i] == "<") {
      if (eltEncountered) {
        insideElt = false;
      } else {
        eltEncountered = true;
      }
    }
    if ((!eltEncountered && !isEndTag) || (isLink && insideElt)) {
      txt += html[i];
    }
    if (html[i] == ">") {
      if (isComment) {
        isComment = false;
        eltEncountered = false;
      }
      else if (eltEncountered) {
        insideElt = true;
      }
      if (isEndTag) {
        isEndTag = false;
      }
    }
    else if (i > 0) {
      if (html[i-1] == "<") {
        if (html[i] == "!") {
          isComment = true;
        }
        else if (html[i] == "a") {
          isLink = true;
        }
        else if (html[i] == "/") {
          eltEncountered = false;
          isEndTag = true;
        }
      }
      if (i > 1) {
        if (html[i-1] == "/" && html[i-2] == "<" && html[i] == "a") {
          isLink = false;
        }
      }
    }

  }
  return txt;
}


// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//   console.log(response.farewell);
// });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("adding event listener")
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.msg == "Get html") {
      // sendResponse({farewell: "goodbye"});
      sendResponse({response: document.all[0].outerHTML});
    } else if (request.msg == "Get article") {
      let paragraphs = document.getElementsByTagName("p");
      let i = 0;
      let text = "";
      for (; i < paragraphs.length; i++) {
        text += paragraphs[i].innerHTML;
      }
      sendResponse({response: processHTML(text)});
    }
    return true;
  });
