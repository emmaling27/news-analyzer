// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let analyzeArticle = document.getElementById('analyzeArticle');

analyzeArticle.onclick = function(element) {
  console.log("clicked");
  let url = "";
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {msg: "Get article"}, function(response) {
      // Print processed html (article to be analyzed) to the console
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
};
