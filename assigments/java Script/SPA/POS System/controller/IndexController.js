$("#btnHome").click(function () {
    $("#dashboard").css('display' , 'block');
    $("#items").css('display', 'none');
    $("#customer").css('display', 'none');
    $("#order").css('display', 'none');
});

$("#btnItems").click(function () {
    $("#dashboard").css('display' , 'none');
    $("#items").css('display', 'block');
    $("#customer").css('display', 'none');
    $("#order").css('display', 'none');
});

$("#btnCusotmer").click(function () {
    $("#dashboard").css('display' , 'none');
    $("#items").css('display', 'none');
    $("#customer").css('display', 'block');
    $("#order").css('display', 'none');

});

$("#btnOrder").click(function () {
    $("#dashboard").css('display' , 'none');
    $("#items").css('display', 'none');
    $("#customer").css('display', 'none');
    $("#order").css('display', 'block');
    generateOrderID();
    $('#orderDate').val(generateDate());


});


