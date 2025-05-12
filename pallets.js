let currentPallet = 0
let totalPallet = 0
let goRight = document.querySelector("#rightPallet")
let goLeft = document.querySelector("#leftPallet")
let movePalletPage = document.querySelector(".rollsList").offsetWidth
let currentPagePallet = 0
let allPallet = ""
let customerPallet = ""
let forHold = ""

function palletData() {
    let rollsParent = document.querySelector(".rollsList")
    rollsParent.innerHTML = ""
    let pallets = jsonData[currentDelivery]["to"]
    let palletsKeys = Object.keys(pallets)
    // this one for all pallet of currentDelivery
    console.log(jsonData[currentDelivery]["to"][palletsKeys[GcurrentPage]])
    // this one for pallet amount
    // use -1 cause the first one is checklists
    allPallet = Object.keys(jsonData[currentDelivery]["to"][palletsKeys[GcurrentPage]])
    console.log(allPallet)
    customerPallet = palletsKeys[GcurrentPage]
    // // this one for current pallet items
    // console.log(jsonData[currentDelivery]["to"][palletsKeys[GcurrentPage]][this.textContent])
    // // self explaination
    // console.log(jsonData[currentDelivery]["to"][palletsKeys[GcurrentPage]][this.textContent].length)
    document.querySelector(".firstLayer").classList.add("hide");
    document.querySelector("#palletPage").classList.remove("hide")
    document.querySelector("#palletCustomerName").textContent = palletsKeys[GcurrentPage]
    //  + " - " + this.textContent
    for (let i = 0; i < allPallet.length; i++) {
        let newRollListPage = document.createElement("ul")
        newRollListPage.classList.add("rollsListPage")
        if (i === 0) {continue}

        for (let j = 0; j < jsonData[currentDelivery]["to"][palletsKeys[GcurrentPage]][allPallet[i]].length; j++) {
        let newSubRoll = document.createElement("li")
        newSubRoll.classList.add("rolls", "center", `roll${i}`)
        let inSubRoll1 = document.createElement("div")
        inSubRoll1.classList.add("deleteRoll", "center")
        inSubRoll1.textContent = "delete"
        let inSubRoll2 = document.createElement("p")
        inSubRoll2.textContent = jsonData[currentDelivery]["to"][palletsKeys[GcurrentPage]][`pallet${i}`][j]
        let inSubRoll3 = document.createElement("div")
        inSubRoll3.classList.add("editRoll", "center")
        inSubRoll3.textContent = "edit"
        newSubRoll.appendChild(inSubRoll3)
        newSubRoll.appendChild(inSubRoll2)
        newSubRoll.appendChild(inSubRoll1)
        newRollListPage.appendChild(newSubRoll)
        }
        rollsParent.appendChild(newRollListPage)
    }

startX = 0
swipeSectionPallet = document.querySelectorAll(".rollsListPage")

swipeSectionPallet.forEach(sect => {
    sect.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX
    })
    sect.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX
        let calX = endX - startX

        if (calX > 150) {
            currentPallet -= 1
            movePallet(1)
        }
        if (calX < -150) { 
            currentPallet += 1
            movePallet(-1)
        // console.log(currentPallet)
        // return;
        }
    })
})




let editRoll = document.querySelectorAll(".editRoll")

editRoll.forEach(button => {
    button.addEventListener("click", editMode)
})

// let allpage = document.querySelectorAll(".rollsListPage")
// let eachWidth = document.querySelector(".rollsListPage").offsetWidth
// allpage.forEach(pages => {
//     pages.style.transform = `translateX(-${eachWidth + 4}px)`
// })

let deleteRoll = document.querySelectorAll(".deleteRoll")
deleteRoll.forEach(button => {
    button.addEventListener("click", harakiri)
})

movePalletPage = document.querySelector(".rollsList").offsetWidth
currentPagePallet = 0

currentPallet = 0
totalPallet = document.querySelectorAll(".rollsListPage").length
console.log(totalPallet)
goRight = document.querySelector("#rightPallet")
goLeft = document.querySelector("#leftPallet")

goRight.removeEventListener("click", forGoRight)
goRight.addEventListener("click", forGoRight)
goLeft.removeEventListener("click", forGoLeft)
goLeft.addEventListener("click", forGoLeft)

}

