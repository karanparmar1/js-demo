function getById(id) {
  return document.getElementById(id);
}

function setItem(itemId, oldValue) {
  console.log("setItem:" + itemId + " " + oldValue);
  var item = getById(itemId);
  itemList[itemList.findIndex(function(value){return value==oldValue;})] = item.value;
}

function isBlank(value) {
  return !value?.trim();
}

let itemList = [];
let itemListDiv = getById("itemListDiv");
let errorDiv = getById("errorDiv");
let itemToAdd = getById("itemToAdd");
let popupDiv = getById("confirmation-popup");
itemToAdd.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) { addItem(); }
});

function handleEnter(e) { if (e.keyCode === 13 && !isBlank(e.target.value)) { setItem(e.target.id); } }

function setItemDiv(item, itemId) {
  //itemId = ("id-" + item).replace(new RegExp("\\s+", "g"), '-');
  return '<div class="row itemrow bg-silver py-2 my-1 mx-auto" id="' + itemId + '"  >' +
    '<div class="col text-left h3 ">' +
    '<input type="text" class="itemText input" id="txt-' + itemId + '" value="' + item + '" readonly="true" onkeydown="handleEnter(event)" onchange="editItem(\'txt-' + itemId + '\')" ondblclick="editItem(\'txt-' + itemId + '\');" onblur="setItem(\'txt-' + itemId + '\',this.value);" autofocus /></div>' +
    '<div class="col-auto btn-action">' +
    '<button class="btn btn-warning" id="edit-'+itemId+'" onclick="editItem(\'txt-' + itemId + '\');" >Edit</button>' +
    '<button class="btn btn-danger" onclick="confirmDelete(\'' + item + '\',\'' + itemId + '\');" >x</button>' +
    '</div></div>';
}

function itemHover(itemId) {
  getById(itemId).style.background = "red";
}
function displayItemList(itemList) {
  itemListDiv.innerHTML = "";
  let i = 0;
  itemList.forEach(function (item) {

    getById("itemCount").innerHTML = itemList.length + ' items in cart';
    itemId = ("item-" + i)
    itemListDiv.innerHTML += setItemDiv(item, itemId);
    ++i;
  });
}

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
function deleteItem(itemName, confirm, itemId) {
  console.log(itemName + "from del");
  //itemId = ("id-" + itemName).replace(new RegExp("\\s+", "g"), '-');
  if (confirm) {
    getById(itemId).remove();
    itemList.splice(itemList.indexOf(itemName), 1);
    $(".modal").modal("hide");
    console.log(itemName + " removed from Cart.");
  }
  else {
    $(".modal").modal("hide");
  }
  getById("itemCount").innerHTML = itemList.length + ' items in cart';
}

function confirmDelete(itemName, itemId) {
  console.log(itemName + "from confirm");
  popupDiv.innerHTML = ' <div class="modal-body">   <div class="h1">   <span id="itemInModal">Delete ' + itemName + ' ? </span>   </div>  </div>' +
    '<div class="modal-footer">    <button class="btn btn-primary" data-dismiss="modal" onclick="deleteItem(\'' + itemName + '\',true,\'' + itemId + '\')">Okay</button>' +
    '<button class="btn btn-danger" data-dismiss="modal"> Cancel  </button> </div>';
  $(".modal").modal("show");
}

function sortItems() {
  if (itemList.length > 0) {
    displayItemList(itemList.sort());
    errorDiv.innerHTML = "";
  }
  else { errorDiv.innerHTML = "Empty Cart ! "; }
}

function searchItem(item) {
  let found = false;
  if (!isBlank(item)) {
    errorDiv.innerHTML = '';
    itemListDiv.innerHTML = "";
    for (let i = 0; i < itemList.length; i++) {
      if ((itemList[i].search(new RegExp(item, "i"))) >= 0) {
        found = true;
        console.log(itemList[i] + " is found.");
        errorDiv.innerHTML = "";
        itemListDiv.innerHTML += setItemDiv(itemList[i], "item-" + i);
      }
      if (!found) {
        console.log(item + " Not Found !");
        errorDiv.innerHTML = item + " Not Found !";
      }
    }
  }
  else {
    errorDiv.innerHTML = "Enter Search Item !";
    displayItemList(itemList);
  }
  getById("itemToSearch").onblur = function () { errorDiv.innerHTML = ""; };
}

function editItem(itemId) {
  document.querySelectorAll(".input").forEach(el => el.classList.add("itemText"));
  console.log("itemID:"+itemId);
  
  var item = getById(itemId);
  oldValue=item.value;
  item.classList.remove("itemText");
  item.readOnly = false;
  setItem(itemId, oldValue);
  console.log("editItem:" + itemId + " " + oldValue)
}
