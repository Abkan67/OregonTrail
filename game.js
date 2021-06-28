class Game {
  constructor() {
    this.events = [];
    this.state = "startmenu" //States are startmenu, shopping, trail, and end.
    this.futureFunctions = [];
    this.progressnumber = -1;
    this.turnumber=0;
this.starterEventsTemplate = [
  ()=>{let hitByAsteroid='game.dialogue("The car gets hit by the asteroid, causing you to spin around and breaking off some of your steel plating."); wagonband.injure.Hull();';
    let tryToDodge='var roll=MakeARoll("Speed"); game.insertEvent(game.progressnumber+1,()=>{if(roll>14){game.dialogue("Your engine starts up and all your wheels go at full speed as you escape the asteroid");}else{'+hitByAsteroid+'}})';
    if(wagonband.supplies.Lasers>0){this.dialogue("As you are driving, you see an asteroid coming towards you. You can either try and shoot it out of the sky or you can try and dodge out of the way");this.createChoice([{name:"Shoot It", func:"if(MakeARoll('Combat')>15){game.nextEvent(()=>{game.dialogue('You shoot the laser out of the space and watch as its exploded peices fly past you far and go far away.')});}else{game.nextEvent(()=>{"+hitByAsteroid+"})}"},{name:"Dodge out of the way", func:tryToDodge}]);}
    else{this.dialogue("An asteroid streaks towards you, you can't shoot it out of the sky so your only chance is to try and dodge it or hope it doesn't do much damage"); this.createChoice([{name:"Try and Dodge It", func:tryToDodge}, {name:"Stay in Place", func:"if(Math.random()<=0.8){"+hitByAsteroid+"} else{game.dialogue('By some divine whim, the asteroid only sligntly scrapes your ship.');}"}])}
game.turnumber++;},
  ()=>{var wagonbandInjury; if(wagonband.supplies.Radio>0){wagonbandInjury="Hull"} else{wagonbandInjury="Serious"}
    var mugChoices=[{name:"Try to Escape", func:'var roll=MakeARoll("Speed");game.nextEvent(()=>{if(roll>16){game.dialogue("Rushing away from the robbers, you manage to escape.");}else{game.dialogue("You try to escape, but the nimble ship is too fast and deals heavy damage to you before you can get out.");wagonband.injure.'+wagonbandInjury+'();}})'}];if(wagonband.money>=500){mugChoices.push({name:"Give Money", func:'game.dialogue("You give them 500 credits");for(var i=0;i<500;i++){wagonband.loseItem.Credits();}'})} else{mugChoices.push({name:"Convince them to leave you.", func:'if(MakeARoll("None")>17){game.nextEvent(()=>{game.dialogue("They start arguing over what to do with you which gives you enough time to fly away.")})}else{game.nextEvent(()=>{game.dialogue("They laugh at you and say that is not enough then they fire at you multiple times and fly away.");wagonband.injure.Serious();wagonband.injure.Serious();})}'})};var mugQuestion="A small ship rockets up to you and aims a laser at you. You hear a voice on your speaker telling you to give them 500 credits or they will fire at you.";if(wagonband.supplies.Radio<1){game.dialogue(mugQuestion);game.createChoice(mugChoices);} else{this.dialogue("You see on your radio a ship approaching you at a high speed. It looks like it may be hostile.");var choices=[{name:"Try to fly away.",func:'game.dialogue("You speed away before the ship can talk to you.");'},{name:"Wait for them and talk",func:'game.dialogue("'+mugQuestion+'");game.createChoice('+JSON.stringify(mugChoices)+');'}];if(wagonband.supplies.Lasers>0){choices.push({name:"Get your Lasers ready to fight them",func:"game.dialogue('A small ship rockets towards you, you hear the words \"Give us your money...\" and immediatly you fire your lasers, giving yourself the element of surprise'); var roll = MakeARoll();if(roll>13){game.nextEvent(()=>{game.dialogue('As the ship tries to rob you, you blast it with a laser and destroy it. Salvinging it, you are able to get a metal.');wagonband.addItem.Metal();})}else{game.nextEvent(()=>{wagonband.injure.Serious();game.dialogue('Your lasers come out and fire, but the ship is too fast and shoots at you. Your ship is able to get away but not without serious damage.')})}"})}; this.createChoice(choices);}
game.turnumber++;},
  ()=>{game.dialogue("As you are driving, you hear a cough coming from a cupboard. Catiouslly, you open it up, and you see a man inside, a stowaway.<br>You can either take him in or you can throw him out of the ship."); game.createChoice([{name:"Throw him out.", func:'game.dialogue("You don\'t have enough food for people who may not even be useful to you, so you throw the man outside the ship and don\'t look back.");'},{name:"Allow them to Stay",func:"game.dialogue('He looks at at you and thanks you profusely for allowing him to stay');wagonband.addItem.Stowaway();"}]);
game.turnumber++;},
]
this.starterEvents=[...this.starterEventsTemplate];
this.progression = [()=>{this.dialogue("This is the Road to Andromeda. It is Based off of the Oregon Trail and was Created By Abhi K.");},
()=>{this.dialogue("The milky was is getting too crowded for you and you are not ab le to live well here. You need to travel the dangerous and lawless Andromeda path by any means necessary and begin a settlement there..");},
()=>{this.dialogue/* TODO: Change Money here*/("You will have 5000 Credits, with which you can hire helpers and purchase equipment. You are going to need to make desisions on what to do with your resources.");},
()=>{this.dialogue("There will be a few shops along the way for you to spend any money you save, and make sure to have gas, spare parts, and defense mechanisms.");},
()=>{var shopStockArray={};var shopStock1=randomArray(basicItems);var shopStock2;for(shopStock2=randomArray(basicItems);shopStock1==shopStock2;shopStock2=randomArray(basicItems)){};shopStockArray[shopStock1]=0.87; shopStockArray[shopStock2]=0.94;var missingCharacter1=randomArray(basicCharacters);var missingCharacter2; for(missingCharacter2=randomArray(basicCharacters);missingCharacter1==missingCharacter2;missingCharacter2=randomArray(basicCharacters)){}; new Shop(0,0,shopStockArray, [missingCharacter1, missingCharacter2],{},true);},
()=>{this.dialogue("Stocked with items for your journey, you take off to a new galaxy."); fireJetImg.style.visibility="visible";},
()=>{var lngth=this.starterEvents.length;for(var i=0; i<lngth;i++){this.addUpdateFunction();var event=this.starterEvents.splice(randInt(0,this.starterEvents.length), 1)[0];this.insertEvent(this.progressnumber+1, event);};this.progress();},
()=>{this.dialogue/*TODO:changeMoneyHere*/("You begin to get doubt, 5000 credits may have been to little for you to be able to make it to Andromeda, as you are thinking that, you see a space oundation ship, they ask you if you would like to borrow some credits with a 25% intrest rate. How much money would you like to take?"); this.createChoice([{name:"Do Not Take A Loan",func:""}, {name:"Take a loan of 1000 credits",func:"wagonband.money+=1000;wagonband.debt+=1250;"},{name:"Take a loan of 4000 credits",func:"wagonband.money+=4000; wagonband.debt+=5000;"}])},
()=>{game.dialogue("More content possible coming soon. For now, see how long you can last!");for(var i1=0;i1<20;i1++){var lngth=this.starterEvents.length;for(var i=0; i<lngth;i++){this.addUpdateFunction();var event=this.starterEvents.splice(randInt(0,this.starterEvents.length), 1)[0];this.insertEvent(this.progressnumber+1, event);};}},
]
  }

  start() {
this.progress();
wagonband = new WagonBand();
  }

  dialogue(text) {
    textdisplay.innerHTML = text;
  }

  createChoice(buttonsarray) {
    for (let index=0; index < buttonsarray.length; index++) {
      const button = buttonsarray[index];
      const name = button.name;
      const callbck = button.func;
      const element = document.createElement("button");
      element.setAttribute("class", "choicebutton");
      element.setAttribute("onclick", "choices.innerHTML='';nextButton.style.display='block';"+callbck);
      const text = document.createTextNode(name);
      element.appendChild(text);
      choicedisplay.appendChild(element);
      nextButton.style.display = "none";
    }}

  progress() {
  this.progressnumber++;
  this.progression[this.progressnumber]();
    for(var futureFunction in this.futureFunctions) {
      var theFutureFunction = this.futureFunctions[futureFunction];
      if (theFutureFunction.time==this.progressnumber) {
        theFutureFunction.func();
      }
    }
  }

  setAFutureFunction(timeToRun, callbck) {
    this.futureFunctions.push({time:timeToRun, func:callbck});
  }

  insertEvent(position, func) {
    this.progression.splice(position, 0,func);
    this.futureFunctions.forEach((item, index) => {item.time++;});
  }

  addUpdateFunction() {
    this.insertEvent(this.progressnumber+1, ()=>{wagonband.update();})
  }
  nextEvent(callbck){
    this.insertEvent(this.progressnumber+1, callbck);
  }
  Over(reason) {
    console.log(reason);
    startmenu.style.display="block";
    document.getElementById("gameTitle").innerHTML=reason+"<br>You survived for "+game.turnumber+" turns";
  }
}
// TODO: Each event has a number of times and whenever it is landed on that number is reduced by one and if it is 0 another one is chosen.
