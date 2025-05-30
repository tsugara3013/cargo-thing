// start this again at 20/4/25
// finally get json stuff at 27/4/25
var jsonData = {}
    ,jsonDataKeys = []
    ,jsonKeysAmount = 0
// for dynamic day select. will add function to control it later.
    ,daySelect = "2025-04-27"
// declare the 2 below as variable cause i don't understand how closure work
    ,currentDelivery = ""
    ,GcurrentPage = 0
    /** @type {HTMLElement} */
var flipPage = ""
var moveSize = ""
var currentCustomer = ""
var mobileCustomerDisplay = ""
var totalPage = ""
var currentPageOffset = 0
var bottomLeftCorner = ""
var dotThings = ""
var startX = 0
var swipeSection = document.querySelectorAll(".itemsSections")


// note to self: alway wrap everything in ".then" when work with json data,
// cause fetch take some time it can't catch up with immediate run
// 6/5/25 ok so it turn out i don't need to do all these
fetch(daySelect + ".json").then(Response => Response.json())
.then(data => {
    jsonData = data
    jsonDataKeys = Object.keys(jsonData)
    jsonKeysAmount = jsonDataKeys.length



/** @type {HTMLElement} */
var statusClick = document.querySelectorAll(".frontCard")
    ,prefab = document.querySelector(".itemsPrefab")
    ,back = document.querySelector(".goBack")
    ,frontpage = document.querySelector(".frontPage")
    ,menu = document.querySelector("#menu")

// create card from json file
for (let i = 0; i < jsonKeysAmount; i++) {

    // at first i use getElementByClassName cause json file don't have dot
    // then i learn that i could use "." + name so i change
    let parent = document.querySelector("." + jsonData[jsonDataKeys[i]].status)
    /** @type {HTMLDivElement} */
    let newDiv = prefab.cloneNode(true)
    newDiv.classList.replace("itemsPrefab", "items")
    parent.appendChild(newDiv)
    newDiv.id = jsonDataKeys[i]
    newDiv.classList.remove("hide")
    newDiv.querySelector(".driver").textContent =jsonData[jsonDataKeys[i]].driver 
    + jsonData[jsonDataKeys[i]].round
    let route = newDiv.querySelector(".travelTo").getElementsByTagName("p")
    let customers = jsonData[jsonDataKeys[i]].to
    let allCustomer = Object.keys(customers)

for (let j = 0; j < allCustomer.length; j++) {
    route[0].textContent = jsonData[jsonDataKeys[i]].from
    route[2].textContent = allCustomer.length + "   " + "customer"
}    
}


if (back){
back.addEventListener("click", () => {
    back.parentElement.parentElement.classList.toggle("hide")
    frontpage.classList.toggle("hide")
    let thing = document.querySelector(".itemsSectionsOff")

    if (thing) {
        thing.classList.replace("itemsSectionsOff", "itemsSections")
        document.querySelector(".middle").innerHTML = ""
        currentCheckPageState = "off"
        checkListPage.classList.add("hide")
        checkListPage.style.transform = `translateY(${originalPosition}px)`
        foldPart.children[1].textContent = "open"
        foldPart.firstElementChild.style.cssText = "transform: rotateX(-1turn);"
        foldPart.lastElementChild.style.cssText = "transform: rotateX(-1turn);"
        document.querySelector("#palletPage").classList.add("hide")
    }
    document.querySelector(".divFirstTop").classList.remove("hide")

})
}
// temporary for toggle
menu.addEventListener("click", function() {
    frontpage.classList.toggle("hide")
    back.parentElement.parentElement.classList.toggle("hide")
    var customersIn = document.querySelector(".temp")
    customersIn.innerHTML = ""
    currentCheckPageState = "off"
    let thing = document.querySelector(".itemsSectionsOff")

    if (thing) {
        thing.classList.replace("itemsSectionsOff", "itemsSections")
        document.querySelector(".middle").innerHTML = ""
        currentCheckPageState = "off"
        checkListPage.classList.add("hide")
        checkListPage.style.transform = `translateY(${originalPosition}px)`
        foldPart.children[1].textContent = "open"
        foldPart.firstElementChild.style.cssText = "transform: rotateX(-1turn);"
        foldPart.lastElementChild.style.cssText = "transform: rotateX(-1turn);"
        if (!document.querySelector("#palletPage").classList.contains("hide")) {
            document.querySelector("#palletPage").classList.add("hide")
            back.parentElement.parentElement.classList.toggle("hide")
        }
    }
    document.querySelector(".divFirstTop").classList.remove("hide")
})

function pullData () {
    frontpage.classList.toggle("hide")
    back.parentElement.parentElement.classList.toggle("hide")
    let forThis = this.id
    currentDelivery = this.id

var leftIn = document.querySelector(".leftTopSide").getElementsByTagName("div")
var rightIn = document.querySelector(".rightTopSide").getElementsByTagName("div")

leftIn[0].textContent = jsonData[forThis]["start"]
leftIn[1].textContent = jsonData[forThis]["end"]
rightIn[0].textContent = "not yet work"
rightIn[1].textContent = jsonData[forThis]["status"]

var customersIn = document.querySelector(".temp")
customersIn.innerHTML = ""
let cargoCustomers = jsonData[forThis]["to"]
let cargoCustomersKeys = Object.keys(cargoCustomers)

document.querySelector(".secondInnerTop").querySelector(".driver").textContent 
= jsonData[forThis]["driver"] + jsonData[forThis]["round"]

for (let i = 0; i < cargoCustomersKeys.length; i++) {
    let parent = customersIn
    let customersList = document.createElement("p")
    customersList.innerText = cargoCustomersKeys[i]
    customersList.classList = "customers"
    parent.appendChild(customersList)
}
let palletParent = document.querySelector(".itemsSections")

cargoCustomersKeys[0]

if (document.querySelectorAll(".itemsSections".length > 1)) {
while (document.querySelectorAll(".itemsSections").length > 1){
    document.querySelector(".wrapper").removeChild(document.querySelector(".wrapper").lastElementChild)
}
}

for (let i = 0; i < cargoCustomersKeys.length; i++) {
    let newPage = palletParent.cloneNode(true)
    /** @type {HTMLElement} */
    var wrapper = document.querySelector(".wrapper")
    newPage.classList.remove("hide")
    wrapper.appendChild(newPage)
        /** @type {HTMLCollection} */
        var pages = document.querySelectorAll(".itemsSections")
        currentPageOffset = 0

        pages.forEach(page => {
            page.style.transform = `translateX(${currentPageOffset}px)`
    
        })
    let dotParent = document.querySelector(".middle")
    let dotIn = document.createElement("div")
    dotIn.classList.add("moreHelp")
    dotIn.classList.add(i)
    dotParent.prepend(dotIn)        
}


while (palletParent.getElementsByClassName("items").length > 1){
    palletParent.removeChild(palletParent.lastElementChild)
}

for (let i = 1; i < document.querySelectorAll(".itemsSections").length; i++) {
    let beforePallet = Object.keys(jsonData[forThis]["to"])
    let pallets = jsonData[forThis]["to"][beforePallet[i-1]]
    let palletsKeys = Object.keys(pallets)
    for (let j = 1; j < palletsKeys.length; j++){
    let palletsLayout = document.querySelector(".itemsSections").querySelector(".items")
    let palletGrid = palletsLayout.cloneNode(true)
    let currentParent = document.querySelectorAll(".itemsSections")

    
    currentParent[i].appendChild(palletGrid)

    palletGrid.classList.remove("hide")
    palletGrid.textContent = palletsKeys[j]
    palletGrid.addEventListener("click", window.palletData)
    
}
}




let rightArrow = document.querySelector("#rightArrow")
let leftArrow = document.querySelector("#leftArrow")

/** @type {HTMLElement} */
flipPage = document.querySelector(".wrapper")
moveSize = flipPage.offsetWidth
currentCustomer = document.querySelectorAll(".customers")
mobileCustomerDisplay = document.querySelector(".customerPages").querySelector("div")

document.querySelector(".itemsSections").classList.replace("itemsSections", "itemsSectionsOff")

// decide to not do loop arrow for now cause it already took me 5 day and it still break
// resort back to boring "go back if no data" type shyt

totalPage = document.querySelectorAll(".itemsSections").length
GcurrentPage = 0 

rightArrow.removeEventListener("click", forRightArrow)
rightArrow.addEventListener("click", forRightArrow)
leftArrow.removeEventListener("click", forLeftArrow)
leftArrow.addEventListener("click", forLeftArrow)

bottomLeftCorner = document.querySelectorAll(".temp p")
/** @type {HTMLCollection} */
dotThings = document.querySelectorAll(".moreHelp")
    bottomLeftCorner[GcurrentPage].style.outline = "2px solid black"
    dotThings[GcurrentPage].style.outline = "2px solid white"
    dotThings[GcurrentPage].style.backgroundColor = "var(--clr-accblue)"
    mobileCustomerDisplay.textContent = currentCustomer[GcurrentPage].textContent

for (let i = 0; i < dotThings.length; i++) {
    dotThings[i].addEventListener("click", () => {
        moveItByClick(i, -moveSize * i)
    })
}

function moveItByClick (number, fixedPosition) {
    let previousCurrentPage = GcurrentPage
    GcurrentPage = number
    GcurrentPage = GcurrentPage
    currentPageOffset = fixedPosition
    dotThings[previousCurrentPage].style.outline = "2px solid black"
    dotThings[previousCurrentPage].style.backgroundColor = "white"
    dotThings[GcurrentPage].style.outline = "2px solid white"
    dotThings[GcurrentPage].style.backgroundColor = "var(--clr-accblue)"
    bottomLeftCorner[previousCurrentPage].style.outline = "none"
    bottomLeftCorner[GcurrentPage].style.outline = "2px solid black"
    mobileCustomerDisplay.textContent = currentCustomer[GcurrentPage].textContent

    /** @type {HTMLCollection} */
    pages = document.querySelectorAll(".itemsSections") 
    // 1/5/25 got me so mad i have to change css width of them to 100% so there are no problem in calculation

    pages.forEach(page => {
        page.style.transform = `translateX(${fixedPosition - (20*GcurrentPage)}px)`

    })



}

startX = 0
swipeSection = document.querySelectorAll(".itemsSections")

swipeSection.forEach(sect => {
    sect.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX
    })
    sect.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX
        let calX = endX - startX

        if (calX > 150) {
            GcurrentPage -= 1
            moveIt(1)
            calX = 0
        }
        if (calX < -150) { 
            GcurrentPage += 1
            moveIt(-1) 
            calX = 0
            
        }
    })
})


