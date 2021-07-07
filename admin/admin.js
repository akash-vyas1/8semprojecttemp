function successAlert(ttext){
    Swal.fire({
        text: ttext,
        icon:"success",
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}

function errorAlert(ttext){
    Swal.fire({
        text: ttext,
        icon:"error",
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}

function warningAlert(ttext){
    Swal.fire({
        text: ttext,
        icon:"warning",
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}

function warningAlertWithTitle(ttitle,ttext){
    Swal.fire({
        title:ttitle,
        text: ttext,
        icon:"warning",
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}

$(document).ready(function () {
    
    //Openorders
    $('#openOrders').click(function () {
        $('.side').css("display","none");
        $('.orders').css("display","unset");
    });

    //OpenItems
    $('#openItems').click(function () {
        $('.side').css("display","none");
        $('.items,.cats,.itemsAsCats').css("display","unset");
    });
    
    //opensetpassword
    $('#openSetpass').click(function () {
        $('.side').css("display","none");
        $('.setpassword').css("display","unset");
    });

    //add item
    $('#addItem').click(function (){
        $('.additem').css("display","unset");
        $('.list,.cats,.allcats,.itemsAsCats').css("opacity","0.4");
        document.getElementById('addCat').disabled = true;
    });
    $('#addItemCancel').click(function(){
        $('.list,.cats,.allcats,.itemsAsCats').css("opacity","1");
        $('.additem').css("display","none");
        document.getElementById('addCat').disabled = false;
        document.getElementById('cat_eq_item').checked=false;
        closePanel();
    });

    let click=true;
    $('#cat_eq_item').click(function () { 
        var checkbox = document.getElementById('cat_eq_item');
        var iC = document.getElementById('item_cat_i');
        if(click){
            // checkbox.setAttribute('checked','true');
            iC.setAttribute('disabled','true');
            $('#item_cat_i').val('Will be same as item name');
            iC.style.backgroundColor = 'rgb(199, 199, 199)';
            click=false;
        }else {
            // checkbox.removeAttribute('checked');
            iC.removeAttribute('disabled');
            $('#item_cat_i').val('');
            iC.style.backgroundColor = '#f5f5f5';
            click=true;
        }
    });


    function closePanel(){
        var iC = document.getElementById('item_cat_i');
        iC.removeAttribute('disabled');
        $('#item_cat_i').val('');
        iC.style.backgroundColor = '#f5f5f5';
        click=true;
    }

    $('#addItemBtn').click(function(){
        var itemName = $('#itemname').val();
        var itemPrice = $('#item_price').val();
        var itemCat = $('#item_cat_i').val();
        if(itemName!== "") {
            if(itemPrice !== ""){
                var check = document.getElementById('cat_eq_item');
                // alert(check.checked);
                var isChecked = check.checked;
                if(itemCat!== "" && !isChecked ){
                    // console.log("add item is being called.");
                    var added = addItem();
                }else {
                    // alert("Item category name required.");
                    if(!isChecked){
                        warningAlert("Item's category name required.");
                    }else {
                        var added = addItem();
                        if(added) {
                        check.checked=false;
                        closePanel();
                        }
                    }
                }
            }else {
                // alert("Item price required.");
                warningAlert("Item price required.");
            }
        }else {
            // alert("Item name required.");
            warningAlert("Item name required.");
        }
        if(added) {
            document.getElementById('addCat').disabled = false;
            $('.additem').css("display","none");
            $('.list,.cats,.allcats,.itemsAsCats').css("opacity","1");
        }
    });

    //add category
    
    $('#addCat').click(function (){
        $('.addcat').css("display","unset");
        $('.list,.cats,.allcats,.itemsAsCats').css("opacity","0.4");
        document.getElementById('addItem').disabled = true;
    });
    $('#addCatCancel').click(function(){
        $('.list,.cats,.allcats,.itemsAsCats').css("opacity","1");
        $('.addcat').css("display","none");
        document.getElementById('addItem').disabled = false;
    });
    $('#addCatBtn').click(function(){
        // alert("category is added successfully.");
        var added = addCategory();
        if(added) {
            document.getElementById('addItem').disabled = false;
            $('.addcat').css("display","none");
            $('.list,.cats,.allcats,.itemsAsCats').css("opacity","1");
        }
    });


    //setpasswords
    $('#setapassbtn').click(function () {
        $('.setApass').css("display","unset");
        document.getElementById('setkpassbtn').disabled = true;
    });
    $('#sapasscancelbtn').click(function () {
        $('.setApass').css("display","none");
        document.getElementById('setkpassbtn').disabled = false;
    });

    $('#setkpassbtn').click(function () {
        $('.setKpass').css("display","unset");
        document.getElementById('setapassbtn').disabled = true;
    });
    $('#skpasscancelbtn').click(function () {
        $('.setKpass').css("display","none");
        document.getElementById('setapassbtn').disabled = false;
    });


});


//open category
function opencat(c){
    var cat = '.'+c;
    $('.tcat').css("display","none");
    $(cat).toggleClass('display');
    // $(cat).toggle('');
    //console.log($(cat).hasClass('display'));
}

//show item
// var openItemDetail =false;
function showItem(id) {
    // if(openItemDetail==false) {
        $('.showitem').css("display","none");
        $("#"+id).css("display","unset");
        $('.list,.cats,.itemsAsCats').css("opacity","0.45");
        // openItemDetail=true;
    // }else {
    //     $("#"+id).css("display","none");
    //     $('.list,.cats').css("opacity","1");
    //     openItemDetail=false;
    // }
}


var firstClick = true;
function closeItem(id){
    closeEditable(id);
    getPreviousValues(id);
    $("#"+id).css("display","none");
    $('.list,.cats,.itemsAsCats').css("opacity","1");
    firstClick=true;
    // openItemDetail=false;
}

function closeEditable(name) {
    var btn = document.getElementById(name+"edit");
    var des = document.getElementById(name+"des");
    var price = document.getElementById(name+"price");
    price.setAttribute("contenteditable","false");
    des.setAttribute("contenteditable","false");
    des.classList.remove("editItemDetails");
    price.classList.remove("editItemDetails");
    btn.innerText="Edit details";
}

function editItem(name) {
    var btn = document.getElementById(name+"edit");
    var des = document.getElementById(name+"des");
    var price = document.getElementById(name+"price");
    if(firstClick) {
        des.setAttribute("contenteditable","true");
        des.classList.add("editItemDetails");
        price.setAttribute("contenteditable","true");
        price.classList.add("editItemDetails");
        btn.innerText="Save changes";
        firstClick=false;
    }else {
        var same = checkIfSame(name);
        if(!same) {
            if(isFinite(price.innerText)){
                saveChanges(name);
                // alert("Item details saved successfully.");
                successAlert(name.replace("_"," ")+"'s details updated successfully.");
                price.setAttribute("contenteditable","false");
                des.setAttribute("contenteditable","false");
                des.classList.remove("editItemDetails");
                price.classList.remove("editItemDetails");
                btn.innerText="Edit details";
                closeItem(name);
                firstClick=true;    
            }else {
                getPriceBack(name);
                errorAlert("Wrong number for item price. Please write correct number.");
            }
        }else {
            // alert("Write correct price.");
            warningAlert("Item details are same as previous. No change in details.");
            price.setAttribute("contenteditable","false");
            des.setAttribute("contenteditable","false");
            des.classList.remove("editItemDetails");
            price.classList.remove("editItemDetails");
            btn.innerText="Edit details";
            closeItem(name);
            firstClick=true;
        }
    }
}


//Generate Id for category 





//ALL BUTTONS

/*
id="addCat"
id="addItem"
id="deleteCat"
id="deleteItem"
*/

/*
id="addItemBtn"
id="addItemCancel"
*/

/**
id="addCatBtn"
id="addCatCancel"
*/

/**

<li>
    <h3 class="opencat" onclick="opencat('cat2')">Gujrati</h3>
    <ul class="tcat cat2">
        <li ><button>Chapati</button></li>                            
        <li><button>Rotala</button></li>
    </ul>
</li>

 */

//set password
