class Game {
  constructor() {
    this.events = [];
    this.state = "startmenu" //States are startmenu, shopping, trail, and end.
    this.futureFunctions = [];
    this.progressnumber = -1;
this.progression = [()=>{this.dialogue("This is the Road to Mars. It is Based off of the Oregon Trail and was Created By Abhitej Kanuri.");},
()=>{this.dialogue("Earth isn't enough, it is getting too crowded. You need to get to Mars by any means necessary. But the road will be long and full of challenges.");},
()=>{this.dialogue/* TODO: Change Money here*/("You will have 5000 Credits, with which you can hire helpers and purchase equipment. You are going to need to make desisions on what to do with your resources.");},
()=>{this.dialogue("There will be a few shops along the way for you to spend any money you save, and make sure to have gas, spare parts, and defense mechanisms.");},
//TODO:CHange this to be after 3 events()=>{this.dialogueTODO:changeMoneyHere("But you doubt that 5000 credits is enough for you to get to Mars. A space guild member approaches you and asks if you would like to take a loan with a 25 percant interest rate. How much would you like to take?"); this.createChoice([{name:"Do Not Take A Loan",func:""}, {name:"Take a loan of 1000 credits",func:"wagonband.money+=1000;wagonband.debt+=1250;"},{name:"Take a loan of 4000 credits",func:"wagonband.money+=4000; wagonband.debt+=5000;"}])},
()=>{var shopStockArray={};var shopStock1=randomArray(basicItems);var shopStock2;for(shopStock2=randomArray(basicItems);shopStock1==shopStock2;shopStock2=randomArray(basicItems)){};shopStockArray[shopStock1]=0.87; shopStockArray[shopStock2]=0.94;var missingCharacter1=randomArray(basicCharacters);var missingCharacter2; for(missingCharacter2=randomArray(basicCharacters);missingCharacter1==missingCharacter2;missingCharacter2=randomArray(basicCharacters)){}; new Shop(0,0,shopStockArray, [missingCharacter1, missingCharacter2],{},true);},
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
      element.setAttribute("onclick", callbck+'choices.innerHTML="";nextButton.style.display="block";');
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
}