function editMode () {
    if (this.textContent === "confirm"){
        this.textContent = "edit"
        let changeBack = document.createElement("p")
        let thingHere = this.parentElement.querySelector("input")
        let newValue = thingHere.value
        thingHere.replaceWith(changeBack)
        this.parentElement.querySelector("p").textContent = newValue
        return
    }
    this.textContent = "confirm"
    let changeToInput = document.createElement("input")
    let value = this.parentElement.querySelector("p").textContent
    this.parentElement.querySelector("p").replaceWith(changeToInput)
    this.parentElement.querySelector("input").style.width = "100%"
    this.parentElement.querySelector("input").value = value
    // console.log(thing.textContent)
    

}

function movePallet(side) {
    currentPagePallet += movePalletPage * side
    // console.log(currentPallet)

    if (currentPallet === totalPallet) {
        currentPagePallet = 0
        currentPallet = 0
    }

    if (currentPallet < 0) {
        currentPagePallet = -movePalletPage * (totalPallet - 1)
        console.log(currentPagePallet)
        currentPallet = totalPallet - 1
    }

    /** @type {HTMLCollection} */
    pagesPallet = document.querySelectorAll(".rollsListPage") 
    // 1/5/25 got me so mad i have to change css width of them to 100% so there are no problem in calculation

    pagesPallet.forEach(page => {
        page.style.transform = `translateX(${currentPagePallet - (4 * currentPallet)}px)`

    })
}

function forGoRight () {
    if (totalPallet > 1){
    currentPallet += 1
    movePallet(-1)
    // console.log(currentPallet)
    // return;
    }
}

function forGoLeft () {
    if (totalPallet > 1) {
    currentPallet -= 1
    movePallet(1)
    // console.log(currentPallet)
    // return;
    }
}

/** @type {HTMLElement} */
let manualMode = document.querySelector(".changeInputMode")

function changeInputMode() {
    if (manualMode.classList.contains("manualInput")) {
        manualMode.removeAttribute("style")
        manualMode.classList.toggle("manualInput")
        manualMode.textContent = "munual"
        rollPalletInput.addEventListener("input", addMoreRolls)
        return
    }
    manualMode.classList.toggle("manualInput")
    manualMode.textContent = "on"
    manualMode.style.backgroundColor = "var(--clr-accbrown)"
    manualMode.style.color = "var(--clr-accred)" 
    manualMode.style.outline = "2px solid var(--clr-accblue)"
    rollPalletInput.removeEventListener("input", addMoreRolls)
}

manualMode.addEventListener("click", changeInputMode)

let closePallet = document.querySelector(".returnBack")

function closePalletPage () {
    this.parentElement.parentElement.parentElement.classList.add("hide")
    document.querySelector(".firstLayer").classList.remove("hide")
}

closePallet.addEventListener("click", closePalletPage)

function harakiri() {
    // console.log(this.parentElement.parentElement.querySelectorAll(".rolls").length)
    if(!confirm("delete me?")) {
        return
    }
    if (this.parentElement.parentElement.querySelectorAll(".rolls").length === 1) {
        this.parentElement.parentElement.remove()
    }
    this.parentElement.remove()
}

function addMoreRolls (barcode) {
    let currentParent = document.querySelector(".rollsList").children[currentPallet]
    for (let i = 0; i < currentParent.children.length; i++) {
        if (barcode === currentParent.children[i].querySelector("p").textContent) {return}
        if (this.value === currentParent.children[i].querySelector("p").textContent) {
            this.value = ""     
            return
        }      
    }
    let newSubRoll = document.createElement("li")
    newSubRoll.classList.add("rolls", "center", `roll${currentParent.children.length + 1}`)
    let inSubRoll1 = document.createElement("div")
    inSubRoll1.classList.add("deleteRoll", "center")
    inSubRoll1.textContent = "delete"
    let inSubRoll2 = document.createElement("p")
    inSubRoll2.textContent = this.value || barcode
    forHold = jsonData[currentDelivery]["to"][customerPallet][allPallet[currentPallet + 1]]
    forHold.push(this.value || barcode)
    let inSubRoll3 = document.createElement("div")
    inSubRoll3.classList.add("editRoll", "center")
    inSubRoll3.textContent = "edit"
    inSubRoll1.addEventListener("click", harakiri)
    inSubRoll3.addEventListener("click", editMode)
    newSubRoll.appendChild(inSubRoll3)
    newSubRoll.appendChild(inSubRoll2)
    newSubRoll.appendChild(inSubRoll1)
    currentParent.appendChild(newSubRoll)
    this.value = ""
}

let rollPalletInput = document.querySelector("#addRoll")

rollPalletInput.addEventListener("input", addMoreRolls)

rollPalletInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addMoreRolls(this.value)
        this.value = ""
    }
})