var categories = [];
var items = [];
var showItems = [];
// var categories2 = ["Gujrati","Pubjabi"];

function isItemPresent(name){
    for(var i=0;i<items.length;i++) {
        if(items[i].name==name) {
            return true;
        }
    }
    return false;
}


//deleting category and item


let dClick=true;
let btnVisible=false;
$('#deleteCat').click(function (){
    let checks = document.querySelectorAll('.checkBoxForDelete');
    let length = checks.length;
    let delBtn = document.getElementById('deleteCat');
    if(dClick){
        for(i=0;i<length;i++){
            checks[i].style.display='unset';
        }
        if(length!=0){
            delBtn.innerText='Undo';
            $('#deleteSelCat').css('display','none');
        }

        for(i=0;i<length;i++){
            console.log(categories[i]);
            $('#'+categories[i]+'checkBoxForDelete').click(function(){
                if(!btnVisible){
                    $('#deleteSelCat').css('display','unset');
                    btnVisible=true;
                }
                // let h3 = document.getElementById(categories[i]+'h3');
                // h3.removeAttribute('onclick');
                // else {
                    //     btnVisible=false;
                    // }
            });
            if(btnVisible)  break;
        }

        dClick=false;
    }else {
        for(i=0;i<length;i++){
            $('#'+categories[i]+'checkBoxForDelete').click(function(){
                if(!btnVisible){
                    $('#deleteSelCat').css('display','unset');
                    btnVisible=true;
                }
                // let h3 = document.getElementById(categories[i]+'h3');
                // h3.removeAttribute('onclick');
                // else{
                    //     btnVisible=false;
                    // }
            });
            if(btnVisible) break;
        }

        let isChecked = false;
        let selected = 0;
        // console.log(checks.length);
        for(i=0;i<length;i++){
            // console.log(checks[i].checked);
            if(checks[i].checked==true){
                isChecked=true;
                selected=selected+1;
            }
        }
        // console.log('isChecked : '+isChecked);
        if(isChecked){
            let ok = confirm('Will unselect \''+selected+'\' selected categories. OK?');
            if(ok){
                for(i=0;i<length;i++){
                    // alert('unchecked '+checks[i]);
                    checks[i].checked=false;
                    checks[i].style.display='none';
                }
                $('#deleteSelCat').css('display','none');
                btnVisible=false;
                delBtn.innerText='Delete Category';
                dClick=true;
            }
        }else {
            // console.log('else of else');
            for(i=0;i<length;i++){
                // alert('unchecked',checks[i]);
                checks[i].checked=false;
                checks[i].style.display='none';
            }
            $('#deleteSelCat').css('display','none');
            btnVisible=false;
            delBtn.innerText='Delete Category';
            dClick=true;
        }
    }
});

//deleteSelCat
$('#deleteSelCat').click(function(){
    let checks = document.querySelectorAll('.checkBoxForDelete');
    let length = checks.length;
    let checkedCat= [];
    let anyChecked = false;
    let delBtn = document.getElementById('deleteCat');
    for(i=0;i<length;i++) {
        if(checks[i].checked==true){
            checkedCat.push(checks[i].id.replace('checkBoxForDelete',''));
            anyChecked=true;
        }
    }
    if(anyChecked){
        let len=checkedCat.length;
        for(i=0;i<len;i++){
            for(j=0;j<categories.length;j++) {
                if(categories[j]==checkedCat[i]){
                    console.log(categories[j]+':'+checkedCat[i]);
                    categories.splice(j,1);
                    break;
                }
            }
        }
        alert('categories deleted successfully');
        for(i=0;i<length;i++){
            // alert('unchecked',checks[i]);
            checks[i].checked=false;
            checks[i].style.display='none';
        }
        $('#deleteSelCat').css('display','none');
        delBtn.innerText='Delete Category';
    }else {
        alert('No category is selected!');
    }
});




function showAll(){
    console.log("categories : ");
    console.log(categories);
    console.log("items : ");
    console.log(items);
    console.log("showItems : ");
    console.log(showItems);
}


