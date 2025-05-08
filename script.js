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
    ,functionFromScope = {}


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
    ,planCards = document.querySelector(".plan")
    ,prefab = planCards.querySelector(".items")
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
var cargoCustomers = jsonData[forThis]["to"]
var cargoCustomersKeys = Object.keys(cargoCustomers)

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
        var currentPageOffset = 0

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
    palletGrid.addEventListener("click", () => {
        alert(palletGrid.textContent)
    })
    
}
}




let rightArrow = document.querySelector("#rightArrow")
let leftArrow = document.querySelector("#leftArrow")

/** @type {HTMLElement} */
var flipPage = document.querySelector(".wrapper")
var moveSize = flipPage.offsetWidth
var currentCustomer = document.querySelectorAll(".customers")
var mobileCustomerDisplay = document.querySelector(".customerPages").querySelector("div")

function moveIt (side) {

    currentPageOffset += moveSize * side

    let previousCurrentPage = currentPage + side

    if (currentPage === totalPage) {
        currentPageOffset = 0
        currentPage = 0
        GcurrentPage = currentPage
    }

    if (currentPage < 0) {
        currentPageOffset = -flipPage.offsetWidth * (totalPage - 1)
        currentPage = totalPage - 1
        GcurrentPage = currentPage
    }

    GcurrentPage = currentPage

    // all the GcurrentPage = can's use number here
    // can't be += -1 or +=1 or = -1 all of them will break, i have to strictly use "currentPage" or i get different value
    // IDK how that work this look terible for me as well i know.

    bottomLeftCorner[previousCurrentPage].style.outline = "none"
    bottomLeftCorner[currentPage].style.outline = "2px solid black"
    dotThings[previousCurrentPage].style.outline = "2px solid black"
    dotThings[previousCurrentPage].style.backgroundColor = "white"
    dotThings[currentPage].style.outline = "2px solid white"
    dotThings[currentPage].style.backgroundColor = "var(--clr-accblue)"
    mobileCustomerDisplay.textContent = currentCustomer[currentPage].textContent

    /** @type {HTMLCollection} */
    pages = document.querySelectorAll(".itemsSections") 
    // 1/5/25 got me so mad i have to change css width of them to 100% so there are no problem in calculation

    pages.forEach(page => {
        page.style.transform = `translateX(${currentPageOffset}px)`

    })
}

document.querySelector(".itemsSections").classList.replace("itemsSections", "itemsSectionsOff")

// decide to not do loop arrow for now cause it already took me 5 day and it still break
// resort back to boring "go back if no data" type shyt

var totalPage = document.querySelectorAll(".itemsSections").length
    ,currentPage = 0 

// console.log(totalPage)
GcurrentPage = currentPage
// /\ for anything that look like above, i have to make it this way or else the value get different for some reason
// see in moveit() function for more info /\

rightArrow.addEventListener("click", () => {
    if (totalPage > 1){
    currentPage += 1
    moveIt(-1)
    // console.log(currentPage)
    return;
    }
})

leftArrow.addEventListener("click", () => {
    if (totalPage > 1) {
    currentPage -= 1
    moveIt(1)
    // console.log(currentPage)
    return;
    }
})

let bottomLeftCorner = document.querySelectorAll(".temp p")
/** @type {HTMLCollection} */
let dotThings = document.querySelectorAll(".moreHelp")
    bottomLeftCorner[currentPage].style.outline = "2px solid black"
    dotThings[currentPage].style.outline = "2px solid white"
    dotThings[currentPage].style.backgroundColor = "var(--clr-accblue)"
    mobileCustomerDisplay.textContent = currentCustomer[currentPage].textContent

for (let i = 0; i < dotThings.length; i++) {
    dotThings[i].addEventListener("click", () => {
        moveItByClick(i, -moveSize * i)
    })
}

function moveItByClick (number, fixedPosition) {
    let previousCurrentPage = currentPage
    currentPage = number
    GcurrentPage = currentPage
    currentPageOffset = fixedPosition
    dotThings[previousCurrentPage].style.outline = "2px solid black"
    dotThings[previousCurrentPage].style.backgroundColor = "white"
    dotThings[currentPage].style.outline = "2px solid white"
    dotThings[currentPage].style.backgroundColor = "var(--clr-accblue)"
    bottomLeftCorner[previousCurrentPage].style.outline = "none"
    bottomLeftCorner[currentPage].style.outline = "2px solid black"
    mobileCustomerDisplay.textContent = currentCustomer[currentPage].textContent

    /** @type {HTMLCollection} */
    pages = document.querySelectorAll(".itemsSections") 
    // 1/5/25 got me so mad i have to change css width of them to 100% so there are no problem in calculation

    pages.forEach(page => {
        page.style.transform = `translateX(${fixedPosition}px)`

    })



}

let startX = 0
let swipeSection = document.querySelectorAll(".itemsSections")

