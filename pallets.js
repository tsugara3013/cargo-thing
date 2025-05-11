function palletData() {
    console.log(this.textContent)
    console.log(GcurrentPage)
    console.log(currentDelivery)
    let pallets = jsonData[currentDelivery]["to"]
    let palletsKeys = Object.keys(pallets)
    console.log(jsonData[currentDelivery]["to"][palletsKeys[GcurrentPage]][this.textContent])
}