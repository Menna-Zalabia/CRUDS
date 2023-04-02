let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let tbody = document.getElementById("tbody");
let deleteAll = document.getElementById("deleteAll");
///////////
let mood = "create";
let tmp;
//get total
function totalPrice() {
  if (price.value != "") {
    let res = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = res;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#950101";
  }
}

//create data
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "" && price.value != "" && category.value != "") {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
        
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "CREATE";
      count.style.display = "block";
    }
    clearData();
  }
  //save localstorage
  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
};
// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//showData
function showData() {
  totalPrice();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `<tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">UPDATE</button></td>
    <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
    </tr>`;
  }
  tbody.innerHTML = table;
  if (dataPro.length > 0) {
    deleteAll.innerHTML = `<button onclick="delAll()">Delete All (${dataPro.length})</button>`;
  } else {
    deleteAll.innerHTML = " ";
  }
}
showData();
function delAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
//delete
function deleteData(i) {
  console.log(i);
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

//update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  totalPrice();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "UPDATE";
  scroll({
    top: 0,
    behavior: "smooth",
  });
  mood = "update";
  tmp = i;
}
//search
function searchData(id) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (id == "searchTitle") {
      if (dataPro[i].title.includes(search.value.toLowerCase())) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">UPDATE</button></td>
        <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
        </tr>`;
      }
    } else {
      if (dataPro[i].category.includes(search.value.toLowerCase())) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">UPDATE</button></td>
        <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
        </tr>`;
      }
    }
  }
  tbody.innerHTML = table;
  search.value='';
}