function ItemAsCat(){
    var iN = $('#itemname');
    var iP = $('#item_price');
    var iC = $('#item_cat_i');
    var iD = $('#description_i');

    var itemName = $('#itemname').val();
    var itemPrice = $('#item_price').val();
    var itemDes = $('#description_i').val();
    itemName = itemName.replace(" ","_").trim();
    var catExist = isCatExist(itemName.toLowerCase());
    if(catExist) {
        errorAlert("Category already exist.Please try with different one.");
    }else {
            var symbolPresent = isSymbolPresent(itemName,"itemname");
            if(!symbolPresent) {
                createNewCategoryEq(itemName);
                iN.val("");
                iP.val("");
                // iC.val("");
                iD.val("");
                var item = new Object();
                item.name = itemName;
                item.price = itemPrice;
                item.cat = itemName;
                item.des = itemDes;
                items.push(item);
                createShowItem(item,'cat');
                successAlert(itemName.replace("_"," ")+", added successfully as "+itemName.replace("_"," ")+" category.");
                return true;
            }else{
                warningAlertWithTitle("SYMBOLS"," must be avoided.");
            }
    }
}

// function closePanel(){
//     var iC = document.getElementById('item_cat_i');
//     iC.removeAttribute('disabled');
//     $('#item_cat_i').val('');
//     iC.style.backgroundColor = '#f5f5f5';
// }


