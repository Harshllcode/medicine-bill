let medicineDetails = JSON.parse(localStorage.getItem('Product')) || [];
let html = '';
displayItems();

function addList() {
    let rate = document.querySelector('.rate').value;
    let medicinename = document.querySelector('.medicineName').value;
    let packing = document.querySelector('.packing').value;
    let batchno = document.querySelector('.batchno').value;
    let peti = document.querySelector('.peti').value;
    let boxes = document.querySelector('.boxes-tube').value;

    if (!rate || !medicinename || !packing || !batchno || !peti || !boxes) {
        alert("⚠️ Please fill all fields before adding!");
        return; // stop function
    }
    let price = Number(rate);
    let qnt = calc_quantity();

    medicineDetails.push({
        Productname: medicinename.toString().toUpperCase(),
        batchno: batchno.toString().toUpperCase(),
        packing: packing.toString().replaceAll(' ', 'x'),
        Quantity: qnt,
        rate: price,
        amt: qnt * price
    })
    resetInput();
    saveItems();
    displayItems();
    show_sum();
}

function calc_quantity() {
    let packing = Number(document.querySelector('.packing').value.split(" ")[0]);
    let peti = document.querySelector('.peti').value;
    let boxes = document.querySelector('.boxes-tube').value;
    let Qnt = (packing * peti) + Number(boxes);
    return Number(Qnt);
}

function resetInput() {
    document.querySelector('.rate').value = "";
    document.querySelector('.medicineName').value = "";
    document.querySelector('.packing').value = "";
    document.querySelector('.batchno').value = "";
    document.querySelector('.peti').value = "";
    document.querySelector('.boxes-tube').value = "";
}

function saveItems() {
    localStorage.setItem('Product', JSON.stringify(medicineDetails));
}

function resetBill() {
    localStorage.clear();
    medicineDetails = [];
    displayItems();
    show_sum();
}

function displayItems() {
    let body1 = document.querySelector('.bill-body');
    body1.innerHTML = "";
    medicineDetails.forEach((items, i) => {
        let row = `<div class="bill-row">
        <span>${i + 1}</span>
        <span>${items.Productname}</span>
        <span>${items.batchno}</span>
        <span>${items.packing}</span>
        <span>${items.Quantity}</span>
        <span>${items.rate}</span>
        <span>${items.amt}</span>
    </div>`;

        body1.insertAdjacentHTML('beforeend', row)
    });

}
function show_sum() {
    let total = 0;    
    medicineDetails.forEach((items) => {
        total += items.amt;
    });

    // pehle purana total hatao (agar hai)
    let oldTotal = document.querySelector('.sum');
    if (oldTotal) oldTotal.remove();

    // container ke end me naya total dikhayo
    let sum = document.querySelector('.container');
    sum.insertAdjacentHTML('beforeend', `<h2 class="sum">The total is: ₹${total}</h2>`);
}

function delete_row_last(){
     if (medicineDetails.length === 0) {
        alert("⚠️ No items to delete!");
        return;
    }
    medicineDetails.pop();
    localStorage.setItem('Product', JSON.stringify(medicineDetails));

    displayItems();
    show_sum(); // 👈 total bhi refresh hoga
}