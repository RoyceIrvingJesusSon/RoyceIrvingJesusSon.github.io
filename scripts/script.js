var denisjohnsonimages = ["denisjohnson1.jpg","denisjohnson2.jpg"];
var img = 0;
var imported;


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

      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("POST","https://sheets.googleapis.com/v4/spreadsheets/1lFXnDNI31qw8A4GAR7sDnMZZsSuRNUJIkv1b5WXn0WY/values/A1:append?includeValuesInResponse=false&insertDataOption=INSERT_ROWS&responseDateTimeRenderOption=FORMATTED_STRING&responseValueRenderOption=FORMATTED_VALUE&valueInputOption=USER_ENTERED&key=AIzaSyCTJUdajGttZC9lALSEt4Vja4Z_Qm4ds0A",true);
      xmlHttp.send(null);

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

function changeimage(){
  document.getElementById("denisjohnsonimages").src = "images/" + denisjohnsonimages[img];
  img += 1;
  img = img%2;
}

function fillPosts(){

   var xmlHttp = new XMLHttpRequest();
   xmlHttp.open("GET","https://sheets.googleapis.com/v4/spreadsheets/1lFXnDNI31qw8A4GAR7sDnMZZsSuRNUJIkv1b5WXn0WY/values/A1%3AC?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&key=AIzaSyCTJUdajGttZC9lALSEt4Vja4Z_Qm4ds0A",false);
   xmlHttp.send(null);
   var data = xmlHttp.responseText;
   var response = JSON.parse(data);
   var postarray = response["values"];
   //console.log(response["values"].length);

   for(c = 1; c < postarray.length; c+=1){
      var node = document.createElement("div");

      //Create timestamp node
      var datenode = document.createElement("p");
      datenode.innerHTML = postarray[c][0];
      datenode.style.display = "inline-block";
      datenode.style.float = "right";
      datenode.style.fontSize = "12px";

      //Create namenode
      var namenode = document.createElement("b");
      namenode.innerHTML = postarray[c][1] + ":"
      namenode.style.display = "inline";
      namenode.style.float = "left";

      //create textnode
      var textnode = document.createElement("a");
      textnode.innerHTML = postarray[c][2];

      //append them to node
      node.appendChild(namenode);
      node.appendChild(datenode);
      node.appendChild(document.createElement("br"));
      node.appendChild(textnode);

      //add node to forum area
      document.getElementById("forumpost").appendChild(node);
   }

   var numposts = document.getElementById("forumpost").childNodes.length;

   //console.log(numposts);
   if(numposts <= 3){
     document.getElementById("forumheader").innerHTML = "No posts yet!";
   }
   else{
      document.getElementById("forumheader").innerHTML = "";
   }

}

function initPage(){



  document.getElementById("forumheader").innerHTML = "Loading...";

  fillPosts();

  document.getElementById("denisjohnsonimages").src = "images/" + denisjohnsonimages[1];
  setInterval(function(){ changeimage(); },100);

  imported = document.createElement('script');
  document.head.appendChild(imported);





}
