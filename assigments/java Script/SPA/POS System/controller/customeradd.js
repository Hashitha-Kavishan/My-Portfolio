
let customers = [];


document.getElementById('btnAddCustomer').addEventListener('click', function () {
    // Retrieve input values
    const customerNo = document.getElementById('cNo').value;
    const customerName = document.getElementById('cName').value;
    const customerContact = document.getElementById('cContact').value;
    const customerAddress = document.getElementById('cAddress').value;


    const customer = {
        customerNo: customerNo,
        customerName: customerName,
        customerContact: customerContact,
        customerAddress: customerAddress
    };

    customers.push(customer);


    document.getElementById('cNo').value = '';
    document.getElementById('cName').value = '';
    document.getElementById('cContact').value = '';
    document.getElementById('cAddress').value = '';


    updateCustomerTable();
});

function updateCustomerTable() {
    const customerTable = document.getElementById('tblCustomer');
    customerTable.innerHTML = ''; // Clear the table

    customers.forEach(function (customer, index) {
        const row = customerTable.insertRow();

        const cellNo = row.insertCell(0);
        const cellName = row.insertCell(1);
        const cellAddress = row.insertCell(2);
        const cellContact = row.insertCell(3);

        cellNo.innerHTML = customer.customerNo;
        cellName.innerHTML = customer.customerName;
        cellAddress.innerHTML = customer.customerAddress;
        cellContact.innerHTML = customer.customerContact;
    });
}