swipeSection.forEach(sect => {
    sect.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX
    })
    sect.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX
        let calX = endX - startX

        if (calX > 150) {
            currentPage -= 1
            moveIt(1)
            calX = 0
        }
        if (calX < -150) { 
            currentPage += 1
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
    }

    document.querySelector(".divFirstTop").classList.remove("hide");
  }, 150); // adjust delay if needed
});


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
        for (let j = 0; j < checkListAcess[roleCheckList[i]].length; j++) {
            /** @type {HTMLElement} */
            let inWrapPrefab = document.querySelector(".actualCheckList")
            let secondparent = document.querySelectorAll(".checkWrap")
            let cloneInWrap = inWrapPrefab.cloneNode(true)
            cloneInWrap.querySelector("p").textContent = checkListAcess[roleCheckList[i]][j]
            cloneInWrap.classList.remove("hide")
            let checkBox = document.createElement("input")
            checkBox.type = "checkbox"
            // checkBox.checked = true <= this will need to chain with JSON & more function need adjust
            cloneInWrap.prepend(checkBox)
            let whoTick = document.createElement("div")
            whoTick.classList.add("tickPerson")
            whoTick.textContent = "me"
            cloneInWrap.appendChild(whoTick)
            secondparent[i + 1].appendChild(cloneInWrap)
        }

    }
    aListAll = document.querySelectorAll(".aList") //there are some problem on top that i'm not gonna fix
    // it's about how there is an unneeded element but i make all these base on those  existing prefab now if i'm 
    // going to fix it i need to rewrite all that, which i'm not gonna do

}

var aListAll

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

var openAddCarModalBTN = document.querySelector(".addCar")
var closeAddCarModalBTN = document.querySelector(".addNo")
var modalPage = document.querySelector("#addCarPage")

openAddCarModalBTN.addEventListener("click", () => {
    modalPage.style.display = "flex"
    modalPage.showModal()
})
closeAddCarModalBTN.addEventListener("click", () => {
    modalPage.close()
    modalPage.style.display = "none"
    let insideInput = document.querySelectorAll("#addCarPage input")
    insideInput.forEach(thing => {
        thing.value = ""
    })
    while (document.querySelectorAll(".addTarget").length > 1) {
        targetAddParent.removeChild(targetAddParent.lastElementChild)
    }
    currentCustomerAmount = 0
    addMore()
})
let deliveryPrefab = {
        "carType": "A",
        "status": "plan",
        "driver": "B",
        "round": 0,
        "from":"",
        "to": {
            "CP": {
                "checkLists": {
                    "driver": ["pallet1", "clean", "amount", "document"],
                    "QC": ["pallet1", "clean", "amount"],
                    "document": ["pallet1", "amount",  "document"]
                },
                "pallet1": [ "thing1", "thing2", "thing3", "thing4", "thing5"
                            ,"thing6"],
                "pallet2": [ "thing1", "thing2", "thing3", "thing4"],
                "pallet3": [ "thing1", "thing2", "thing3", "thing4"]
                
        }
        ,
            "SCC": {
                "checkLists": {
                    "driver": ["pallet2", "clean", "amount", "document"],
                    "QC": ["pallet2", "clean", "amount"],
                    "document": ["pallet2", "amount",  "document"]
                },
                "pallet1": [ "thing1", "thing2", "thing3"],
                "pallet2": [ "thing1", "thing2", "thing3"]
            }
        },
        "start": "08:23",
        "timeRecord": {
            "customer1": ["timeTween","arriveTime", "waitTime","departTime"],
            "customer2": ["timeTween","arriveTime", "waitTime", "departTime"]

        },
        "timeWaitTotal": "N/A",
        "timeTakeTotal": "N/A",
        "timeReturn": "18:42",
        "timeTakeReturn": "03:22",
        "end": "22:04"
    }

var addNewCar = document.querySelector(".addYes")
var addCustomers = document.querySelectorAll(".addTarget") || undefined

var currentCustomerAmount = 0
var targetAddParent = document.querySelector(".addCustomers")

function secondUp() {
    if (this.value.length === 0){
        this.remove()
        addCustomers = document.querySelectorAll(".addTarget")
        currentCustomerAmount -= 1
    }
}


function addMore() {
    addCustomers[currentCustomerAmount].addEventListener("input", (e) => {
        if (e.target.value.length >= 1) {
            appendCustomerPrefab = addCustomers[0].cloneNode(true)
            appendCustomerPrefab.classList.remove("addTarget1")
            appendCustomerPrefab.value = ""
            currentCustomerAmount += 1
            appendCustomerPrefab.classList.add("addTarget" + (currentCustomerAmount + 1))
            targetAddParent.appendChild(appendCustomerPrefab)
            addCustomers = document.querySelectorAll(".addTarget")
            addMore()
            if (currentCustomerAmount > 0) {
                addCustomers[currentCustomerAmount].addEventListener("input", secondUp)
            }
            
        }
        
    }, {once: true})
    
}

addMore()

addNewCar.addEventListener("click", () => {
    let driverAdd = document.querySelector(".driverAdd") || undefined
    let fromAdd = document.querySelector(".fromAdd") || undefined
    let roundAdd = document.querySelector(".roundAdd") || undefined
    let addTarget = document.querySelector(".addTarget") || undefined

    if (!driverAdd.value || !fromAdd.value || !roundAdd.value || !addTarget.value) {
        alert("some element not found")
        return
    }

    alert("All inputs valid:\n" +
        driverAdd.value + ", " +
        fromAdd.value + ", " +
        roundAdd.value + ", " +
        addTarget.value
    );

    [driverAdd, fromAdd, roundAdd, addTarget].forEach(input => input.value = "")

    while (document.querySelectorAll(".addTarget").length > 1) {
        targetAddParent.removeChild(targetAddParent.lastElementChild)
    }
    currentCustomerAmount = 0
    addMore()


})