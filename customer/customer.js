$(document).ready(function () {
    console.log("Customer part!");
});


function addItemToOrder(id){
    var input = document.getElementById(id);
    var value = input.value;
    if(Number(value)==0 || value===undefined){
        alert("Please select quantity of, "+id);
        input.value = 0;
    }
    if(Number(value)>=51){
        alert("Please select quantity of, "+id+" upto 50.");
        input.value = 50;
    }
    if(Number(value)<0){
        alert("Please select quantity of, "+id+" greater than 0");
        input.value = 0;
    }
    // else {
    //     alert(id+" added successfully.");
    // }
}


function showItems (id){
    var cat = id;
    console.log(cat);
    $('.items').addClass('show');
}


function doIncrement(id) {
    var totalitem = document.getElementById(id);
        // console.log('increment button clicked');
        if(totalitem.value===undefined){
            totalitem.value=1;
            // console.log(totalitem.value);
        }else if(Number(totalitem.value)>=51) {
            totalitem.value = 50;
        }
        else if(Number(totalitem.value)<50 && Number(totalitem.value)>=0) {
            totalitem.value = Number(totalitem.value)+1;
            // console.log(totalitem.value);
        }else if(Number(totalitem.value)<0) {
            totalitem.value=0;
        }
}

function doDecrement(id){
    var totalitem = document.getElementById(id);
        // console.log('decrement button clicked');
        if(totalitem.value===undefined) {
            totalitem.value=0;
            // console.log(totalitem.value);
        }else if(Number(totalitem.value)>=51) {
            totalitem.value = 50;
        }
        else if(Number(totalitem.value)>0 && Number(totalitem.value)<=50) {
            totalitem.value = Number(totalitem.value)-1;
            // totalitem.innerHTML = totalitem.value;
            // console.log(totalitem.value);
        }else if(Number(totalitem.value)<0) {
            totalitem.value=0;    
        }else {
            totalitem.value=0;    
        }
}