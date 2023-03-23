function selector(className) {
    return (
        document.querySelector("." + className)
    )
}
///get element by class name 
//  begin  // 
let inputs = selector("add-products");
let headTable = selector("head-table");
let name = selector("name");
let price = selector("price");
let taxes = selector("taxes");
let ads = selector("ads");
let discount = selector("discount");
let category = selector("category");
let number_add = selector("number_add")
let Total = selector("total");
let creat = selector("creat")
let deleteAll = selector("delete-all");
let search = selector("search-input")
let showall = selector("showall");
let image = selector("img")
let indexelement
//  end    //

prodprice = inputs.children[1];
price_Child = prodprice.children;
let total = 0;
// calcul Total 
for (let i = 0; i < 4; i++) {
    price_Child[i].onkeyup = function () {
        total = 0;
        if (price_Child[0].value != "") {
            for (let i = 0; i < 4; i++) {
                total = total + +price_Child[i].value
            }
            total = total - +price_Child[3].value
            price_Child[4].innerHTML = total
            price_Child[4].style.background = "green"
        }
        else {
            price_Child[4].style.background = "red"
            price_Child[4].innerHTML = "Total"
        }
    }
}


let products = [];
if (localStorage.product != null) {
    products = JSON.parse(localStorage.product)
}
else {
    products = []
}


creat.onclick = function () {
    let product = {
        title: name.value,
        price: price.value,
        ads: ads.value,
        discount: discount.value,
        total: Total.innerHTML,
        category: category.value,
    }
    if (creat.innerHTML == "Creat") {
        products.push(product)
        window.scrollTo(0, document.body.scrollHeight)
    }
    else {
        headTable.children[indexelement].scrollIntoView({ behavior: 'smooth' });
        products[indexelement] = product
        creat.innerHTML = "Creat"
    }

    localStorage.setItem("product", JSON.stringify(products)); // add to local storage
    // clear inputs //
    cleardata()
    // show data after creat //
    showdata()
}

function check_input() {
    let check = true
    for (let i = 0; i < 5; i++) {
        if (price_Child[i].value == "") {
            check = false
        }
    }
    return (check)
}

function cleardata() {
    name.value = "";
    price.value = "";
    taxes.value = "";
    discount.value = "";
    total.innerHTML = "";
    category.value = '';
}

function showdata() {
    showbutton()
    headTable.innerHTML = ""
    for (let i = 0; i < products.length; i++) {
        headTable.innerHTML += `
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button class="update" onclick="update(${i})">update</button></td>
        <td> <button class="delete" onclick="deleteData(${i})"> DELETE</button></td>
    </tr>
    `
    }
    search.value = ""
    deleteAll.innerHTML = " Delete All( " + products.length + " ) "
}

// insitialisation //
showdata()
showbutton()
function showbutton() {
    if (products.length > 0) {
        deleteAll.style.display = "block"
    }
    else {
        deleteAll.style.display = "none"
    }
}
///// delete /////
// delete all //
deleteAll.onclick = function () {
    products = [];
    localStorage.removeItem("product")
    showdata();
    showbutton()
}

// delete one product //  
function deleteData(element) {
    setTimeout(function () {
        products.splice(element, 1)
        localStorage.product = JSON.stringify(products)
        showdata()
    }, 500)

}

///// update /////
function update(element) {
    name.value = products[element].title
    price.value = products[element].price
    taxes.value = products[element].taxes
    ads.value = products[element].ads
    total.innerHTML = products[element].total
    category.innerHTML = products[element].category
    discount.value = products[element].discount
    creat.innerHTML = "Update"
    window.scrollTo(0, 0)
    indexelement = element;
}

//// searching ////
function searching(typesearching) {
    let notfound = true;

    for (let i = 0; i < products.length; i++) {
        if (!(products[i][typesearching].includes(search.value))) {
            headTable.children[i].style.display = "none"
        }
        else {
            notfound = false
        }
    }
    if (notfound === true) {
        headTable.innerHTML = `<button class="showall" onclick="showdata()">showall</button>`
    }
    else {
        headTable.innerHTML += `<button class="showall" onclick="showdata()">showall</button>`
    }
}





