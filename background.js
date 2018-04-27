// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
function get_news(DOM_content) {
  console.log('I received the following DOM content:\n' + DOM_content);
}

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log("The color is green.");
//   });
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   // chrome.declarativeContent.onPageChanged.addRules([{
  //   //   conditions: [new chrome.declarativeContent.PageStateMatcher({
  //   //     pageUrl: {hostEquals: 'developer.chrome.com'},
  //   //   })
  //   //   ],
  //   //       actions: [new chrome.declarativeContent.ShowPageAction()]
  //   // }]);
  // });
});

console.log("hi");

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     if (request.greeting == "hello")
//       sendResponse({farewell: "goodbye"});
//   });

// chrome.tabs.sendMessage(tabID, {text: 'report_back'}, get_news);

// chrome.tabs.getCurrent(function(tab) {
//   tabID = tab.id;
//   chrome.tabs.sendMessage(tabID, {text: 'report_back'}, get_news);
//   console.log("I'm here");
// });
