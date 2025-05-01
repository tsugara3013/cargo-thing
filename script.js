// start this again at 20/4/25
// finally get json stuff at 27/4/25
var jsonData = {}
    ,jsonDataKeys = []
    ,jsonKeysAmount = 0
// for dynamic day select. will add function to control it later.
    ,daySelect = "2025-04-27"


// note to self: alway wrap everything in ".then" when work with json data,
// cause fetch take some time it can't catch up with immediate run
fetch(daySelect + ".json").then(Response => Response.json())
.then(data => {
    jsonData = data
    jsonDataKeys = Object.keys(jsonData)
    jsonKeysAmount = jsonDataKeys.length



/** @type {HTMLElement} */
var planCards = document.querySelector(".frontCard.plan")
    ,prefab = planCards.querySelector(".items")
    ,back = document.querySelector(".goBack")
    ,frontpage = document.querySelector(".frontPage")
    ,menu = document.querySelector("#menu")

// create card from json file
for (let i = 0; i < jsonKeysAmount; i++) {
    // at first i use getElementByClassName cause json file don't have dot
    // then i learn that i could use "." + and the name so i change
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
    route[2].textContent = allCustomer[j]
}

    
}

var planClick = planCards.querySelectorAll(".items")

if (back){
back.addEventListener("click", () => {
    back.parentElement.parentElement.classList.toggle("hide")
    frontpage.classList.toggle("hide")

})
}

// temporary for toggle
menu.addEventListener("click", function() {
    frontpage.classList.toggle("hide")
    back.parentElement.parentElement.classList.toggle("hide")
    var customersIn = document.querySelector(".temp")
    customersIn.innerHTML = ""
})


function pullData () {
    frontpage.classList.toggle("hide")
    back.parentElement.parentElement.classList.toggle("hide")
    let forThis = this.id

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
        var currentPageOffset = -wrapper.offsetWidth

        pages.forEach(page => {
            page.style.transform = `translateX(${currentPageOffset}px)`
    
        })
    
}


while (palletParent.getElementsByClassName("items").length > 1){
    palletParent.removeChild(palletParent.lastElementChild)
}

for (let i = 1; i < document.querySelectorAll(".itemsSections").length; i++) {
    let pallets = jsonData[forThis]["to"][`customer${i}`]
    let palletsKeys = Object.keys(pallets)
    for (let j = 1; j < palletsKeys.length; j++){
    let palletsLayout = document.querySelector(".itemsSections").querySelector(".items")
    let palletGrid = palletsLayout.cloneNode(true)
    let currentParent = document.querySelectorAll(".itemsSections")

    
    currentParent[i].appendChild(palletGrid)

    palletGrid.classList.remove("hide")
    palletGrid.textContent = palletsKeys[j]
    
}


}


let rightArrow = document.querySelector("#rightArrow")
let leftArrow = document.querySelector("#leftArrow")

function moveIt (side) {
    /** @type {HTMLElement} */
    let flipPage = document.querySelector(".wrapper")
    let moveSize = flipPage.offsetWidth

    currentPageOffset += moveSize * side

    /** @type {HTMLCollection} */
    pages = document.querySelectorAll(".itemsSections") 
    // 1/5/25 got me so mad i have to change css width of them to 100% so there are no problem in calculation

    pages.forEach(page => {
        page.style.transform = `translateX(${currentPageOffset}px)`

    })
}

var currentPage = 1
    ,totalPage = document.querySelectorAll(".itemsSections").length

rightArrow.addEventListener("click", () => {
    if (totalPage > 0){
    moveIt(-1)
    currentPage += 1
    console.log(currentPage)
}
})

leftArrow.addEventListener("click", () => {
    if (totalPage > 0) {
    moveIt(1)
    currentPage -= 1
    console.log(currentPage)
    }
})

function previousPage () {

}




}

for (let i = 0; i < planClick.length; i++) {
    planClick[i].addEventListener("click", pullData)
}




})


