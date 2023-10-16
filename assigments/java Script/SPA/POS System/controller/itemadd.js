
const itemsArray = [];


function updateItemTable() {
    const tableBody = document.getElementById("tblItems");

    tableBody.innerHTML = "";


    itemsArray.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.itemName}</td>
      <td>${item.qty}</td>
      <td>${item.price}</td>
    `;
    });
}


document.getElementById("btnAddItems").addEventListener("click", function() {

    const itemNo = document.getElementById("item-no").value;
    const itemName = document.getElementById("item-name").value;
    const qty = document.getElementById("qty").value;
    const price = document.getElementById("price").value;


    const item = {
        itemNo,
        itemName,
        qty,
        price,
    };


    itemsArray.push(item);


    updateItemTable();

    // Clear input fields
    document.getElementById("item-no").value = "";
    document.getElementById("item-name").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("price").value = "";
});


