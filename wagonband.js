class WagonBand {
  constructor() {
    this.turn=0;
    this.nextCharacterID=1;
    this.crew = [];
    this.money = 5000;// TODO: Change money here
    this.debt = 0;
    this.karma=0;
    // TODO: Injuries
    this.damages={"BrokenHull":false, PuncturedTank:false, SeriousInjury:false},
    this.injure = {Hull:()=>{if(this.damages.BrokenHull){wagonband.loseItem.Engines();}else{this.damages.BrokenHull=true}}, Serious:()=>{if(this.damages.SeriousInjury){game.Over("You took too much damage and your ship exploded")}else{this.damages.SeriousInjury=true;game.nextEvent(game.dialogue("You took eavy damage, it will reduce all your rolls until you fix it.");)}}, FuelTank:()=>{wagonband.damages.PuncturedTank=true;}, Tire:()=>{wagonband.loseItem.Tires(); game.nextEvent(()=>{game.dialogue("A gets destroyed and falls off your ship.");})}},
    this.injuryUpdates={"BrokenHull":()=>{}, PuncturedTank:()=>{wagonband.loseItem.Gas();game.nextEvent(game.dialogue("Your gas tank leaks and you lose some gas");)}, SeriousInjury:()=>{wagonband.karma-=2}}
    this.characters=[],
    this.thingsNeedingUpdate=[],
    this.supplies = {Gas:0,Food:0,Medicine:0,Tires:0,Metal:0,Engines:0,Lasers:0,Radio:0, Doctor:0,Martial:0,Hunter:0,Tinker:0,Engineer:0},//Add new items Here

    this.addItem={Gas:()=>{this.supplies.Gas++;}, Food:()=>{this.supplies.Food++;}, Medicine:()=>{this.supplies.Medicine++;}, Tires:()=>{this.supplies.Tires++}, Metal:()=>{this.supplies.Metal++}, Engines:()=>{this.supplies.Engines++},
    Lasers:()=>{this.supplies.Lasers++}, Radio:()=>{this.supplies.Radio++}, Tinker:()=>{this.supplies.Tinker++; this.characters.push(new Tinker(this.nextCharacterID++));}, Doctor:()=>{this.supplies.Doctor++; this.characters.push(new Doctor(this.nextCharacterID++));},
    Martial: ()=>{this.supplies.Martial++; this.characters.push(new Doctor(this.nextCharacterID++));}, Hunter: ()=>{this.supplies.Hunter++; this.characters.push(new Hunter(this.nextCharacterID++));}, Engineer:()=>{this.supplies.Engineer++;this.characters.push(new Engineer(this.nextCharacterID++));},
    Stowaway:()=>{if(!wagonband.supplies.Stowaway){wagonband.supplies.Stowaway=0;};this.supplies.Stowaway++; this.characters.unshift(new Stowaway(this.nextCharacterID++));}, Leader:()=>{this.supplies.Leader++; this.characters.push(new Leader(this.nextCharacterID++));},
    Credits:()=>{this.money++;}
  },
    this.loseItem = {Gas:()=>{this.supplies.Gas--;},Food:()=>{this.supplies.Food--;},Metal:()=>{this.supplies.Metal--;},Medicine:()=>{this.supplies.Medicine--;},Tires:()=>{this.supplies.Tires--;},Engines:()=>{this.supplies.Engines--; if(wagonband.supplies.Engines==0){game.nextEvent(()=>{game.dialogue("OH NO!, you ran out of engines, as you are floating is space, you realize your sip comes with a small basic engine. It will keep you going, but will need extra gas.")})}; if(wagonband.supplies.Engines<0){game.Over("Your basic Engine died, you float through space, running out of food, and never make it to Andromeda");}},Radio:()=>{this.supplies.Radio--;},Lasers:()=>{this.supplies.Lasers--;},
    Hunter:()=>{this.supplies.Hunter--; for(var i=0;i<this.characters.length;i++){if(this.characters[i].type=="Hunter"){this.characters.splice(i,1);break;}}},Engineer:()=>{this.supplies.Engineer--; for(var i=0;i<this.characters.length;i++){if(this.characters[i].type=="Engineer"){this.characters.splice(i,1);break;}}},Martial:()=>{this.supplies.Martial--; for(var i=0;i<this.characters.length;i++){if(this.characters[i].type=="Martial"){this.characters.splice(i,1);break;}}}, Tinker:()=>{this.supplies.Tinker--; for(var i=0;i<this.characters.length;i++){if(this.characters[i].type=="Tinker"){this.characters.splice(i,1);break;}}},Doctor:()=>{this.supplies.Doctor--; for(var i=0;i<this.characters.length;i++){if(this.characters[i].type=="Doctor"){this.characters.splice(i,1);break;}}},
    Stowaway: ()=>{this.supplies.Stowaway--; for(var i=0;i<this.characters.length;i++){if(this.characters[i].type=="Stowaway"){this.characters.splice(i,1);break;}}}, Leader:()=>{this.supplies.Leader--; for(var i=0;i<this.characters.length;i++){if(this.characters[i].type=="Leader"){this.characters.splice(i,1);break;}}},
    Credits:()=>{this.money--;}
  }

  }
  update() {
    this.turn++;
    game.nextEvent(()=>{
      var todialogue = "You use gas";if(this.turn%2==0){todialogue+=" and food"};game.dialogue(todialogue);

    if(wagonband.supplies.Gas<1){game.Over("You ran out of Gas and Floted through space in a void.");} else{wagonband.loseItem.Gas();}

    if(this.turn%2==0){var starved=[];for(var char=0;char<wagonband.characters.length;char+=2){if(wagonband.supplies.Food<1){starved.push(char);game.nextEvent(()=>{
      var charnum=starved.pop();
      game.dialogue("You ran out of food and your "+this.characters[charnum].type+" starved");
      wagonband.loseItem[wagonband.characters[charnum].type]();
    })} else{wagonband.loseItem.Food();}}}
})
    this.characters.forEach((char, i) => {game.insertEvent(game.progressnumber+1,()=>{char.update();});});
    for(var i in this.damages){if(this.damages[i]){this.injuryUpdates[i]();}}
    game.progress();
  }
}


function makeCharacterFunctions(charName) {
  var st=`${charName}:()=>{this.supplies.${charName}++; this.characters.push(new ${charName}(this.nextCharacterID++));} \n ${charName}:()=>{this.supplies.${charName}--; for(var i=0;i<this.characters.length;i++){if(this.characters[i].type=="${charName}"){this.characters.splice(i,1);break;}}}`
  console.log(st);
  return st;
}
