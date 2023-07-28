var productArray = [];
var Product = {};
var prodName = document.getElementById("prodName");
var prodPrice = document.getElementById("prodPrice");
var prodDec = document.getElementById("prodDec");
var iconValid = document.querySelector(".icons-valid");
var iconInValid = document.querySelector(".icons-invalid");
iconValid.style.display = "none";
iconInValid.style.display = "none";
document.getElementById("btn-2").style.display = "none";
var cur;
var x = /^[A-Z][0-9a-zA-Z]{1,4}$/;
var flag = true;

prodName.addEventListener("keyup", function () {
  if (checkValidation(prodName.value)) {
    if (prodName.classList.contains("form-control-R")) {
      prodName.classList.remove("form-control-R");
      iconInValid.style.display = "none";
    }
    prodName.classList.add("form-control-G");
    iconValid.style.display = "block";
    iconValid.style.color = "#399a39";
    flag = true;
  } else {
    if (prodName.classList.contains("form-control-G")) {
      prodName.classList.remove("form-control-G");
      iconValid.style.display = "none";
    }
    prodName.classList.add("form-control-R");
    iconInValid.style.display = "block";
    iconInValid.style.color = "#de2626b7";

    flag = false;
  }
});

if (localStorage.getItem("products") != null) {
  productArray = JSON.parse(localStorage.getItem("products"));
  disPlayProduct();
}
function getProductDetails() {
  Product = {
    name: prodName.value,
    price: Number(prodPrice.value),
    dec: prodDec.value,
  };
  if (Product.name == "" || Product.price == 0 || Product.dec == "") {
    alert("Please Enter All Fields");
    return;
  } else {
    productArray.push(Product);
    localStorage.setItem("products", JSON.stringify(productArray));
    disPlayProduct();
    deleteContent();
  }
}
function updateItem(item) {
  prodName.value = productArray[item].name;
  prodPrice.value = productArray[item].price;
  prodDec.value = productArray[item].dec;
  document.getElementById("btn-2").style.display = "inline-block";
  document.getElementById("btn-1").style.display = "none";
  cur = item;
}
function updateProduct() {
  Product = {
    name: prodName.value,
    price: prodPrice.value,
    dec: prodDec.value,
  };
  productArray[cur] = Product;
  localStorage.setItem("products", JSON.stringify(productArray));
  disPlayProduct();
  deleteContent();
  document.getElementById("btn-2").style.display = "none";
  document.getElementById("btn-1").style.display = "inline-block";
}

function disPlayProduct() {
  var content = ``;
  for (var i = 0; i < productArray.length; i++) {
    content += `   <tr>
    <td>${productArray[i].name}</td>
    <td>${productArray[i].price}</td>
    <td>${productArray[i].dec}</td>
  <td> 
  <button class="btn btn-danger " onclick="deleteItem(${i})">Delete-item</button>
  </td>
  <td>
  <button class="btn btn-dark" onclick="updateItem(${i})">update item</button>
  </td>
  </tr>`;
  }
  document.getElementById("demo").innerHTML = content;
}
function deleteContent() {
  prodName.value = "";
  prodPrice.value = "";
  prodDec.value = "";
}
function deleteTable() {
  localStorage.clear();
  productArray = [];
  disPlayProduct();
}
function deleteItem(item) {
  productArray.splice(item, 1);
  localStorage.setItem("products", JSON.stringify(productArray));
  disPlayProduct();
}

function search(text) {
  var content = ``;
  for (var i = 0; i < productArray.length; i++) {
    if (productArray[i].name.toLowerCase().includes(text.toLowerCase())) {
      content += `<tr>
      <td>${productArray[i].name.replace(text, `<span>${text}</span>`)}</td>
      <td>${productArray[i].price}</td>
      <td>${productArray[i].dec}</td>
      <td> 
      <button class="btn btn-danger" onclick="deleteItem(${i})">Delete-item</button>
      </td>
      <td>
      <button class="btn btn-dark" onclick="updateItem(${i})">update item</button>
      </td>
    </tr>`;
    }
  }
  document.getElementById("demo").innerHTML = content;
}

function checkValidation(dataItem) {
  return x.test(dataItem);
}

// function Check1(dataItem) {
//   console.log(dataItem);
//   if (!checkValidation(dataItem)) {
//     flag = false;
//     prodName.classList.remove("form-control-G");
//     prodName.classList.add("form-control-R");
//   } else {
//     flag = true;
//     prodName.classList.remove("form-control-R");
//     prodName.classList.add("tform-conrol-G");
//   }
// }
