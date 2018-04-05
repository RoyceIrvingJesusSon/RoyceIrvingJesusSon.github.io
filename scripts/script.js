var denisjohnsonimages = ["denisjohnson1.jpg","denisjohnson2.jpg"];
var img = 0;

function submitforumpost()
{
   //Grab info
   var t = new Date();
   var name = document.getElementById('forumname').value;
   var text = document.getElementById('forumresponse').value;
   //were they empty
   if (name === "" || text === ""){
      alert("Please fill out both name and text boxes.");
      return;
   }
   else{
      //make newlines visible
      text = text.replace(/\r?\n/g, '<br />');

      //Clear out 'no posts yet' comment
      document.getElementById('forumheader').innerHTML="";

      //make the div we will add to "post area"
      var node = document.createElement("div");

      //Create the time stamp
      var time = t.getMonth()+1 + "/" + t.getDate() + "/" + t.getFullYear()
         + " - " + t.getHours() + ":";
      if(t.getMinutes() < 10){
         time += "0";
      }
      time+=t.getMinutes();

      //Create timestamp node
      var datenode = document.createElement("p");
      datenode.innerHTML = time;
      datenode.style.display = "inline-block";
      datenode.style.float = "right";
      datenode.style.fontSize = "12px";

      //Create namenode
      var namenode = document.createElement("b");
      namenode.innerHTML = name + ":"
      namenode.style.display = "inline";
      namenode.style.float = "left";

      //create textnode
      var textnode = document.createElement("a");
      textnode.innerHTML = text;

      //append them to node
      node.appendChild(namenode);
      node.appendChild(datenode);
      node.appendChild(document.createElement("br"));
      node.appendChild(textnode);

      //add node to forum area
      document.getElementById("forumpost").appendChild(node);

      //clear out post area
      document.getElementById('forumname').value = "";
      document.getElementById('forumresponse').value = "";

  }
}

function addtolist(id){
  var ranklist = document.getElementById("ranklist");
    for(i = 1; i < ranklist.childNodes.length; i+=1){
    	if(ranklist.childNodes[i].innerHTML === document.getElementById(id).innerHTML){
          document.getElementById("rankresponsesubmit").style.visibility="hidden";
          ranklist.removeChild(ranklist.childNodes[i]);
          return;
       }
   }

  var node = document.createElement("li");
  var val = document.getElementById(id).innerHTML;
  node.innerHTML = val;
  document.getElementById("ranklist").appendChild(node);
  if(ranklist.childNodes.length > 11){
    document.getElementById("rankresponsesubmit").style.visibility="visible";
  }
}

function ranksubmit(){
   var answers= ["Car Crash While Hitchhiking","Two Men","Out on Bail",
      "Dundun","Work","Emergency","Dirty Wedding","The Other Man","Happy Hour",
      "Steady Hands at Seattle General","Beverly Home"];
   var responses = document.getElementById("ranklist").childNodes;
   var score = 0;
   for(c = 0; c < 11; c+=1){
      //console.log( "*" + responses[c+1].innerHTML + "* - " + answers[c+1]);
      if(responses[c+1].innerHTML === answers[c]){
         score+=1;
      }
   }
   document.getElementById("scoreoutput").innerHTML = (score/11).toFixed(2)*100;
   //console.log((score/11).toFixed(2));
}

function tryme(){
  alert("hey");
}

function changeimage(){
  document.getElementById("denisjohnsonimages").src = denisjohnsonimages[img];
  img += 1;
  img = img%2;
}

function initPage(){
  document.getElementById("denisjohnsonimages").src = denisjohnsonimages[1];
  setInterval(function(){ changeimage(); },10000);
  var numposts = document.getElementById("forumpost").childNodes.length;
  //console.log(numposts);
  if(numposts <= 3){
    document.getElementById("forumheader").innerHTML = "No posts yet!";
  }
}
