var denisjohnsonimages = ["denisjohnson1.jpg","denisjohnson2.jpg"];
var img = 0;
var imported;

function initMap(){}

$(() => {
  initMap = function() {
    // your code like...
    // and other stuff...
  }
})

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

      var senddata = { Name: name, Post: text, Time: time };

      $.ajax({
         url:"https://docs.google.com/spreadsheets/d/1lFXnDNI31qw8A4GAR7sDnMZZsSuRNUJIkv1b5WXn0WY/edit#gid=0",
         data:senddata,
         type:"POST",
         dataType:"xml"
      });


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

function initPage(){

  document.getElementById("forumheader").innerHTML = "Loading...";

  document.getElementById("denisjohnsonimages").src = "images/" + denisjohnsonimages[1];
  setInterval(function(){ changeimage(); },10000);

  imported = document.createElement('script');
  document.head.appendChild(imported);

  var url = "https://sheetsu.com/apis/v1.0su/757550d6e39d";
  $.ajax({ url: url, success: fillPosts });

  function fillPosts(data){
      //console.log("# Posts: " +data.length);
      //console.log(data[0]['Name']);
      for(c = 0; c < data.length; c+=1){
         var node = document.createElement("div");

         //Create timestamp node
         var datenode = document.createElement("p");
         datenode.innerHTML = data[c]['Time'];
         datenode.style.display = "inline-block";
         datenode.style.float = "right";
         datenode.style.fontSize = "12px";

         //Create namenode
         var namenode = document.createElement("b");
         namenode.innerHTML = data[c]['Name'] + ":"
         namenode.style.display = "inline";
         namenode.style.float = "left";

         //create textnode
         var textnode = document.createElement("a");
         textnode.innerHTML = data[c]["Post"];

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
}
