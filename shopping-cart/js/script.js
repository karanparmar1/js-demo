
function getById(id) {
  return document.getElementById(id);
}

function isBlank(value) {
  return (value == null ||
    value == undefined ||
    value.length == 0);
}

let itemList = [];
let itemListDiv = getById("itemListDiv");
let errorDiv = getById("errorDiv");

function addItem() {
  let item = getById("itemToAdd").value;
  if (!isBlank(item)) {
    if (itemList.includes(item)) {
      console.log(item + " already exists !");
      alert(item + " already exists !");
    }
    else {
      itemList.push(item);
      console.log("added " + item);
      displayItemList(itemList);
    }
    getById("itemToAdd").value = "";
  }
}

function deleteItem(itemName) {
  itemId = "id-" + itemName;
  getById(itemId).remove();
  itemList.pop(itemName);
  alert(itemName + " removed from Cart.");
  getById("itemCount").innerHTML = itemList.length + ' items in cart';
}
function displayItemList(itemList) {
  itemListDiv.innerHTML = "";
  itemList.forEach(function (item) {
    getById("itemCount").innerHTML = itemList.length + ' items in cart';
    itemId = "id-" + item;
    itemListDiv.innerHTML += '<div class="row itemrow bg-silver py-2 h3 mx-auto" id="' + itemId + '">' +
      '<div class="col text-left">' + item +
      '</div><div class="col-auto"><button class="close" onclick="deleteItem(\'' + item + '\')">x</button></div> </div>';
  });

}
function sortItems() {
  if (itemList.length > 0) { displayItemList(itemList.sort()); errorDiv.innerHTML = ""; }
  else { errorDiv.innerHTML = "Empty Cart ! "; }
}

function searchItem(item) {
  if (!isBlank(item)) {
    errorDiv.innerHTML = '';
    itemListDiv.innerHTML = "";
    if (itemList.includes(item)) {
      console.log(item + " is found.");
      itemId = "id-" + item;
      itemListDiv.innerHTML = '<div class="row itemrow bg-silver py-2 h3 mx-auto" id="' + itemId + '">' +
        '<div class="col text-left" id="itemN">' + item +
        '</div><div class="col-auto"><button class="close" onclick="deleteItem(\'' + item + '\')">x</button></div> </div>';
    }
    else {
      console.log("404 : " + item + " Not Found !");
      errorDiv.innerHTML = "404 : " + item + " Not Found !";
    }
  }
  else {
    errorDiv.innerHTML = "Enter Search Item !";
    displayItemList(itemList);
  }
}



