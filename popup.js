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
  console.log("color changed");
  // let color = element.target.value;
    // chrome.tabs.executeScript(
        // {code: 'document.body.style.backgroundColor = "' + color + '";'});

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "Get html"}, function(response) {
          console.log(response.response);
        });
        console.log("tab URL: " + tabs[0].url);
      });
      // Put placeholder into the popup html
      document.getElementById("demo").innerHTML = "something";
      // Send data to Fakebox
      let xhttp = new XMLHttpRequest();
      xhttp.open("POST", "http://localhost:8080/fakebox/check", true);
      xhttp.setRequestHeader("Accept", "application/json; charset=utf-8")
      xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhttp.send(JSON.stringify({
        "url": "https://www.nytimes.com/2018/04/16/world/middleeast/syria-douma-chemical-attack.html?rref=collection%2Fsectioncollection%2Fworld&action=click&contentCollection=world&region=rank&module=package&version=highlights&contentPlacement=2&pgtype=sectionfront",
        "title": "Chemical Weapons Experts Blocked From Site of Syria Attack, Officials Say",
        "content": 'Senior Russian diplomats said it was the United Nations, not Syria or Russia, that had prevented inspectors from entering Douma. “The problem was the absence of the U.N. Secretariat security department’s approval for O.P.C.W. experts to visit Douma,” Sergei A. Ryabkov, deputy foreign minister of Russia, told reporters, according to the news agency Interfax. A spokesman for the United Nations, Stéphane Dujarric, disputed the Russian explanation. “The U.N. has given them all the necessary clearances,” he said by telephone. “We’re supporting the team as much as we can.” Later at his regular noon briefing, Mr. Dujarric said of the O.P.C.W. experts: “We’ve not denied them any sort of clearance.” Mr. Dujarric declined to say whether Secretary General António Guterres would demand that Russia and Syria provide the experts with access to the Douma site. But the spokesman said Mr. Guterres wanted the investigation to move forward “so we can have a full picture of all the facts.”'
      }));
      // When Fakebox responds, put Fakebox data in the popup
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("demo").innerHTML = this.responseText;
        }
      };
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
