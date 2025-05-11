var deleteCar = document.querySelectorAll(".deleteCar")

function selfRemove () {
    jsonData[this.id].status = "cancel"
    if (confirm("delete me?")){
    let newParent = document.querySelector(`.${jsonData[this.id].status}`)
    newParent.appendChild(this)
    this.addEventListener("click", window.pullData)
    this.removeEventListener("click", selfRemove)
    this.removeAttribute("style")
    Array.from(this.children).forEach(element => {
        if (element.querySelector("p")) {
            Array.from(element.children).forEach(subElement => {
            subElement.style.color = "var(--clr-accgrey)"
        })
        }
        element.removeAttribute("style")
    });
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
        children[i].style.backgroundColor = "var(--clr-accred)"
        let insideItems = children[i].children
        Array.from(insideItems).forEach(element => {
            if (element.querySelector("p")) {
                Array.from(element.children).forEach(subElement => {
                    subElement.style.color = "var(--clr-accbrown)"
                })
            }
            element.style.color = "var(--clr-accbrown)"
        });
        children[i].addEventListener("click", selfRemove)
        children[i].removeEventListener("click", window.pullData)


        }
    }
    else { 
        for (let i = 0; i < children.length; i++) {
            children[i].removeEventListener("click", selfRemove)
            children[i].addEventListener("click", window.pullData)
            children[i].removeAttribute("style")
            let insideItems = children[i].children
            Array.from(insideItems).forEach(element => {
                if (element.querySelector("p")) {
                    Array.from(element.children).forEach(subElement => {
                    subElement.style.color = "var(--clr-accgrey)"
                })
                }
                element.removeAttribute("style")
            });
            }
        }
}

for (let i = 0; i < deleteCar.length; i ++) {
    deleteCar[i].addEventListener("click", deleteDiv)

}

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
    while (document.querySelectorAll("#addTarget").length > 1) {
        targetAddParent.removeChild(targetAddParent.lastElementChild)
    }
    if (currentCustomerAmount > 0){
        currentCustomerAmount = 0
        addMore()      
    }
})
let CustomerObjectPrefab ={
         "checkLists": {
            "driver": {},
            "QC": {},
            "document": {},
            "sales": {confirm: false}
             },              
         }

let timerLayout = ["timeTween","arriveTime", "waitTime","departTime"]

var deliveryPrefab = {
        "carType": "none",
        "status": "plan",
        "driver": "none",
        "round": 0,
        "from":"",
        "to": {},
        "start": "00:00",
        "timeRecord": {
         },
        "timeWaitTotal": "N/A",
        "timeTakeTotal": "N/A",
        "timeReturn": "00:00",
        "timeTakeReturn": "00:00",
        "end": "00:00"
    }

var addNewCar = document.querySelector(".addYes")
var addCustomers = document.querySelectorAll("#addTarget") || undefined

var currentCustomerAmount = 0
var targetAddParent = document.querySelector(".addCustomers")

function secondUp() {
    if (this.value.length === 0){
        this.remove()
        addCustomers = document.querySelectorAll("#addTarget")
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
            addCustomers = document.querySelectorAll("#addTarget")
            addMore()
            if (currentCustomerAmount > 0) {
                addCustomers[currentCustomerAmount].addEventListener("input", secondUp)
            }
            
        }
        
    }, {once: true})
    
}

addMore()

addNewCar.addEventListener("click", () => {
    let driverAdd = document.querySelector("#driverAdd") || undefined
    let fromAdd = document.querySelector("#fromAdd") || undefined
    let roundAdd = document.querySelector("#roundAdd") || undefined
    let addCarType = document.querySelector("#carTypeAdd") || undefined
    let addTarget = document.querySelectorAll("#addTarget") || undefined


    if (!driverAdd.value || !fromAdd.value || !roundAdd.value || !addCarType.value || !addTarget[0].value) {
        alert("some element not found")
        return
    }

    // alert("All inputs valid:\n" +
    //     driverAdd.value + ", " +
    //     fromAdd.value + ", " +
    //     roundAdd.value + ", " +
    //     addCarType.value + ", " + 
    //     (addTarget.length - 1)
        
    // );

    for (let i = 0; i < addTarget.length - 1; i++) {
        // console.log(addTarget[i].value)
    }
    
    newPlanDelivery(driverAdd.value, fromAdd.value, roundAdd.value, addCarType.value)

    for (let j = 0; j < addTarget.length -1; j++) {
        jsonData[jsonDataKeys[jsonKeysAmount - 1]]["to"][addTarget[j].value] = CustomerObjectPrefab
    }
    let route = document.querySelector(`#${[jsonDataKeys[jsonKeysAmount - 1]]}`).getElementsByTagName("p")
    let customers = jsonData[jsonDataKeys[jsonKeysAmount - 1]]["to"]
    let allCustomer = Object.keys(customers)

    for (let k = 0; k < allCustomer.length; k++) {
    route[0].textContent = jsonData[jsonDataKeys[jsonKeysAmount - 1]]["from"]
    route[2].textContent = allCustomer.length + "   " + "customer"
    }

        driverAdd.value = "" 
        fromAdd.value = "" 
        roundAdd.value = ""
        addCarType.value = "" 
        addTarget[0].value = ""

    while (document.querySelectorAll("#addTarget").length > 1) {
        targetAddParent.removeChild(targetAddParent.lastElementChild)
    }

    currentCustomerAmount = 0
    addMore()

    modalPage.close()
    modalPage.style.display = "none"
})

function newPlanDelivery (person, where, round, vehicle) {
    let first = structuredClone(deliveryPrefab)
    first["to"] = {}
    first["driver"] = person
    first["carType"] = vehicle
    first["round"] = round
    first["from"] = where
    jsonData["delivery" + (jsonDataKeys.length + 1)] = first
    jsonKeysAmount += 1
    jsonDataKeys = Object.keys(jsonData)
    let parent = document.querySelector(".plan")
    let prefab = document.querySelector(".items")
    let newDiv = prefab.cloneNode(true)
    newDiv.id = "delivery" + (jsonDataKeys.length)
    newDiv.classList.remove("hide")
    newDiv.querySelector(".driver").textContent = jsonData[newDiv.id].driver + jsonData[newDiv.id].round
    parent.appendChild(newDiv)

    newDiv.addEventListener("click", window.pullData)

}