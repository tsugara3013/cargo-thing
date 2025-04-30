// 27/4/25
// all these is such a mess when i write code so i move it here

var deleteCar = document.querySelectorAll(".deleteCar")
var addCar = document.querySelector(".addCar")

function selfRemove () {
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
        }
    }
    else { 
        for (let i = 0; i < children.length; i++) {
            children[i].removeEventListener("click", selfRemove)
            children[i].style.backgroundColor = "var(--clr-accblue)"
            }
        }
}

function createCar () {
    let newDiv = document.createElement("div");
    newDiv.classList.add("items");
    newDiv.innerText = "item";
    planCards.appendChild(newDiv);
}

for (let i = 0; i < deleteCar.length; i ++) {
    deleteCar[i].addEventListener("click", deleteDiv)

}

addCar.addEventListener("click", createCar)

