var categories = [];
var items = [];
var showItems = [];
// var categories2 = ["Gujrati","Pubjabi"];

function showAll(){
    console.log("categories : ");
    console.log(categories);
    console.log("items : ");
    console.log(items);
    console.log("showItems : ");
    console.log(showItems);
}

function addItem(){
    var iN = $('#itemname');
    var iP = $('#item_price');
    var iC = $('#item_cat_i');
    var iD = $('#description_i');

    var itemName = $('#itemname').val();
    var itemPrice = $('#item_price').val();
    var itemCat = $('#item_cat_i').val();
    var itemDes = $('#description_i').val();
    itemName = itemName.replace(" ","_");
    itemCat = itemCat.replace(" ","_");
    if(itemName===itemCat) {
        // alert("Item name and category must be different.");
        warningAlert("Item name and category must be different.");
        iC.val("");
    }else {
        addItemToCategory(itemName,itemCat);
        iN.val("");
        iP.val("");
        iC.val("");
        iD.val("");
        // alert(itemName.replace("_"," ")+", added successfully to "+itemCat.replace("_"," ")+", category.");
        successAlert(itemName.replace("_"," ")+", added successfully to "+itemCat.replace("_"," ")+", category.");
        var item = new Object();
        item.name = itemName;
        item.price = itemPrice;
        item.cat = itemCat;
        item.des = itemDes;
        items.push(item);
        createShowItem(item);
        // console.log(items);
        return true;
    }
}

function checkIfSame(name){
    var item = getItem(name);
    var tprice = document.getElementById(name+"price").innerText.trim();
    var tdes = document.getElementById(name+"des").innerText.trim();
    if(tprice==item.price && tdes==item.des) {
        warningAlert("Details are same as previous. No change to details.");
        return true;
    }else {
        return false;
    }
}

function getPriceBack(name) {
    var item = getItem(name);
    document.getElementById(name+"price").innerText = item.price;
}

function saveChanges(name) {
    var item = getItem(name);
    item.price = document.getElementById(name+"price").innerText.trim();
    item.des = document.getElementById(name+"des").innerText.trim();
    // console.log(showItems);
    document.getElementById(name+"price").innerText = item.price;
    document.getElementById(name+"des").innerText = item.des;
    // return true;
    // console.log(items);
}

function getPreviousValues(name) {
    var item = getItem(name);
    document.getElementById(name+"price").innerText =item.price;
    document.getElementById(name+"des").innerText=item.des;
}

function getItem(name){
    for(var i=0;i<items.length;i++) {
        // console.log(name+":"+items[i].name);
        if(items[i].name===name) {
            // console.log("equals");
            return items[i];
        }
    }
}

function createShowItem(item){
    var nameSpan = getNameSpan(item.name);
    var priceSpan = getPriceSpan(item.price,item.name);
    priceSpan.setAttribute("class","iprice_admin");
    var catSpan = getCatSpan(item.cat,item.name);
    var desSpan = getDesSpan(item.des,item.name);
    var closeBtn = getCloseItemBtn(item.name);
    var editBtn = getEditItemBtn(item.name);
    var div = document.createElement("div");
    div.setAttribute("class","showitem");
    div.setAttribute("id",item.name.replace(" ","_"));
    div.appendChild(nameSpan);
    div.appendChild(priceSpan);
    div.appendChild(catSpan);
    div.appendChild(desSpan);
    div.appendChild(closeBtn);
    div.appendChild(editBtn);
    div.style.display = "none";
    document.getElementById('show').appendChild(div);
    showItems.push(div);
}


function addItemToCategory(name,cat) {
    var isExist = isCatExist(cat.toLowerCase());
    if(isExist) {
        var li = createItemLi(name);
        document.getElementById(cat.toLowerCase()).appendChild(li);
        return true;
    }
    else {
        createNewCategory(cat);
        var li = createItemLi(name);
        document.getElementById(cat.toLowerCase()).appendChild(li);
        return true;
    }
}

function getEditItemBtn(name){
    name = name.replace(" ","_");
    var button = document.createElement("button");
    button.setAttribute("type","submit");
    button.setAttribute("id",name+"edit");
    button.setAttribute("class","edititembtn");
    button.setAttribute("onclick","editItem('"+name+"')");
    var text = document.createTextNode("Edit Details");
    button.appendChild(text);
    button.style.width="max-content";
    button.style.marginLeft="10px";

    return button;
}

function getCloseItemBtn(name){
    name = name.replace(" ","_");
    var button = document.createElement("button");
    button.setAttribute("type","submit");
    button.setAttribute("onclick","closeItem('"+name+"')");
    var text = document.createTextNode("Close");
    button.appendChild(text);

    return button;
}

