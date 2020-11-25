// // // VARIABLES 
import {allMenuItems} from "../menu-items.js"
import {allPrompts} from "../questions-answers.js"

const startBtn = document.getElementById("start")
const welcomeScreen = document.getElementById("welcomeScreen")
const playScreen = document.getElementById("playScreen") 
const menuTable = document.getElementById("fullMenuTable")
const playerChoices = document.getElementById("playerChoicesTable")
const question = document.getElementById("question")
const submitBtn = document.getElementById("submit")
const responseDiv = document.getElementById("response")
const response = document.getElementById("responseText")
const newPromptBtn = document.getElementById("newPrompt")
let htmlAllMenuItems = allMenuItems
let selectedItems = [] // gets filled in with prompt below
let selectedPrompt // gets filled in with a random prompt with printPrompt function


// ********************************************************************************
// // // FUNCTIONS

//For initializing the game 
function initWelcomeScreen() {welcomeScreen.style.display = "flex"}
function initPlayScreen() {
    playScreen.style.display = "none"
}

//For moving on to play the game 
function hideWelcomeScreen() {welcomeScreen.style.display = "none"}
function showPlayScreen() {
    playScreen.style.display = "grid"
}
function getRandomInteger(number) {
  return Math.floor(Math.random() * Math.floor(number));
}
function printPrompt(array) {
    let index = getRandomInteger(array.length)
    selectedPrompt = array[index]
    question.textContent = selectedPrompt.question
}
function loadMenuItems(array) {
    array.forEach((element) => {
// CAN I CREATE A CLASS METHOD FOR THE LINES BELOW?
    let newItem = document.createElement('tr');
    newItem.classList.add("menuItem");

    let name = document.createElement('td');
    name.textContent = element.name;
    newItem.appendChild(name);

    let type = document.createElement('td');
    type.textContent = element.category;
    newItem.appendChild(type);

    let price = document.createElement('td')
    price.textContent = element.price;
    newItem.appendChild(price);

    menuTable.appendChild(newItem);
    });
};
function hideResponseSection() {
    responseDiv.style.backgroundColor = "transparent"
}

function showResponseSection() {
    responseDiv.style.backgroundColor = "var(--header-footer-color)"

}

// for the player to select items 
function selectItem(target) {
    if (target.classList.contains("selected")) {
        target.style.backgroundColor = "#F6F1D1"
        target.style.fontWeight = "bold"
    } else {
        target.style.backgroundColor = "white"
        target.style.fontWeight = "normal"
    }
}
function saveResponses() {
    let selection = [... document.querySelectorAll(".selected")]
    selectedItems = [];
    for (let i=0; i<selection.length; i++) {
        htmlAllMenuItems.forEach(item => {
            if (item.name === selection[i].firstChild.textContent){
                selectedItems.push(item)
            }
        })
    }
    console.log(selectedItems)
    return selectedItems
}

// for evaluating the player's choices and generating a response
function isVegetarian() {
    let isVegetarian = []
    selectedItems.forEach(item =>  isVegetarian.push(item.vegetarian) )
    let isTrue = isVegetarian.every((el) => el === true)
    console.log(`all selected items are vegetarian: ${isTrue}`)
    return isTrue
}
function containsNoFish() {
    let noFish = []
    selectedItems.forEach(item =>  noFish.push(item.noFish) )
    let isTrue = noFish.every((el) => el === true)
    console.log(`all selected items are fish-free: ${isTrue}`)
    return isTrue
}
function containsNoShrimp() {
    let noShrimp = []
    selectedItems.forEach(item =>  noShrimp.push(item.noShrimp) )
    let isTrue = noShrimp.every((el) => el === true)
    console.log(`all selected items are shrimp-free: ${isTrue}`)
    return isTrue
}
function containsNoCheese() {
    let noCheese = []
    selectedItems.forEach(item =>  noCheese.push(item.noCheese) )
    let isTrue = noCheese.every((el) => el === true)
    console.log(`all selected items are cheese-free: ${isTrue}`)
    return isTrue
}
function containsNoLactose() {
    let noLactose = []
    selectedItems.forEach(item =>  noLactose.push(item.noMilk) )
    let isTrue = noLactose.every((el) => el === true)
    console.log(`all selected items are lactose-free: ${isTrue}`)
    return isTrue
}
function isHalal() {
    let isHalal = []
    selectedItems.forEach(item =>  isHalal.push(item.halal) )
    let isTrue = isHalal.every((el) => el === true)
    console.log(`all selected items are halal: ${isTrue}`)
    return isTrue
}
function isKosher() {
    let isKosher = []
    selectedItems.forEach(item =>  isKosher.push(item.kosher) )
    let isTrue = isKosher.every((el) => el === true)
    console.log(`all selected items are kosher: ${isTrue}`)
    return isTrue
}
function isGlutenFree() {
    let isGlutenFree = []
    selectedItems.forEach(item =>  isGlutenFree.push(item.glutenFree) )
    let isTrue = isGlutenFree.every((el) => el === true)
    console.log(`all selected items are GF: ${isTrue}`)
    return isTrue
}
function isLighter() {
    let isLighter = []
    selectedItems.forEach(item =>  isLighter.push(item.richness) )
    let averageRichness = isLighter.reduce((acc,num) => acc + num) / isLighter.length
    let isTrue
    if (averageRichness <= 3) {isTrue = true} else {isTrue = false}
    console.log(`average of selected items is light: ${isTrue}`)
    return isTrue
}
function containsNoAlcohol() {
    let noAlcohol = []
    selectedItems.forEach(item =>  noAlcohol.push(item.noBooze) )
    let isTrue = noAlcohol.every((el) => el === true)
    console.log(`all selected items are alcohol-free: ${isTrue}`)
    return isTrue
}
function containsNoRaw() {
    let noRaw = []
    selectedItems.forEach(item =>  noRaw.push(item.noRaw) )
    let isTrue = noRaw.every((el) => el === true)
    console.log(`all selected items are cooked: ${isTrue}`)
    return isTrue
}
function okForPregnancy() {
    let noAlcohol = containsNoAlcohol()
    let noRaw = containsNoRaw()
    const isTrue = noAlcohol && noRaw
    console.log(`all selected items are pregnancy-friendly: ${isTrue}`)
    return isTrue
}

