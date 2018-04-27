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
// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

changeColor.onclick = function(element) {
  console.log("clicked");
  // let color = element.target.value;
    // chrome.tabs.executeScript(
        // {code: 'document.body.style.backgroundColor = "' + color + '";'});
      let url = "";
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "Get article"}, function(response) {
          console.log(response.response);
          console.log("tab URL: " + tabs[0].url);
          url = tabs[0].url;
          document.getElementById("demo").innerHTML = "Loading. . .";
          // Send data to Fakebox
          let xhttp = new XMLHttpRequest();
          xhttp.open("POST", "http://localhost:8080/fakebox/check", true);
          xhttp.setRequestHeader("Accept", "application/json; charset=utf-8")
          xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
          xhttp.send(JSON.stringify({
            "url": url,
            "title": "",
            "content": response.response
          }));
          // When Fakebox responds, put Fakebox data in the popup
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              document.getElementById("demo").innerHTML = this.responseText;
            }
          };
        });
      });
      console.log("URL: " + url);
      // Put placeholder into the popup html

      console.log("success");
        // chrome.tabs.getCurrent(function(tab) {
        //   tabID = tab.id;
        //   chrome.tabs.sendMessage(tabID, {text: 'report_back'}, get_news);
        // });
        // ...check the URL of the active tab against our pattern and...
        // if (urlRegex.test(tab.url)) {
            // ...if it matches, send a message specifying a callback too

        // }
  console.log("message sent")
};
