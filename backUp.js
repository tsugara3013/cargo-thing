// 27/4/25
// all these is such a mess when i write code so i move it here

var deleteCar = document.querySelectorAll(".deleteCar")

function selfRemove () {
    console.log(jsonData)
    jsonData[this.id].getDelete = true
    if (confirm("delete me?")){
    this.remove();
    }
}


function deleteDiv() {
    /** @type {HTMLElement} */
    let current = this
    /** @type {HTMLCollectionOf<HTMLElement>} */
    let children = current.parentElement.parentElement.parentElement
    .getElementsByClassName("items")
    current.classList.toggle("removeMode")
    if (this.classList.contains("removeMode")) {
    for (let i = 0; i < children.length; i++) {
        children[i].style.backgroundColor = "green"
        children[i].addEventListener("click", selfRemove)
        children[i].removeEventListener("click", window.pullData)


        }
    }
    else { 
        for (let i = 0; i < children.length; i++) {
            children[i].removeEventListener("click", selfRemove)
            children[i].addEventListener("click", window.pullData)
            children[i].style.backgroundColor = "var(--clr-accblue)"
            }
        }
}

for (let i = 0; i < deleteCar.length; i ++) {
    deleteCar[i].addEventListener("click", deleteDiv)

}


// need to focus on some god know glitch i create, i don't even know when i make or where it come from but i need to fix that asap
// keep these code here cause they shouldn't be involve with those thing.

var checkListPage = document.querySelector(".checkListPage")
var originalPosition = checkListPage.offsetTop
var wrapper = document.querySelector(".wrapper")

function checklistFromJSON (deliveryID) {
    let customsCheckList = jsonData[deliveryID]["to"]
    // this mean jsonData[delivery[number]]["to"]
    let customsCheckListKeys = Object.keys(customsCheckList)
    // get keys from previous variable above for access
    let currentCheckListPage = customsCheckList[customsCheckListKeys[currentPage]]
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
            secondparent[i + 1].appendChild(cloneInWrap)
        }
    }

}

var currentCheckPageState = "off"

function pullCheckList (deliveryID) {
    if (currentCheckPageState === "off") {
        checkListPage.classList.toggle("hide")
        currentCheckPageState = "on"
    setTimeout(() => {
        checklistFromJSON(deliveryID)
        checkListPage.style.transform= `translateY(-${wrapper.offsetHeight + 80}px)`
    }, 10);
    return;
    }
    setTimeout(() => {
        checkListPage.classList.toggle("hide")
    }, 200);
    currentCheckPageState = "off"
    checkListPage.style.transform = `translateY(${originalPosition}px)`;
    
}

checkListButton.addEventListener("click", () => {
    pullCheckList(forThisCurrent)
})