function isCriteriaFulfilled(object) {
    const prompt = object.uniqID;
    let trueOrFalse
    switch (prompt) {
        case "vegetarian" : trueOrFalse = isVegetarian();
        break;
        case "noFish" : trueOrFalse = containsNoFish();
        break;
        case "noShrimp" : trueOrFalse = containsNoShrimp();
        break;
        case "noCheese" : trueOrFalse = containsNoCheese();
        break;
        case "noLactose" : trueOrFalse = containsNoLactose();
        break;
        case "halal" : trueOrFalse = isHalal();
        break;
        case "kosher" : trueOrFalse = isKosher();
        break;
        case "glutenFree" : trueOrFalse = isGlutenFree();
        break;
        case "lighter" : trueOrFalse = isLighter();
        break;
        case "noAlcohol" : trueOrFalse = containsNoAlcohol();
        break;
        case "pregnant" : trueOrFalse = okForPregnancy();
        break;
    }
    return trueOrFalse
}

function printResult(boolean) {
    response.textContent = selectedPrompt.response(boolean)
}



// for selecting a new prompt
function clearSelection() {
    let selected = [... document.querySelectorAll(".selected")]
    selected.forEach(element => {
        element.classList.remove("selected")
        selectItem(element)
    })
}
function clearResponse() {response.textContent = ""}

// shuffle menu items? 
// filter menu items 
// sort menu items 

// ********************************************************************************
// // // FLOW LOGIC

loadMenuItems(htmlAllMenuItems);

// INITIALIZE WELCOME SCREEN
window.onload = () => {
    initWelcomeScreen();
    initPlayScreen;
}

// MOVE TO PLAY SCREEN
startBtn.onclick = () => {
    hideWelcomeScreen();
    showPlayScreen();
    printPrompt(allPrompts); 
    hideResponseSection()   
    // shuffle the menu items ?
    // recomend now button should be gray with grey text and not clickable
}

// PLAYER MAKES 3 MENU CHOICES 
const menuItemRow = [... document.querySelectorAll(".menuItem")]
menuItemRow.forEach(row => row.onclick = (evt) => {
// NEED TO LIMIT THIS TO 3 CHOICES
    if ([...(document.querySelectorAll(".selected"))].length < 3) {
        evt.target.closest("tr").classList.toggle("selected");
        selectItem(evt.target.closest("tr"))
    } else {
        evt.target.closest("tr").classList.remove("selected");
        selectItem(evt.target.closest("tr"))
    }
})


// PLAYER SUBMITS CHOICES 
submitBtn.onclick = () => {
    saveResponses()
//test check*********************************
    // isVegetarian()
    // containsNoFish()
    // containsNoShrimp()
    // containsNoCheese()
    // containsNoLactose()
    // isHalal()
    // isKosher()
    // isGlutenFree()
    // isLighter()
    // containsNoAlcohol()
    // okForPregnancy()
// end of test check*************************
    printResult(isCriteriaFulfilled(selectedPrompt)) 
    showResponseSection()
}

newPromptBtn.onclick = () => {
    printPrompt(allPrompts);
    clearSelection()  
    clearResponse()
    hideResponseSection()  
}

// FOR LATER
// FILTER ITEMS
// on click of filter button
// pop up a form that they can click on 
// click on attribute they want to filter by
// filter only the items they want to keep

// SORT ITEMS 
// on click of sort button
// pop up a form that they can click on 
// click on attribute they want to sort by
// sorts the items 
