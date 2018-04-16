// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function get_news(DOM_content) {
  console.log('I received the following DOM content:\n' + DOM_content);
}

function got_tab() {
  alert("got tab")
  console.log("got tab")
}

let changeColor = document.getElementById('test_veracity');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  console.log("color changed");
  let color = element.target.value;
    chrome.tabs.executeScript(
        {code: 'document.body.style.backgroundColor = "' + color + '";'});

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
          console.log(response.farewell);
        });
      });
        // chrome.tabs.getCurrent(function(tab) {
        //   tabID = tab.id;
        //   chrome.tabs.sendMessage(tabID, {text: 'report_back'}, get_news);
        // });
        alert("got tab!");
        // ...check the URL of the active tab against our pattern and...
        // if (urlRegex.test(tab.url)) {
            // ...if it matches, send a message specifying a callback too

        // }
  console.log("message sent")
};