if (window.innerWidth < 1000) {
    document.querySelector(".divFirstTop").classList.add("hide")
    foldPart.classList.remove("hide")
} else {
    foldPart.classList.add("hide")
}


let resizeTimeout;

if (window.innerWidth > 1000) {
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    let thing = document.querySelector(".itemsSectionsOff");

    if (thing) {
      document.querySelector(".frontPage").classList.remove("hide");
      document.querySelector(".firstLayer").classList.add("hide");
      thing.classList.replace("itemsSectionsOff", "itemsSections");
      document.querySelector(".middle").innerHTML = "";
      currentCheckPageState = "off";
      checkListPage.classList.add("hide");
      checkListPage.style.transform = `translateY(${originalPosition}px)`;
      document.querySelector("#palletPage").classList.add("hide")
    }

    document.querySelector(".divFirstTop").classList.remove("hide");
  }, 150); // adjust delay if needed
}, {once:true});
}

}

function moveIt (side) {

    currentPageOffset += moveSize * side

    let previousCurrentPage = GcurrentPage + side

    if (GcurrentPage === totalPage) {
        currentPageOffset = 0
        GcurrentPage = 0
    }

    if (GcurrentPage < 0) {
        currentPageOffset = -flipPage.offsetWidth * (totalPage - 1)
        GcurrentPage = totalPage - 1
    }

    // all the GcurrentPage = can's use number here
    // can't be += -1 or +=1 or = -1 all of them will break, i have to strictly use "currentPage" or i get different value
    // IDK how that work this look terible for me as well i know.

    bottomLeftCorner[previousCurrentPage].style.outline = "none"
    bottomLeftCorner[GcurrentPage].style.outline = "2px solid black"
    dotThings[previousCurrentPage].style.outline = "2px solid black"
    dotThings[previousCurrentPage].style.backgroundColor = "white"
    dotThings[GcurrentPage].style.outline = "2px solid white"
    dotThings[GcurrentPage].style.backgroundColor = "var(--clr-accblue)"
    mobileCustomerDisplay.textContent = currentCustomer[GcurrentPage].textContent

    /** @type {HTMLCollection} */
    pages = document.querySelectorAll(".itemsSections") 
    // 1/5/25 got me so mad i have to change css width of them to 100% so there are no problem in calculation

    pages.forEach(page => {
        page.style.transform = `translateX(${currentPageOffset - (20*GcurrentPage)}px)`

    })
}

