var game;
var wagonband;
function beginGame() {
  startmenu.style.display="none";
  game.start();
}

function showItems() {
  itemDisplay.style.display = "block";
  var toAddToItemDisplay = "";
  for (var wagonBandItem in wagonband.supplies) {
    toAddToItemDisplay+=wagonBandItem+": "+wagonband.supplies[wagonBandItem]+"<br>";
  }
  toAddToItemDisplay+="Credits: "+wagonband.money;
  displayNumberInShow.innerHTML = toAddToItemDisplay
}
function showCharacters() {
  itemDisplay.style.display = "block";
}
function closeItemScreen() {
  itemDisplay.style.display = "none";
  displayNumberInShow.innerHTML = "";
}
function randomArray(arr) {
  var rand = Math.floor(Math.random()*arr.length);
  return arr[rand];
}
function randInt(minInclusive, maxExclusive) {
var num = Math.random();
num*=(maxExclusive-minInclusive);
num = Math.floor(num+minInclusive);
return num;
}
function MakeARoll(type/*types are Combat, Diplomacy, Engineering, */) {
  document.getElementById("dice").style.display="block";
  var num = randInt(1,21);
  var todialogue = "";
  document.getElementById("rollResult").innerHTML=num;
  if(type=="Engineering"&&wagonband.supplies.Engineer>0) {var totalIncrease=0;for(var i=0;i<wagonband.supplies.Engineer;i++){totalIncrease+=randInt(2,6);};todialogue+="Your Engineers increased it by: "+totalIncrease+".<br>"+(totalIncrease+num)+" total.";game.dialogue(todialogue);}
  if(type=="Combat"&&wagonband.supplies.Martial>0) {for(var i=0;i<wagonband.supplies.Martial;i++){var newRoll=randInt(1,21);if(newRoll>num){num=newRoll;}}; game.dialogue("Your Martials Made it a "+num);}
  var whenToHide = game.progressnumber+1;
  game.setAFutureFunction(whenToHide, ()=>{document.getElementById("dice").style.display="none";});
  return num;
}
