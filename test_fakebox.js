/*
This is a script to submit a POST request to fakebox and get a response
*/

window.onload = function () {
  document.getElementById("demo").innerHTML = "something";
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:8080/fakebox/check", true);
  xhttp.setRequestHeader("Accept", "application/json; charset=utf-8")
  xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhttp.send(JSON.stringify({
  	"url": "https://www.nytimes.com/2018/04/16/world/middleeast/syria-douma-chemical-attack.html?rref=collection%2Fsectioncollection%2Fworld&action=click&contentCollection=world&region=rank&module=package&version=highlights&contentPlacement=2&pgtype=sectionfront",
  	"title": "Chemical Weapons Experts Blocked From Site of Syria Attack, Officials Say",
  	"content": 'Senior Russian diplomats said it was the United Nations, not Syria or Russia, that had prevented inspectors from entering Douma. “The problem was the absence of the U.N. Secretariat security department’s approval for O.P.C.W. experts to visit Douma,” Sergei A. Ryabkov, deputy foreign minister of Russia, told reporters, according to the news agency Interfax. A spokesman for the United Nations, Stéphane Dujarric, disputed the Russian explanation. “The U.N. has given them all the necessary clearances,” he said by telephone. “We’re supporting the team as much as we can.” Later at his regular noon briefing, Mr. Dujarric said of the O.P.C.W. experts: “We’ve not denied them any sort of clearance.” Mr. Dujarric declined to say whether Secretary General António Guterres would demand that Russia and Syria provide the experts with access to the Douma site. But the spokesman said Mr. Guterres wanted the investigation to move forward “so we can have a full picture of all the facts.”'
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  console.log(xhttp.responseText);
  console.log("success");
}
