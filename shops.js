const basicItems = ["Gas", "Food", "Metal", "Medicine", "Tires", "Engines", "Radio", "Lasers"]//Add new baisc Items Here
const basicCharacters = ["Hunter", "Engineer", "Martial", "Tinker", "Doctor",]
const allItems = {
  Food: {image:"food.jpg", price: 85, description:"You need food to feed yourself and any characters you hire every few turn.", onlyOne:false},
  Gas:{image:"gas.jpg", price: 40, description:"You need Gas to go forward. If you run out of gas you lose.", onlyOne:false},
  Metal: {image:"Metal.jpg", price: 120, description:"Metal is important for repairing your ship if it takes certain damages. It can also be melded into other weapons.", onlyOne:false},
  Medicine: {image:"Medicine.jpg", price:210, description: "You will need medicine to cure different space diseases to save your people. They can also be very valuable to someone who needs them.", onlyOne:false},
  Tires:{image:"tire.png", price: 365, description: "Not sure why a flying space car needs tires, but you're going to want at least four running well.", onlyOne:false},
  Engines: {image:"Engine.jpg", price: 450, description:"You need an engine to keep the car running, it can also be used to speed past some encounters.", onlyOne:false},
  Lasers: {image:"laser.jpg", price: 650, description:"Nothing persuades people more than a giant death cannon. Use them is self defense or for more nefarious means.", onlyOne:false},
  Radio: {image:"Radio.jpg", price: 520, description:"Might be useful while floating through then endless void that is space. Not garuenteed anyone will come to your aid though. Your car only has the slot for one.", onlyOne:true},

  Engineer: {image:"person.jpg", price:490, description:"Will help you repair your ship better.", onlyOne:false},
  Tinker: {image:"person.jpg", price: 560, description: "Can meld metal into other items at certain areas.", onlyOne:true},
  Martial: {image:"person.jpg", price:500, description: "Helps you in fights.", onlyOne:false},
  Doctor: {image:"person.jpg", price:600,description:"You don't need to expend medicine to cure most diseases", onlyOne:true},
  Hunter: {image:"person.jpg", price:440, description:"Gives you food at planets or places where you can hunt.", onlyOne:false},
}//Add new items here
const rareItems = {
  level1:{},
  level2:{},
  level3:{}
}
class Shop {

  constructor(/*level 0 is basic items*/level,rarityChance,scarcity,unavailablearray,maximumForItems,hasPeople) {
this.items = [];
this.allItemPricesInShop = {};
this.checkout = {}; this.allPrice=0;
this.itemContainers = []; this.totalPrice; this.display(); this.createExitButton();
this.determineItems(scarcity, unavailablearray, level, rarityChance, hasPeople, maximumForItems);
  }

  createExitButton() {
    const element = document.createElement("button");
    const text = document.createTextNode("Purchase and Leave");
    this.totalPrice = document.createElement("span");
    this.totalPrice.style.cssText = "font-weight:bold;";
    element.style.cssText = "background-color:white;position:absolute;bottom:20px;right:10px;height:40px;";
    element.appendChild(text);
    element.appendChild(this.totalPrice);
    element.addEventListener("click",()=>{this.purchase();});
    document.getElementById("leavestore").appendChild(element);}

  changeTotalPrice() {
    var allPrice = 0;
    for(var itemInCheckout in this.checkout) {
      var amount = this.checkout[itemInCheckout];
      var price = this.allItemPricesInShop[itemInCheckout];
      allPrice+= (amount*price);
    }
    this.allPrice = allPrice;
    this.totalPrice.innerHTML = "<br>Price: "+allPrice;
  }

  display() {store.style.display = "block"; nextButton.style.display="none";}

