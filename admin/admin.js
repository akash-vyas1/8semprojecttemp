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
        document.getElementById('addCat').disabled = false;
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
        document.getElementById('addItem').disabled = false;
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

//creating category
var category = {cname:"",cdes:""};
category.cname= "akash vyas";
category.cdes = "akash vyas description";

function addCategory(name, des) {
    var cat = new Object();
    cat.cname = name;
    cat.cdes=des;
}

//show item
function showItem() {
    $('.showitem').css("display","unset");
    $('.list,.cats').css("opacity","0.45");
}
function closeItem(){
    $('.showitem').css("display","none");
    $('.list,.cats').css("opacity","1");
}





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
