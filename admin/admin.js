$(document).ready(function () {
    
    //Openorders
    $('#openOrders').click(function () {
        $('.side').css("display","none");
        $('.orders').css("display","unset");
    });

    //OpenItems
    $('#openItems').click(function () {
        $('.side').css("display","none");
        $('.items,.cats').css("display","unset");
    });
    
    //opensetpassword
    $('#openSetpass').click(function () {
        $('.side').css("display","none");
        $('.setpassword').css("display","unset");
    });

    //add item
    $('#addItem').click(function (){
        $('.additem').css("display","unset");
        $('.list,.cats,.allcats').css("opacity","0.4");
        document.getElementById('addCat').disabled = true;
    });
    $('#addItemCancel').click(function(){
        $('.list,.cats,.allcats').css("opacity","1");
        $('.additem').css("display","none");
        document.getElementById('addCat').disabled = false;
    });
    $('#addItemBtn').click(function(){
        var itemName = $('#itemname').val();
        var itemPrice = $('#item_price').val();
        var itemCat = $('#item_cat_i').val();
        if(itemName!== "") {
            if(itemPrice !== ""){
                if(itemCat!== ""){
                    console.log("add item is being called.");
                    var added = addItem();
                }else {
                    alert("Item category name required.");
                }
            }else {
                alert("Item price required.");
            }
        }else {
            alert("Item name required.");
        }
        if(added) {
            document.getElementById('addCat').disabled = false;
            $('.additem').css("display","none");
            $('.list,.cats,.allcats').css("opacity","1");
        }
    });

    //add category
    
    $('#addCat').click(function (){
        $('.addcat').css("display","unset");
        $('.list,.cats,.allcats').css("opacity","0.4");
        document.getElementById('addItem').disabled = true;
    });
    $('#addCatCancel').click(function(){
        $('.list,.cats,.allcats').css("opacity","1");
        $('.addcat').css("display","none");
        document.getElementById('addItem').disabled = false;
    });
    $('#addCatBtn').click(function(){
        // alert("category is added successfully.");
        var added = addCategory(null);
        if(added) {
            document.getElementById('addItem').disabled = false;
            $('.addcat').css("display","none");
            $('.list,.cats,.allcats').css("opacity","1");
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
        $('.list,.cats').css("opacity","0.45");
        // openItemDetail=true;
    // }else {
    //     $("#"+id).css("display","none");
    //     $('.list,.cats').css("opacity","1");
    //     openItemDetail=false;
    // }
}
function closeItem(id){
    $("#"+id).css("display","none");
    $('.list,.cats').css("opacity","1");
    // openItemDetail=false;
}

function editItem(name) {
    var btn = document.getElementById(name+"edit");
    // var cat = document.getElementById(name+"cat");
    // cat.setAttribute("contenteditable","true");
    var des = document.getElementById(name+"des");
    des.setAttribute("contenteditable","true");
    var price = document.getElementById(name+"price");
    price.setAttribute("contenteditable","true");
    var iname = document.getElementById(name+"name");
    iname.setAttribute("contenteditable","true");
    btn.innerText="Save changes"
    btn.onclick = function(){
        var saved = saveChanges(name);
        if(saved) {
            alert("Item details saved successfully.");
            price.setAttribute("contenteditable","false");
            iname.setAttribute("contenteditable","false");
            des.setAttribute("contenteditable","false");
            btn.innerText="Edit details";
            closeItem(name);
        }else {
            alert("No item with this name available");
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
