
// Place order function

$("#txtitemID").on('click' , function () {
        let typedId = $("#txtitemID").val();
        let item = searchItem(typedId);
        if (item != null) {
            $("#txtitemName").val(item.name);
            $("#txtUnitPrice").val(item.price);
            $("#txtShopQty").val(item.qty);

        } else {
            $("#txtitemName").val("");
            $("#txtUnitPrice").val("");
            $("#txtShopQty").val("");
        }
});


$("#txtCash").on('keyup' , function () {
    $("#btnPurchase").attr('disabled' , false);
    let cash = parseInt($("#txtCash").val());
    let balance = cash - sTotal;
    $("#lblBalance").text("Balance: "+balance+"/=");
})

let total=0;
let sTotal=0;
let balance=0;

$("#btnAddtoCart").click(function () {
    total = 0;
    sTotal = 0;
    let typedId = $("#txtitemID").val();
    let qty = $("#txtQty").val();

    let item = searchItem(typedId);
    if (item != null) {
        let itemName = item.name;
        let price = item.price * qty;

        if (cart.length == 0){
            var cartObject = {
                id: typedId,
                name: itemName,
                qty: qty,
                TotPrice: price
            }
            cart.push(cartObject);
        }else {
            let validCount = 0;
            for (var ct of cart){
                if (ct.id == typedId){
                    ct.qty = parseInt(ct.qty) + parseInt(qty);
                    ct.TotPrice = ct.qty * item.price;
                    validCount = 1;
                    break;
                }
            }
            for (var ct of cart){
                if (validCount == 0){
                    var cartObject = {
                        id: typedId,
                        name: itemName,
                        qty: qty,
                        TotPrice: price
                    }
                    cart.push(cartObject);
                    break;
                }
            }
        }

        alert("Item added to cart !")
        loadAllCart();
        qtyChange();
        totalCal();

    }else {
        alert("Can't find this item !")
    }

});

function totalCal() {
    for (var order of cart){
        total = total + order.TotPrice;
    }

    $("#lblTotal").text("Total: "+total+"/=");
    $("#lblSubTotal").text("SubTotal: "+total+"/=");

}


$("#txtDiscount").on('keyup' , function () {
    let discount = $("#txtDiscount").val();
    sTotal = parseInt(total) - parseInt(total) * parseInt(discount)/100;
    $("#lblSubTotal").text("SubTotal: "+sTotal+"/=");

})


function loadAllCart(){
    $("#tblCart").empty();

    for (var cartItem of cart) {
        var row = `<tr><td>${cartItem.id}</td><td>${cartItem.name}</td><td>${cartItem.qty}</td><td>${cartItem.TotPrice}</td></tr>`;
        $("#tblCart").append(row);
        cartItem.price
    }
}

function qtyChange() {
    let typedId = $("#txtitemID").val();
    let item = searchItem(typedId);
    if (item != null) {
        item.qty = item.qty - $("#txtQty").val();
        loadAllItems();
        $("#txtShopQty").val(item.qty);
    }

}

$("#orderCustomerID").on('click' , function () {
        let typedId = $("#orderCustomerID").val();
        let customer = searchCustomer(typedId);
        if (customer != null) {
            $("#orderCustomerName").val(customer.name);
        } else {
            $("#orderCustomerName").val("");
        }

});

function generateOrderID() {
    if (order.length === 0){
        $('#txtOrderID').val("OD001");
    }else {
        let odCount = order.length + 1;
        if (odCount < 10){
            $('#txtOrderID').val("OD00"+ odCount);
        }else if (odCount < 100){
            $('#txtOrderID').val("OD0"+ odCount);
        }else if (odCount < 100000){
            $('#txtOrderID').val("OD"+ odCount);
        }
    }
}

$("#btnPurchase").click(function () {
    let odID = $("#txtOrderID").val();
    let odQty = 0;
    let odCusName = $("#orderCustomerName").val();
    let odDate = $("#orderDate").val();

    for (var ct of cart){
        odQty = parseInt(odQty) + parseInt(ct.qty);
    }

    var orderObject = {
        oderId: odID,
        orderQty: odQty,
        oderValue: sTotal,
        oderCustomer: odCusName,
        oderDate: odDate
    }

    order.push(orderObject);

    alert("Order Purchase Successfully !")

    loadAllOrderHistory();
    generateOrderID();
    clearText();
    cart = [];
});

function clearText() {
    $("#tblCart").empty();
    $("#txtitemName").val("");
    $("#txtitemID").val("");
    $("#txtQty").val("1");
    $("#orderCustomerName").val("");
    $("#orderCustomerID").val("");
    $("#txtUnitPrice").val("");
    $("#txtDiscount").val("");
    $("#txtCash").val("");
    $("#txtShopQty").val("0")



    $("#lblSubTotal").text("Total: 0.00/=");
    $("#lblTotal").text("SubTotal: 0.00/=");
    $("#lblBalance").text("Balance: 0.00/=");

    $("#btnPurchase").attr('disabled' , true)

}