function forRightArrow () {
    if (totalPage > 1){
    GcurrentPage += 1
    moveIt(-1)
    // console.log(currentPage)
    return;
    }
}

function forLeftArrow () {
    if (totalPage > 1) {
    GcurrentPage -= 1
    moveIt(1)
    // console.log(currentPage)
    return;
    }
}



for (let i = 0; i < statusClick.length; i++) {
    let currentStatusClick = statusClick[i].querySelectorAll(".items")
    if (currentStatusClick) {
        for (let j = 0; j < currentStatusClick.length; j++) {
            currentStatusClick[j].addEventListener("click", pullData)
            currentStatusClick[j].addEventListener("click", () => {
            })

        }


    }
}

window.pullData = pullData


var checkListPage = document.querySelector(".checkListPage")
var originalPosition = checkListPage.offsetTop
var wrapper = document.querySelector(".wrapper")

function checklistFromJSON (deliveryID) {
    let customsCheckList = jsonData[deliveryID]["to"]
    // this mean jsonData[delivery[number]]["to"]
    let customsCheckListKeys = Object.keys(customsCheckList)
    // get keys from previous variable above for access
    let currentCheckListPage = customsCheckList[customsCheckListKeys[GcurrentPage]]
    // this mean jsonData[delivery[number]]["to"][customer${currentPage}]
    let checkListAcess = currentCheckListPage["checkLists"]
    // this mean jsonData[delivery[number]]["to"][customer${currentPage}]["checkLists"]
    let roleCheckList = Object.keys(checkListAcess)
    // get keys from previous variable above for access
    var firstParent = document.querySelector(".checkFlip")

    while (document.querySelectorAll(".checkWrap").length > 1) {
        for (let k = 0; k < 3; k++){
        document.querySelector(".checkFlip").removeChild(document.querySelector(".checkFlip").lastElementChild)
        }
    }
    for (let i = 0; i < roleCheckList.length; i++) {
        let subCheck = document.createElement("li")
        let sepperate = document.createElement("hr")
        let subWrap = document.createElement("div")
        subWrap.classList.add("checkWrap")
        subCheck.classList.add("aList")
        firstParent.appendChild(subCheck)
        firstParent.appendChild(sepperate)
        firstParent.appendChild(subWrap)
        subCheck.textContent = roleCheckList[i]
        let currentCheckStateKeys = Object.keys(checkListAcess[roleCheckList[i]])
        for (let j = 0; j < currentCheckStateKeys.length; j++) {
            /** @type {HTMLElement} */
            let inWrapPrefab = document.querySelector(".actualCheckList")
            let secondparent = document.querySelectorAll(".checkWrap")
            let cloneInWrap = inWrapPrefab.cloneNode(true)
            cloneInWrap.querySelector("p").textContent =  currentCheckStateKeys[j]
            cloneInWrap.classList.remove("hide")
            let checkBox = document.createElement("input")
            checkBox.type = "checkbox"
            checkBox.checked = checkListAcess[roleCheckList[i]][currentCheckStateKeys[j]][0]
            // checkBox.checked = true <= this will need to chain with JSON & more function need adjust
            cloneInWrap.prepend(checkBox)
            let whoTick = document.createElement("div")
            whoTick.classList.add("tickPerson")
            whoTick.textContent = checkListAcess[roleCheckList[i]][currentCheckStateKeys[j]][1]
            cloneInWrap.appendChild(whoTick)
            secondparent[i + 1].appendChild(cloneInWrap)
        }

    }
    checkWrapAll = document.querySelectorAll(".checkWrap")
    aListAll = document.querySelectorAll(".aList")
    //there are some problem on top that i'm not gonna fix
    // it's about how there is an unneeded element but i make all these base on those  existing prefab now if i'm 
    // going to fix it i need to rewrite all that, which i'm not gonna do
    for (let k = 1; k < checkWrapAll.length; k++) {
            foldCheckList(checkWrapAll[k])
            aListAll[k].addEventListener("click", () => {
                if (checkWrapAll[k].classList.contains("subCheckHide")) {
                    checkWrapAll[k].classList.toggle("subCheckHide")
                    checkWrapAll[k].style.height = "0"
                    return
                }
                checkWrapAll[k].removeAttribute("style")
                checkWrapAll[k].classList.toggle("subCheckHide")
            })
    }

}

