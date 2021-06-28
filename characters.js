class Tinker {
  constructor(id) {
    this.whenToBuildTrack=1/*how much time left to build and how much until it starts building*/;this.isBuilding=false;/*Either building or idle*/this.project=null; this.id=id; this.type="Tinker";
  }
  update() {
    this.whenToBuildTrack--;
    if (this.whenToBuildTrack==0) {
      if (!this.isBuilding) {this.beginBuild();}
      else {
        wagonband.addItem[this.project](); this.whenToBuildTrack=2; game.dialogue("Your Tinker succseffully built a "+this.project); this.isBuilding=false;
      }
    } else {game.progress();}
  }

  beginBuild(){
    game.dialogue("Your Tinker is ready to start a new project to build. What should they work on?")
    var itemsCanBuild=[];//Name of all items
    for(var item in Tinker.itemPriceObject) {
      var itemInfo = Tinker.itemPriceObject[item];
      var canPurchase = true;
      for(var cost in itemInfo) {if(wagonband.supplies[cost]<itemInfo[cost]){canPurchase=false;}}
      if(canPurchase){itemsCanBuild.push(item);}
    }
    if(itemsCanBuild.length>1){itemsCanBuild.splice(randInt(0,itemsCanBuild.length),1);}
    var choicesArray=[];
    itemsCanBuild.forEach((itemCanBuild, index) => {
      var itemName=itemCanBuild+", Requires:";
      var itemInfo = Tinker.itemPriceObject[itemCanBuild]
      for(var cost in itemInfo) {itemName+=(" "+cost+": "+itemInfo[cost]);}
      choicesArray.push({name:itemName, func:"wagonband.characters.forEach((char, index)=>{if(char.id="+this.id+"){char.isBuilding=true; char.whenToBuildTrack="+itemInfo.time+";char.project='"+itemCanBuild+"';}});for(var cost in Tinker.itemPriceObject['"+itemCanBuild+"']){if(cost!='time'){for(i=0;i<Tinker.itemPriceObject['"+itemCanBuild+"'][cost];i++){wagonband.loseItem[cost]();}}}"})
    });
    choicesArray.push({name:"Don't Build Anything", func:""})
    game.createChoice(choicesArray);
    this.whenToBuildTrack=2;
  }
}
Tinker.itemPriceObject = {Radio:{Metal:2, time:3},Engines:{Metal:1, Gas:1, time:2},Lasers:{Metal:2, Gas:2,time:2}}//Add new items Here
class Doctor {
  constructor(id) {this.type="Doctor"; this.id=id;}
  update() {game.progress();}
}
class Engineer {
  constructor(id) {
this.type="Engineer"; this.id=id;
  }
  update() {game.progress();}
}
class Martial {
  constructor(id) {
this.type="Martial"; this.id=id;
  }
  update() {}
}
class Hunter {
  constructor(id) {
this.id=id; this.type="Hunter";this.skill=0.4;
  }
  update() {
    if(Math.random()<this.skill){game.dialogue("Your Hunter found two food");wagonband.addItem.Food();wagonband.addItem.Food();this.skill*=0.48;}
    else {game.dialogue("Your Hunter found no food, but did catch the trail of a food source and somehow found 15 credits."); this.skill*=1.1;var i=0; while(i<15){wagonband.addItem.Credits();i++};}
  }
}
class Stowaway {
  constructor(id) {
    this.id=id; this.type="Stowaway"; this.determineType(); this.timer=randInt(3,7);
  }
  determineType() {
    var type = Math.random();
    if(type<0.6){this.realType="Stowaway";}
    else if (type<0.75) {this.realType="Engineer"}
    else if (type<0.85) {this.realType="Hunter"}
    else if(type<0.9){this.realType="Leader"}
    else{this.realType="Pirate"}
  }
  update(){
    this.timer--;
    if(this.timer==0&&this.realType!="Stowaway"&&this.realType!="Pirate") {
      game.dialogue("WOW! Your Stowaway discovered some hidden talents, turns out they are a "+this.realType);
      for(var i=0;i<wagonband.characters.length;i++){if(wagonband.characters.id==this.id){wagonband.characters.splice(i,1);}}; wagonband.supplies.Stowaway--;
      wagonband.addItem[this.realType]();
    } else if (this.realType=="Pirate"&&this.timer==0) {
      var todialogue="You wake up in the morning to see the stowaway gone, turns out they weren't good news this time. Some of your items are missing too";
      wagonband.loseItem.Stowaway(); let itemsArray=["Metal", "Gas","Food","Medicine","Radio"];let valueObject = {'Metal': 120, "Gas":150, "Food": 70, "Medicine":150, "Radio":300}; for(var value=10; value<450; value*=1.1) {var itemToSteal=randomArray(itemsArray); if(value+valueObject[itemToSteal]<450&&wagonband.supplies[itemToSteal]>0){wagonband.loseItem[itemToSteal]();value+=valueObject[itemToSteal];todialogue+="<br>They Stole a "+itemToSteal+"!";}}
      game.dialogue(todialogue);
    }
    else {
      game.progress();
    }
  }
}
