// CONSTANTS
const buttonProductsById = "inputIDButton";
const buttonProductsByType = "inputTypeButton";
const buttonProductsByPrice = "inputPriceButton";
const similarProductsTable = "similarTable";

const inputID = "inputID";
const inputType = "inputType";
const inputPrice = "inputPrice";

const spanProductID = "productID";
const spanProductPrice = "productPrice";
const spanProductType = "productType";

function createTableHeader(tableId) {
  const tableHeaderRow = document.createElement('tr');
  
  const th1 = document.createElement('th');
  const th2 = document.createElement('th');
  const th3 = document.createElement('th');
  const th4 = document.createElement('th');
  
  th1.appendChild(document.createTextNode('ProductId'));
  th2.appendChild(document.createTextNode('Type'));
  th3.appendChild(document.createTextNode('Price'));
  th4.appendChild(document.createTextNode('Examine'));
  
  tableHeaderRow.appendChild(th1);
  tableHeaderRow.appendChild(th2);
  tableHeaderRow.appendChild(th3);
  tableHeaderRow.appendChild(th4);
  
  document.getElementById(tableId).appendChild(tableHeaderRow);
}

function updateTable(tableId, productArray) {
  const tableBody = document.getElementById(tableId);
  // reset table
  while (tableBody.hasChildNodes()) {
    tableBody.removeChild(tableBody.firstChild);
  }
  
  //create header
  createTableHeader(tableId);
  
  // populate table rows
  for (let i = 0; i < productArray.length; i++) {
    const tr = document.createElement('tr');
    
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('button');
    
    td4.addEventListener('click', function() {
      processSearch(this.parentNode.firstChild.innerHTML);
      scrollTop();
    });
    
    const obj = productArray[i];
    
    td1.appendChild(document.createTextNode(obj.id));
    td2.appendChild(document.createTextNode(obj.type));
    td3.appendChild(document.createTextNode(obj.price));
    td4.appendChild(document.createTextNode("Examine"));
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    
    tableBody.appendChild(tr);
  }
}

function updateExaminedText(product) {
  document.getElementById(spanProductID).textContent = product.id;
  document.getElementById(spanProductPrice).textContent = product.price;
  document.getElementById(spanProductType).textContent = product.type;
}

function getIntersection(array1, array2, searchedId) {
  const samePrice = array1;
  const sameType = array2;
  const similarArray = [];
  samePrice.forEach((obj1) => {
    sameType.forEach((obj2) => {
      if (obj1.id === obj2.id && obj1.id != searchedId) {
        similarArray.push(obj1);
      }
    });
  });
  return similarArray;
}

function processSearch(searchId) {
  api.searchProductById(searchId).then((product) => {
    return Promise.all([api.searchProductsByPrice(product.price, 50), api.searchProductsByType(product.type), product]);
  }).then((products) => {
    const similarArray = getIntersection(products[0], products[1], products[2].id);
    updateExaminedText(products[2]);
    updateTable(similarProductsTable, similarArray);
  }).catch(err => alert(err));
}

function processSearchByType(searchType) {
  api.searchProductsByType(searchType).then((products) => {
    updateTable(similarProductsTable, products);
  }).catch(error => alert(error));
}

function processSearchByPrice(searchPrice) {
  const priceDifference = 50;
  api.searchProductsByPrice(searchPrice, priceDifference).then((products) => {
    updateTable(similarProductsTable, products);
  }).catch(error => alert(error));
}

function clearInputs(inputs) {
  // check for both null and undefined
  if (inputs == null) {
    return;
  }
  if (Array.isArray(inputs)) {
    inputs.forEach((input) => {
      document.getElementById(input).value = "";
    })
  } else {
    document.getElementById(inputs).value = "";
  }
}

function scrollTop() {
  window.scrollTo(0, 0);
}

document.getElementById(buttonProductsById).addEventListener('click', function() {
  processSearch(document.getElementById(inputID).value);
  clearInputs([inputPrice, inputType]);
});

document.getElementById(buttonProductsByType).addEventListener('click', function()  {
  processSearchByType(document.getElementById(inputType).value);
  clearInputs([inputPrice, inputID]);
});

document.getElementById(buttonProductsByPrice).addEventListener('click', function()  {
  processSearchByPrice(document.getElementById(inputPrice).value);
  clearInputs([inputID, inputType]);
});

api.searchAllProducts().then(value => updateTable('allTable', value));