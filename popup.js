// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
// Hide the loader and bias bar
document.getElementById("loader").style.display = "none";
document.getElementById("results").style.display = "none";

let analyzeArticle = document.getElementById('analyzeArticle');

analyzeArticle.onclick = function(element) {
  // Show the loader
  document.getElementById("loader").style.display = "block";
  console.log("clicked");
  let url = "";
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {msg: "Get article"}, function(response) {
      // Print processed html (article to be analyzed) to the console
      console.log(response.response);
      console.log("tab URL: " + tabs[0].url);
      url = tabs[0].url;
      // document.getElementById("demo").innerHTML = "Loading. . .";
      // Send data to Fakebox
      let xhttp = new XMLHttpRequest();
      xhttp.open("POST", "http://localhost:8080/fakebox/check", true);
      // xhttp.responseType = "json";
      xhttp.setRequestHeader("Accept", "application/json; charset=utf-8");
      xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhttp.send(JSON.stringify({
        "url": url,
        "title": "",
        "content": response.response
      }));
      // When Fakebox responds, put Fakebox data in the popup
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Hide the loader again
          document.getElementById("loader").style.display = "none";
          // Show results
          document.getElementById("results").style.display = "block";
          let results = JSON.parse(this.responseText);
          console.log(results);
          document.getElementById("source").innerHTML = "Domain category: " + results.domain.category;
          let bias = results.content.decision;
          let message;
          if (bias == "bias") {
            message = "This article looks biased to us.";
          }
          else if (bias == "unsure") {
            message = "We're not sure if this article is biased or impartial, sorry!";
          }
          else if (bias == "impartial") {
            message = "This article looks impartial to us.";
          }
          document.getElementById("biasText").innerHTML = message;
          let biasScore = results.content.score;
          document.getElementById("bias").style.marginLeft = biasScore * 100 + "%";
          // document.getElementById("demo").innerHTML = this.responseText;
        }
      };
    });
  });
};