function addItem(){
    var iN = $('#itemname');
    var iP = $('#item_price');
    var iC = $('#item_cat_i');
    var iD = $('#description_i');

    var itemName = $('#itemname').val();
    var itemPrice = $('#item_price').val();
    var itemCat = $('#item_cat_i').val();
    var itemDes = $('#description_i').val();
    itemName = itemName.replace(" ","_").trim();
    itemCat = itemCat.replace(" ","_").trim();
    if($('#cat_eq_item').is(':checked')) {
        // alert('checked');
        return ItemAsCat();
    }else {
        if(itemName===itemCat) {
            // alert("Item name and category must be different.");
            warningAlert("Item name and category must be different.");
            iC.val("");
        }else {
            var itemPresent = isItemPresent(itemName);
            if(!itemPresent) {
                if(!isSymbolPresent(itemName,"itemname")) {
                    if(addItemToCategory(itemName,itemCat)){
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
                    }else {
                        iC.val(itemCat.replace(".",""));
                        iC.val(itemCat.replace(",",""));
                        iC.val(itemCat.replace("#",""));
                        warningAlertWithTitle("'.' or ',' or '#'"," are must be avoided.");
                    }
                }else {
                    warningAlertWithTitle("SYMBOLS"," must be avoided.");
                }
            }else{
                var item = getItem(itemName);
                errorAlert(itemName+" is already exist in "+item.cat+" category."+"\n"+" So please add item with different name.");
                return false;
            }
        }
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
        if(cat.includes(".") || cat.includes(",") || cat.includes("#")){
            // alert(". , #");
            return false;
        }else {
            createNewCategory(cat);
            var li = createItemLi(name);
            document.getElementById(cat.toLowerCase()).appendChild(li);
            return true;
        }
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
    button.setAttribute("type","button");
    button.setAttribute('class','closeItemBtn');
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

function isSymbolPresent(catName,id){
    // var cn = $('#item_cat_c');
    var cn = $('#'+id);
    if(catName.includes(".")){
        cn.val(catName.replace(".",""));
        return true;
    }else if(catName.includes(",") ){
        cn.val(catName.replace(",",""));
        return true;
    }else if(catName.includes("#")){
        cn.val(catName.replace("#",""));
        return true;
    }else if(catName.includes("$") ){
        cn.val(catName.replace("$",""));
        return true;
    }else if(catName.includes("!") ){
        cn.val(catName.replace("!",""));
        return true;
    }else if(catName.includes("~") ){
        cn.val(catName.replace("~",""));
        return true;
    }else if(catName.includes("`") ){
        cn.val(catName.replace("`",""));
        return true;
    }else if(catName.includes("%") ){
        cn.val(catName.replace("%",""));
        return true;
    }else if(catName.includes("^") ){
        cn.val(catName.replace("^",""));
        return true;
    }else if(catName.includes("&") ){
        cn.val(catName.replace("&",""));
        return true;
    }else if(catName.includes("*") ){
        cn.val(catName.replace("*",""));
        return true;
    }else if(catName.includes("-") ){
        cn.val(catName.replace("-",""));
        return true;
    }else if(catName.includes("+") ){
        cn.val(catName.replace("+",""));
        return true;
    }else if(catName.includes("/") ){
        cn.val(catName.replace("/",""));
        return true;
    }else if(catName.includes("\\") ){
        cn.val(catName.replace("\\",""));
        return true;
    }else if(catName.includes(";") ){
        cn.val(catName.replace(";",""));
        return true;
    }else {
        return false;
    }
    
}

//FOR CATEGORIES
function addCategory(){
        var cn = $('#item_cat_c');
        var catName = $('#item_cat_c').val();
        var cats_allcats = $('.cats>.allcats');
        catName = catName.trim();
        if(catName==""){
            // alert("Write proper word for category.");
            warningAlert("Write proper word for category.");
        }else {
            if(!isSymbolPresent(catName,"item_cat_c")) {
                catName = catName.trim();
                if(!isCatExist(catName.toLowerCase().replace(" ","_"))) {
                    catName = catName.replace(" ","_");
                    var li = document.createElement("li");
                    var headline = getCatHeading(catName);
                    catName = catName.toLowerCase();
                    // console.log(catName);
                    categories.push(catName);
                    li.appendChild(headline);
                    var ul = createUl(catName);
                    li.appendChild(ul);
                    // li.appendChild(createUl);
                    cats_allcats.append(li);
                    // alert("category "+catName.replace("_"," ")+" added successfully.");
                    successAlert("category "+catName.replace("_"," ")+" added successfully.");
                    // console.log(categories);
                    cn.val("");
                    // addCat(catName);
                    return true;
                }else {
                    cn.val("");
                    // alert(catName+" is exist. Try with different name.");
                    errorAlert(catName+" is exist. Try with different name.");
                }
            }else {
                warningAlertWithTitle("SYMBOLS"," must be avoided.");
            }
        }
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

function createNewCategoryEq(name) {
    var li = document.createElement("li");
    li.setAttribute("onclick","showItem('"+name+"')");
    var headline = getCatHeadingEq(name);
    // headline.style.color='green';
    var catAsItem = $('.allItemsAsCats');
    name = name.toLowerCase();
    categories.push(name);
    li.appendChild(headline);
  // li.appendChild(createUl);
    catAsItem.append(li);
    // successAlert("category "+name.replace("_"," ")+" added successfully.");
    // console.log(categories);
    // addCat(name);
}

function getCatHeadingEq(text){
    var h3 = document.createElement("h3");
    var h3Text = document.createTextNode(text.replace("_"," "));
    h3.appendChild(h3Text);
    return h3;
}

function createNewCategory(name) {
    var li = document.createElement("li");
    var headline = getCatHeading(name);
    var cats_allcats = $('.cats>.allcats');
    name = name.toLowerCase();
    // console.log(name);
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

function getCatHeading(text){
    var className = text.toLowerCase();
    // console.log(className);
    var h3 = document.createElement("h3");
    h3.setAttribute('id',text.toLowerCase()+'h3');
    // console.log(text.toLowerCase()+'h3');
    h3.setAttribute("class","opencat");
    h3.setAttribute("onclick","opencat('"+className+"')");
    var h3Text = document.createTextNode(text.replace("_"," "));
    h3.appendChild(h3Text);
    let checkBox = document.createElement('input');
    checkBox.type='checkbox';
    checkBox.setAttribute('id',text.toLowerCase()+'checkBoxForDelete');
    checkBox.setAttribute('class','checkBoxForDelete');
    console.log(text+'checkBoxForDelete');
    checkBox.style.marginRight='10px';
    checkBox.style.display='none';
    h3.prepend(checkBox);
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