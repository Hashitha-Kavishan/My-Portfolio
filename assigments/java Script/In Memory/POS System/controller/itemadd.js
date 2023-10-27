$("#btnAddItems").click(function () {
    let itemID = $("#item-no").val();
    let itemName = $("#item-name").val();
    let itemQty = $("#qty").val();
    let itemPrice = $("#price").val();

    let item = searchCustomer(itemID);
    if (item != null) {
        alert("Item already Exist!");
    }else {
        var itemObject = {
            id: itemID,
            name: itemName,
            qty: itemQty,
            price: itemPrice
        }

        items.push(itemObject);
        loadAllItems();
        addItemstoManage();
        alert("Item added Successfully!")
        setItemsTextfieldValues("", "", "", "");
    }
});

function addItem() {
    let itemID = $("#item-no").val();
    let itemName = $("#item-name").val();
    let itemQty = $("#qty").val();
    let itemPrice = $("#price").val();

    let item = searchCustomer(itemID);
    if (item != null) {
        alert("Item already Exist!");
    }else {
        var itemObject = {
            id: itemID,
            name: itemName,
            qty: itemQty,
            price: itemPrice
        }

        items.push(itemObject);
        loadAllItems();
        addItemstoManage();
        alert("Item added Successfully!")
        setItemsTextfieldValues("", "", "", "");
    }
}

function addItemstoManage(){
    $("#deleteItemOptions").empty();
    $("#updateItemOption").empty();
    for (let item of items) {
        var data = "<option>"+item.id+"</option>"
        $("#deleteItemOptions").append(data);
        $("#updateItemOption").append(data);
    }
}

function setItemsTextfieldValues(id, name, qty, price){
    $("#item-name").val(id);
    $("#item-name").val(name);
    $("#qty").val(qty);
    $("#price").val(price);
}