function getDesSpan(des,name) {

    var span = document.createElement("span");
    span.setAttribute("class","data ides");
    var h5 = document.createElement("h5");
    var hText = document.createTextNode("Item Description");
    h5.appendChild(hText);
    var p = document.createElement("p");
    p.setAttribute("id",name+"des");
    var text = document.createTextNode(des);
    p.appendChild(text);
    span.appendChild(h5);
    span.appendChild(p);

    return span;
}

function getCatSpan(cat,name) {

    var span = document.createElement("span");
    span.setAttribute("class","data icat");
    var h5 = document.createElement("h5");
    var hText = document.createTextNode("Item category");
    h5.appendChild(hText);
    var p = document.createElement("p");
    p.setAttribute("id",name+"cat");
    var text = document.createTextNode(cat.replace("_"," "));
    p.appendChild(text);
    span.appendChild(h5);
    span.appendChild(p);

    return span;
}

function getPriceSpan(price,name) {

    var span = document.createElement("span");
    span.setAttribute("class","data iprice");
    var h5 = document.createElement("h5");
    var hText = document.createTextNode("Item Price");
    h5.appendChild(hText);
    var p = document.createElement("p");
    p.setAttribute("id",name+"price");
    var text = document.createTextNode(price);
    p.appendChild(text);
    span.appendChild(h5);
    span.appendChild(p);

    return span;
}

function getNameSpan(name){

    var span = document.createElement("span");
    span.setAttribute("class","data iname");
    var h5 = document.createElement("h5");
    var hText = document.createTextNode("Item Name");
    h5.appendChild(hText);
    var p = document.createElement("p");
    p.setAttribute("id",name+"name");
    var text = document.createTextNode(name.replace("_"," "));
    p.appendChild(text);
    span.appendChild(h5);
    span.appendChild(p);
    
    return span;
}



//FOR CATEGORIES
function addCategory(){
        var cn = $('#item_cat_c');
        catName = $('#item_cat_c').val();
        var cats_allcats = $('.cats>.allcats');
        catName = catName.replace(" ","_");
    
        if(catName!== undefined && catName!==null && catName!== "") {
            if(!isCatExist(catName.toLowerCase())) {
                var li = document.createElement("li");
                var headline = getCatHeading(catName);
                catName = catName.toLowerCase();
                categories.push(catName);
                li.appendChild(headline);
                var ul = createUl(catName);
                li.appendChild(ul);
                // li.appendChild(createUl);
                cats_allcats.append(li);
                // alert(catName.replace("_"," ")+", category added successfully.");
                successAlert("category "+catName.replace("_"," ")+" added successfully.");
                // console.log(categories);
                cn.val("");
                // addCat(catName);
                return true;
            }else {
                warningAlert(catName.replace("_"," ")+" category is already exist");
                cn.val("");
                return false;
            }
        }
}

function createNewCategory(name) {
    var li = document.createElement("li");
    var headline = getCatHeading(name);
    var cats_allcats = $('.cats>.allcats');
    name = name.toLowerCase();
    categories.push(name);
    li.appendChild(headline);
    var ul = createUl(name);
    li.appendChild(ul);
  // li.appendChild(createUl);
    cats_allcats.append(li);
    // successAlert("category "+name.replace("_"," ")+" added successfully.");
    // console.log(categories);
    // addCat(name);
}

function isCatExist(name) {
    var len = categories.length;
    var isExist = false; 
    if(len!=0) {
        for(var i=0;i<len;i++) {
            if(categories[i]===name) {
                isExist=true;
            }
        }
    }
    return isExist;
}


function getCatHeading(text){
    var className = text.toLowerCase();
    // console.log(className);
    var h3 = document.createElement("h3");
    h3.setAttribute("class","opencat");
    h3.setAttribute("onclick","opencat('"+className+"')");
    var h3Text = document.createTextNode(text.replace("_"," "));
    h3.appendChild(h3Text);
    return h3;
}

function createUl(name){
    var ul = document.createElement("ul");
    ul.setAttribute("class","tcat "+name);
    ul.setAttribute("id",name);
    // ul.setAttribute("class",name);
    return ul;
}

function createItemLi(name){
    var button = document.createElement("button");
    button.setAttribute("onclick","showItem('"+name+"')");
    var text = document.createTextNode(name.replace("_"," "));
    button.appendChild(text);
    var li = document.createElement("li");
    li.setAttribute("id",name+"item");
    li.appendChild(button);
    return li;
}