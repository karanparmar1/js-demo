function getById(id) {
  return document.getElementById(id);
}

function isBlank(value) {
  return (value.trim() == null ||
    value.trim() == undefined ||
    value.trim() == ' ' ||
    value.trim().length == 0);
}

let itemList = [];
let itemListDiv = getById("itemListDiv");
let errorDiv = getById("errorDiv");
let itemToAdd = getById("itemToAdd");
let popupDiv = getById("confirmation-popup");
itemToAdd.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) { addItem(); }
});

function displayItemList(itemList) {
  itemListDiv.innerHTML = "";
  itemList.forEach(function (item) {
    getById("itemCount").innerHTML = itemList.length + ' items in cart';
    itemId = ("id-" + item).replace(new RegExp("\\s+", "g"), '-');
    itemListDiv.innerHTML += '<div class="row itemrow bg-silver py-2 h3 mx-auto" id="' + itemId + '">' +
      '<div class="col text-left">' + item +
      '</div><div class="col-auto"><button class="text-danger h3 close" onclick="confirmDelete(\'' + item + '\')">x</button> </div> </div>';
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
function deleteItem(itemName, confirm) {
  console.log(itemName + "from del");
  itemId = ("id-" + itemName).replace(new RegExp("\\s+", "g"), '-');
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

function confirmDelete(itemName) {
  console.log(itemName + "from confirm");
  popupDiv.innerHTML = ' <div class="modal-body">   <div class="h1">   <span id="itemInModal">Delete ' + itemName + ' ? </span>   </div>  </div>' +
    '<div class="modal-footer">    <button class="btn btn-primary" data-dismiss="modal" onclick="deleteItem(\'' + itemName + '\',true)">Okay</button>' +
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
        itemId = ("id-" + itemList[i]).replace(new RegExp("\\s+", "g"), '-');
        errorDiv.innerHTML = "";
        itemListDiv.innerHTML += '<div class="row itemrow bg-silver py-2 h3 mx-auto" id="' + itemId + '">' +
          '<div class="col text-left" >' + itemList[i] +
          '</div><div class="col-auto"><button class="text-danger h3 close" onclick="confirmDelete(\'' + itemList[i] + '\')">x</button></div> </div>';
      }
      if (!found) {
        console.log("404 : " + item + " Not Found !");
        errorDiv.innerHTML =   item + " Not Found !";
      }
    }
  }
  else {
    errorDiv.innerHTML = "Enter Search Item !";
    displayItemList(itemList);
  }
}