  determineItems(scarcity, unavailablearray, rarity,rarityChance, hasPeople,maximumForItemsObject) {

var items = [];
basicItems.forEach((basicItem, index) => {if (!unavailablearray.includes(basicItem)) {items.push(basicItem);}});
if(hasPeople){basicCharacters.forEach((char, index) => {if (!unavailablearray.includes(char)) {items.push(char);}})}
var rareitemsPossibilities = [];
for(var rareitem in rareItems["level"+rarity]) {if (!unavailablearray.includes(rareitem)) {for(var i=0;i<rareItems["level"+rarity][rareitem];i++){rareitemsPossibilities.push(rareitem);}}}
var chosenRareItem;
if (rarity!=0) {items.push(randomArray(rareitemsPossibilities));}

items.forEach((itemToPass, index) => {
  let itemPassingPrice = allItems[itemToPass].price
  if(scarcity.hasOwnProperty(itemToPass)) {itemPassingPrice=Math.ceil(itemPassingPrice*scarcity[itemToPass]);}
this.allItemPricesInShop[itemToPass]=itemPassingPrice;
this.displayAnItem(itemToPass);
});


}
  displayAnItem(itemToDisplay) {
    this.checkout[itemToDisplay] = 0;
    this.itemContainers.push(new ItemContainer(this, itemToDisplay));

  }
  purchase() {
    if(wagonband.money>=this.allPrice) {
      for (var itemType in this.checkout) {wagonband.supplies[itemType]+=this.checkout[itemType];}
      wagonband.money-=this.allPrice;
      this.unDisplay();
  } else {alert("Not Enough Credits, you only have "+wagonband.money);}
  }

  unDisplay() {
    nextButton.style.display="block";
    store.style.display = "none";
    document.getElementById("leavestore").innerHTML="";
    storeSelection.innerHTML="";
    game.progress();
  }



}

class ItemContainer {
  constructor(parentshop, itemType) {
    this.parentshop = parentshop;
    this.parentshope="1";
    this.itemType = itemType;
    this.amountPurchased = 0;
    this.itemContainer = document.createElement("div");
    this.itemContainer.setAttribute("class", "itemHolder");
    var itemContainerStyleText = "left:"+(parentshop.itemContainers.length%10)*100+"px; border: 3px solid black; top:"
    var itemContainerTopValue = Math.floor(parentshop.itemContainers.length/10)*150+50
    this.itemContainer.style.cssText = itemContainerStyleText+itemContainerTopValue+"px;";
    storeSelection.appendChild(this.itemContainer);
    this.itemContainer.addEventListener("mouseover", ()=>{game.dialogue(allItems[this.itemType].description);})

    this.itemName = document.createElement("div");
    this.itemName.setAttribute("class", "shopItemName");
    this.itemContainer.appendChild(this.itemName);
    this.itemNameText = document.createTextNode(itemType);
    this.itemName.appendChild(this.itemNameText);

    this.itemPriceDiv = document.createElement("div");
    this.itemPriceText = document.createTextNode(parentshop.allItemPricesInShop[itemType]);
    this.itemPriceDiv.setAttribute("class", "itemPriceNumber");
    this.itemContainer.appendChild(this.itemPriceDiv);
    this.itemPriceDiv.appendChild(this.itemPriceText);

    this.itemImage = document.createElement("img");
    this.itemImage.setAttribute("src", allItems[itemType].image);
    this.itemImage.setAttribute("class", "itemImage");
    this.itemContainer.appendChild(this.itemImage);

    this.plusArrow = document.createElement("button");
    this.minusArrow = document.createElement("button");
    this.plusArrow.setAttribute("class", "plusArrow");
    this.minusArrow.setAttribute("class", "minusArrow");
    this.itemContainer.appendChild(this.plusArrow);
    this.itemContainer.appendChild(this.minusArrow);
    this.plusArrow.addEventListener("click", ()=>{this.increaseCheckout();});
    this.minusArrow.addEventListener("click", ()=>{this.decreaseCheckout();});

    this.numberPurchased = document.createElement("div");
    this.itemContainer.appendChild(this.numberPurchased);

  }

  increaseCheckout() {
if (!allItems[this.itemType].onlyOne||(this.parentshop.checkout[this.itemType]<1&&wagonband.supplies[this.itemType]<1)){this.parentshop.checkout[this.itemType]++; this.amountPurchased++;} else {alert("You already have the maximum allowed.");}
this.update();
  }
  decreaseCheckout() {
    if (this.amountPurchased>0) {this.parentshop.checkout[this.itemType]--; this.amountPurchased--; this.update();}
  }
  update() {
 this.parentshop.changeTotalPrice(); this.numberPurchased.innerHTML=this.amountPurchased;
  }
}