function foldCheckList (checkerPerson) {
        checkerPerson.style.height = "0"
    setTimeout(() => {
        // let fromTop = checkerPerson.offsetTop
        // for (let i = 0; i < checkerPerson.children.length; i++) {
        //     checkerPerson.children[i].style.transform = `translateY(-${fromTop}px)`
        // }
        
    }, 10);

}

var currentCheckPageState = "off"

function pullCheckList (deliveryID) {
    if (currentCheckPageState === "off") {
        checkListPage.classList.toggle("hide")
        currentCheckPageState = "on"
    setTimeout(() => {
        checklistFromJSON(deliveryID)
        checkListPage.style.transform= `translateY(-${wrapper.offsetHeight + 80}px)`
    }, 5);
    return;
    }
    setTimeout(() => {
        checkListPage.classList.toggle("hide")
    }, 200);
    currentCheckPageState = "off"
    checkListPage.style.transform = `translateY(${originalPosition}px)`;
    
}

checkListButton.addEventListener("click", () => {
    pullCheckList(currentDelivery)
})

let startY1 = 0
let endY1 = 0

window.addEventListener("touchstart", (e) => {
    if (document.querySelector(".firstLayer").classList.contains("hide")) { return}
        startY1 = e.touches[0].clientY
})
window.addEventListener("touchend", (e) => {
    if (document.querySelector(".firstLayer").classList.contains("hide")) { return}
        endY1 = e.changedTouches[0].clientY

        const calY1 = endY1 - startY1

        if( calY1 < -600) {
            pullCheckList(currentDelivery)
        }
})

})

