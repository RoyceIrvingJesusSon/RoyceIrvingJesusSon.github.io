function get(){
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1eM1yM7DeikQkyyR02AC9WO0zi_chIa1W6ZNkrOQWMHU/edit#gid=0');
  var index = ss.getRange("A1:A1").getValue();
  var r = "A"+3+":"+"C"+index;
  var stuff = ss.getRange(r).getValues();
  //Logger.log(stuff);
}

function place(name,text,time){
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1eM1yM7DeikQkyyR02AC9WO0zi_chIa1W6ZNkrOQWMHU/edit#gid=0');
  var index = ss.getRange("A1:A1").getValue(); //get next index
  var line = "A"+(index+1)+":"+"C"+(index+1) //what line to place at
  ss.getRange(line).setValues([[name,text,time]]); //place it
  ss.getRange("A1:A1").setValue(index+1); //move down line
}
