var categories = [];
var items = [];
var showItems = [];


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
        alert("Item name and category must be different.");
        iC.val("");
    }else {
        addItemToCategory(itemName,itemCat);
        iN.val("");
        iP.val("");
        iC.val("");
        iD.val("");
        alert(itemName.replace("_"," ")+", added successfully to "+itemCat.replace("_"," ")+", category.");
        var item = new Object();
        item.name = itemName;
        item.price = itemPrice;
        item.cat = itemCat;
        item.des = itemDes;
        items.push(item);
        createShowItem(item);
        console.log(items);
        return true;
    }
}

function saveChanges(name) {
    var oldName = name;
    removeFromShowItem(oldName);
    var item = isItemPresent(name);
    if(item!==null) {
        // alert("in if");
        item.name = document.getElementById(name+"name").innerText;
        item.price = document.getElementById(name+"price").innerText;
        item.des = document.getElementById(name+"des").innerText;
        console.log(showItems);
        createShowItem(item);
        console.log(showItems);
        // removeLi(oldName,cat);
        document.getElementById(name+"item");
        addItemToCategory(item.name,item.cat);
        return true;
    }else {
        // alert("false");
        return false;
    }
}

function removeFromShowItem(name) {
    for(var i=0;i<showItems.length;i++) {
        if(showItems[i].id===name) {
            showItems[i]=null;
        }
    }
}

function isItemPresent(name){
    for(var i=0;i<items.length;i++) {
        // console.log(name+":"+items[i].name);
        if(items[i].name===name) {
            // console.log("equals");
            return items[i];
        }
    }
    return null;
}

function createShowItem(item){
    var nameSpan = getNameSpan(item.name);
    var priceSpan = getPriceSpan(item.price,item.name);
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
    // if(!isItemInShowItem(item.name)) {
        showItems.push(div);
    // }else {
    //     for(var i=0;i<showItems.length;i++) {
    //         // console.log(showItems[i].id+":"+name);
    //         if(showItems[i].id===item.name) {
    //             // console.log("equal");
    //             showItems[i]=div;
    //         }
    //     }
    // }
    // console.log(showItems);
}

function isItemInShowItem(name){
    for(var i=0;i<showItems.length;i++) {
        // console.log(showItems[i].id+":"+name);
        if(showItems[i].id===name) {
            // console.log("equal");
            return true;
        }
    }
    return false;
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
    var hText = document.createTextNode("Item Discription");
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
                alert(catName.replace("_"," ")+", category added successfully.");
                console.log(categories);
                cn.val("");
                return true;
            }else {
                alert(catName.replace("_"," ")+" category is already exist");
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
    alert(name+", category added successfully.");
    console.log(categories);
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
    console.log(className);
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