// let darkMode = true

// document.querySelector("#themeToggle").addEventListener("click", () => {
//   if (darkMode) {
//     document.documentElement.style.setProperty('--clr-accbrown', 'rgb(138, 138, 138)');
//     document.documentElement.style.setProperty('--clr-accgrey', 'rgb(25, 20, 18)');
//   } else {
//     document.documentElement.style.setProperty('--clr-accbrown', 'rgb(25, 20, 18)');
//     document.documentElement.style.setProperty('--clr-accgrey', 'rgb(138, 138, 138)');
//   }
//   darkMode = !darkMode
// })

let foldPart = document.querySelector(".foldPart")

foldPart.addEventListener("click", () => {
    /** @type {HTMLElement} */
    document.querySelector(".divFirstTop").classList.toggle("hide")
    foldPart.firstElementChild.style.cssText = "transform: rotateX(-0.5turn);"
    foldPart.lastElementChild.style.cssText = "transform: rotateX(-0.5turn);"
    if (foldPart.children[1].textContent === "close"){
        foldPart.children[1].textContent = "open"
        foldPart.firstElementChild.style.cssText = "transform: rotateX(-1turn);"
        foldPart.lastElementChild.style.cssText = "transform: rotateX(-1turn);"
        return
    }
    foldPart.children[1].textContent = "close"
})