function loadAllItems() {
    $("#tblItems").empty();
    $("#uitem-no").empty();
    $("#ditem-no").empty();
    $("#txtitemID").empty();
    for (var item of items) {
        var row = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td></tr>`;
        var itemD = `<option>${item.id}</option>>`
        $("#tblItems").append(row);
        $("#uitem-no").append(itemD);
        $("#ditem-no").append(itemD);
        $("#txtitemID").append(itemD);
    }
    itemsCard();
}

// Update itmes
$("#uitem-no").on('click' , function () {
    let typedId = $("#uitem-no").val();
    let item = searchItem(typedId);
    if (item != null) {
        setUpItemTextfieldValues(item.id, item.name, item.qty, item.price);
    }else {
        $("#uitem-name").val("");
        $("#uqty").val("");
        $("#uprice").val("");
    }
});

$("#btnItemUpdate").click(function () {
    let itemID = $("#uitem-no").val();
    let response = updateItem(itemID);
    if (response) {
        alert("Item Updated Successfully");
        setUpItemTextfieldValues("", "", "", "");
    } else {
        alert("Check Item No..!");

    }
});

function setUpItemTextfieldValues(id, name, qty, price) {
    $("#uitem-no").val(id);
    $("#uitem-name").val(name);
    $("#uqty").val(qty);
    $("#uprice").val(price);
}

function updateItem(itemID) {
    let item = searchItem(itemID);
    if (item != null) {
        item.id = $("#uitem-no").val();
        item.name = $("#uitem-name").val();
        item.qty = $("#uqty").val();
        item.price = $("#uprice").val();
        loadAllItems();
        return true;
    } else {
        return false;
    }

}

function searchItem(itemID) {
    for (let item of items) {
        if (item.id == itemID) {
            return item;
        }
    }
    return null;
}

// Delete Customer
$("#ditem-no").on('click' , function (){
    let typedId = $("#ditem-no").val();
    let item = searchItem(typedId);
    if (item != null) {
        $("#ditem-name").val(item.name)
    }else {
        $("#ditem-name").val("")
    }
});

$("#btnItemDelete").click(function () {
    let deleteID = $("#ditem-no").val();
    let deleteName = $("#ditem-name").val();


    if (deleteItem(deleteID)) {
        let option = confirm("Do you really want to delete " + deleteName);
        if (option) {
            alert(deleteName + " Successfully Deleted..");
            $("#ditem-no").val(" ");
            $("#ditem-name").val(" ");
        } else {
            alert("Press Enter after insert Item No to search Item before delete!");
        }
    }
});

function deleteItem(itemID) {
    let item = searchItem(itemID);
    if (item != null) {

        let indexNumber = items.indexOf(item);
        items.splice(indexNumber, 1);
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

// Item Validation

const itemIDRegEx = /^(I)[0-9]{3}$/;
const itemNameRegEx = /^[A-z ]{2,20}$/;
const itemQrtRegEx = /^[0-9]{1,}$/;
const itemPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let itemValidations = [];
itemValidations.push({
    reg: itemIDRegEx,
    field: $('#item-no'),
    error: 'Item ID Pattern is Wrong : I000',
    cato: "add"
});
itemValidations.push({
    reg: itemNameRegEx,
    field: $('#item-name'),
    error: 'Item Name Pattern is Wrong : A-z 5-20',
    cato: "add"
});
itemValidations.push({
    reg: itemQrtRegEx,
    field: $('#qty'),
    error: 'Item Quantity Pattern is Wrong : 0-9',
    cato: "add"
});
itemValidations.push({
    reg: itemPriceRegEx,
    field: $('#price'),
    error: 'Item Price Pattern is Wrong : 100 or 100.00',
    cato: "add"
});
itemValidations.push({
    reg: itemIDRegEx,
    field: $('#uitem-no'),
    error: 'Item ID Pattern is Wrong : I000',
    cato: "update"
});
itemValidations.push({
    reg: itemNameRegEx,
    field: $('#uitem-name'),
    error: 'Item Name Pattern is Wrong : A-z 5-20',
    cato: "update"
});
itemValidations.push({
    reg: itemQrtRegEx,
    field: $('#uqty'),
    error: 'Item Quantity Pattern is Wrong : 0-9',
    cato: "update"
});
itemValidations.push({
    reg: itemPriceRegEx,
    field: $('#uprice'),
    error: 'Item Price Pattern is Wrong : 100 or 100.00',
    cato: "update"
});

function defaultAllTextItem() {
    for (let validation of itemValidations) {
        validation.field.css("border", "1px solid #ced4da");
        validation.field.parent().children('span').text("");
    }

}

function defaultTextItem(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function checkItemInput(regex, txtField) {
    let inputVal = txtField.val();
    return regex.test(inputVal) ? true : false;
}

function btnStateItem(txtType, stat) {
    if (txtType == "add") {
        if (stat == "success") {
            $('#btnAddItems').attr('disabled', false);
        } else if (stat == "fail") {
            $('#btnAddItems').attr('disabled', true);
        }
    } else if (txtType == "update") {
        if (stat == "success") {
            $('#btnItemUpdate').attr('disabled', false);
        } else if (stat == "fail") {
            $('#btnItemUpdate').attr('disabled', true);
        }
    }
}

function checkItemValidity() {
    for (let validation of itemValidations) {
        if (checkItemInput(validation.reg, validation.field)) {
            if (validation.field.val().length <= 0) {
                defaultTextItem(validation.field, "");
            } else {
                validation.field.css('border', '2px solid green');
                validation.field.parent().children('span').text("");
                btnStateItem(validation.cato, "success");
            }
        } else {
            if (validation.field.val().length <= 0) {
                defaultTextItem(validation.field, "");
            } else {
                validation.field.css('border', '2px solid red');
                validation.field.parent().children('span').text(validation.error);
                btnStateItem(validation.cato, "fail");
            }
        }
    }
}

$("#item-no,#item-name,#qty,#price,#uitem-no,#uitem-name,#uqty,#uprice").on('keyup', function (event) {
    checkItemValidity();
});

$("#item-no,#item-name,#qty,#price,#uitem-no,#uitem-name,#uqty,#uprice").on('keydown', function (event) {
    if (event.code == "Tab"){
        event.preventDefault();
    }
});

$("#item-no").on('keydown', function (event) {
    if (event.key == "Enter"){
        $("#item-name").focus();
    }
});

$("#item-name").on('keydown', function (event) {
    if (event.key == "Enter"){
        $("#qty").focus();
    }
});

$("#qty").on('keydown', function (event) {
    if (event.key == "Enter"){
        $("#price").focus();
    }
});

$("#price").on('keydown', function (event) {
    if (event.key == "Enter"){
        let res = confirm("Do you want to add this Item.?");
        if (res){
            addItem();
            $("#item-no").focus();
        }else {
            $("#price").focus();
        }
    }
});