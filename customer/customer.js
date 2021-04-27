
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

$(document).ready(function(){
    $(".orderitems").click(function(){
        $(".main").css("display","none");
        $(".orderTotal").css("display","unset");
        $(".selecttablesection").css("display","none");
        addOrderedItemsToOrder();
        setEditableFalse();
    });
    $('.selecttable').click(function () { 
        $(".main").css("display","none");
        $(".orderTotal").css("display","none");
        $(".selecttablesection").css("display","unset");
        setEditableFalse();
    });

    // myAlert("My alert says something about new thing.");
});

function sweetAlertSlowFading(text){
    Swal.fire({
        title: text,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}

function sweetConfirmForItemDeletion(item,ttext){
    Swal.fire({
        title: 'Are you sure want to remove?',
        text: ttext,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title:'Deleted!',
                text:'item deleted successfully from order.',
                icon:'success',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            orderItems.splice(item,1);
            // sweetAlertSlowFading("item deleted successfully from order.");
            addOrderedItemsToOrder();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: 'Cancelled',
                icon:'error',
                text : 'Item not removed from order.',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
        }
    });
}


var categories = ["Gujrati","Punjabi","South_Indian"];

var khaman = new Object();
khaman.name = "Khaman";
khaman.price = 100;
khaman.cat = "Gujrati";
khaman.des = "Khaman is famous gujrati dish.";

var rotala = new Object();
rotala.name = "Rotala";
rotala.price = 40;
rotala.cat = "Gujrati";
rotala.des = "Rotala is famous gujrati dish.";

var chapati = new Object();
chapati.name = "Chapati";
chapati.price = 15;
chapati.cat = "Gujrati";
chapati.des = "Chapati with pure butter.";

var paratha = new Object();
paratha.name = "Paratha";
paratha.price = 25;
paratha.cat = "Punjabi";
paratha.des = "Paratha is famous punjabi dish.";

var paneer_tikka = new Object();
paneer_tikka.name = "Paneer_Tikka";
paneer_tikka.price = 150;
paneer_tikka.cat = "Punjabi";
paneer_tikka.des = "paneer tikka is famous panjabi sabzi.";

var lassi = new Object();
lassi.name = "lassi";
lassi.price = 40;
lassi.cat = "Punjabi";
lassi.des = "Lassi is coolest drink in summer.";

var idli = new Object();
idli.name = "Idli_sambhar";
idli.price = 40;
idli.cat = "South Indian";
idli.des = "Idli sambhar is special south indian dish.";

var dosha = new Object();
dosha.name = "Dosha";
dosha.price = 60;
dosha.cat = "South Indian";
dosha.des = "dosha is special south indian dish.";


var items = [];
items.push(khaman);
items.push(chapati);
items.push(paratha);
items.push(lassi);
items.push(idli);
items.push(rotala);
items.push(paneer_tikka);
items.push(dosha);

function doPayment(){
    if(!orderItems.length==0){
        var obox = document.querySelector(".orderbox");
        var paySuccess = getPaymentSuccessSpan();
        obox.removeChild(obox.childNodes[4]);
        obox.appendChild(paySuccess);
    }else {
        // alert("Please add items to order.");
        // Swal.fire("Please add items to order.");
        sweetAlertSlowFading("Please add items to order.");
    }
}

function placeOrder(){
    if(!orderItems.length==0){
        // alert("Order placed successfully.");
        // Swal.fire("Order placed successfully.");
        sweetAlertSlowFading("Order placed successfully.");
    }else {
        // alert("Please add items to order.");
        // Swal.fire("Please add items to order.");
        sweetAlertSlowFading("Please add items to order.");
    }
}

var tableNumber;

function getItem(name){
    name= name.replace("menu","");
    for(var i=0;i<items.length;i++) {
        // console.log(name+":"+items[i].name);
        if(name==items[i].name) {
            return items[i];
        }
    }
}


$(document).ready(function () {
    for(var i=0;i<categories.length;i++){
        addCatToContainer(categories[i]);
    }
    addItemAddSection();
}); 

function addItemAddSection(){
    var div = document.querySelector("#custItems");
    for(var i=0;i<items.length;i++) {
        var section = getAddItemSection(items[i]);
        div.appendChild(section);
    }
}


function addCatToContainer(name) {
    var catContainer = document.querySelector(".allcats>.cats");
    var li = document.createElement("li");
    li.setAttribute("class","cat");
    var h3 = document.createElement("h3");
    h3.setAttribute("id",name.replace(" ","_")+"cat");
    h3.setAttribute("onclick","showItems('"+name.replace(" ","_")+"')");
    var text = document.createTextNode(name.replace("_"," "));
    h3.appendChild(text);
    li.appendChild(h3);
    catContainer.appendChild(li);
}

var orderItems = [];

var editClick1Time=false;

function editOrder(){
    var btn = document.getElementById("editorder");
    if(!orderItems.length==0) {
        if(!editClick1Time) {
            setEditableTrue();
            btn.innerText="Save changes";
            editClick1Time=true;
        }else {
            setEditableFalse();
            saveChanges();
            btn.innerText="Edit Order";
            editClick1Time=false;
        }
    }else {
        // alert("Please add items to order.");
        sweetAlertSlowFading("Please add items to order.");
    }
}

function saveChanges(){
    // orderItems[i].name+"foredit";
    for(var i=0;i<orderItems.length;i++) {
        // console.log(orderItems[i].name);
        var quantity = document.getElementById(orderItems[i].name+"foredit").innerText;
        if(isFinite(quantity) && Number(quantity)==0){
            // var remove = confirm(orderItems[i].name+" removed from order because you select quantity equal to 0.");
            // var remove2 = 
            sweetConfirmForItemDeletion(i,orderItems[i].name+" removed from order because you select quantity equal to 0.");
            // sweetAlertSlowFading("get "+remove2);
            // if(remove2) {
                // orderItems.splice(i,1);
                // sweetAlertSlowFading("item deleted successfully from order.");
            // }    
        }else if(isFinite(quantity) && Number(quantity)<=50 && Number(quantity)>0 ) {
            orderItems[i].quantity=Number(quantity);
            orderItems[i].sum = orderItems[i].quantity*orderItems[i].price;
            successAlert("Order updated successfully.");
        }
        // else if(isFinite(quantity) && Number(quantity)==0){
        //     orderItems[i] = null;
        // }
        else {
            // alert("Enter correct number between 0 and 50");
            sweetAlertSlowFading("Enter correct number between 0 and 50");
        }
    }
    addOrderedItemsToOrder();
} 

function setEditableTrue(){
    for(var i=0;i<orderItems.length;i++) {
        // console.log(orderItems[i].name);
        var item = document.getElementById(orderItems[i].name+"foredit");
        item.setAttribute("contenteditable","true");
        item.classList.add("edit");
    }
}

function setEditableFalse(){
    var btn = document.getElementById("editorder");
    btn.innerText="Edit Order";
    editClick1Time=false;
    for(var i=0;i<orderItems.length;i++) {
        var item = document.getElementById(orderItems[i].name+"foredit");
        item.setAttribute("contenteditable","false");
        item.classList.remove("edit");
    }
}

function getOrderTotalPrice(){
    var sum=0;
    for(var i=0;i<orderItems.length;i++) {
        sum =sum+ orderItems[i].sum;
    }
    return sum;
}

function orderContainsItem(name){
    name = name.replace("menu","");
    for(var i=0;i<orderItems.length;i++) {
        if(name==orderItems[i].name) {
            return true;
        }
    }
    return false;
}

function getOrderItem(name) {
    name=name.replace("menu","");
    for(var i=0;i<orderItems.length;i++) {
        if(name==orderItems[i].name) {
            return i;
        }
    }
}

function setTableNumber(table) {
    tableNumber= table;
}

var tableSetFirst=true;

function addItemToOrder(id){
    var input = document.getElementById(id);

    // var table = document.getElementById("tablenumber");
    // if(table.value==undefined || table.value==0){
    //*     // alert("Please select table number.");
    //     sweetAlertSlowFading("Please select table number.");
    // }
    // else {
        doThings();
        // setTableNumber(table.value);
        // table.setAttribute("disabled","true");
        // tableSetFirst=false;
    // }


    function doThings() { 
        var value = input.value;
        value = Number(value);
        if(Number(value)<0){
            // alert("Please select quantity of, "+id.replace("menu","")+" greater than 0");
            sweetAlertSlowFading("Please select quantity of, "+id.replace("menu","")+" greater than 0");
            input.value = 0;
        }
        else if(Number(value)==0 || value===undefined){
            // alert("Please select quantity of, "+id.replace("menu",""));
            sweetAlertSlowFading("Please select quantity of, "+id.replace("menu",""));
            input.value = 0;
        }
        else if(Number(value)>=51){
            // alert("Please select quantity of, "+id.replace("menu","")+" upto 50.");
            sweetAlertSlowFading("Please select quantity of, "+id.replace("menu","")+" upto 50.");
            input.value = 50;
        }else {
            var flag=true;
            var isOrderContainsItem = orderContainsItem(id);
            if(isOrderContainsItem){
                var i = getOrderItem(id);
                if(orderItems[i].quantity==50) {
                    // alert("50 quantities of "+orderItems[i].name+"'s, are already added.\nplease add more quantity after placing order");
                    sweetAlertSlowFading("50 quantities of "+orderItems[i].name+"'s, are already added.\nplease add more quantity after placing order");
                    input.value = 0;
                    flag=false;
                }else {
                    orderItems[i].quantity = orderItems[i].quantity+value;
                    orderItems[i].sum = orderItems[i].quantity*orderItems[i].price;
                    input.value=0;
                }
            }else {
                var oItem = new Object();
                var item = getItem(id);
                // console.log(item.name);
                oItem.name = item.name;
                oItem.price = item.price;
                oItem.quantity = value;
                oItem.sum = oItem.price*oItem.quantity;
                orderItems.push(oItem);
                input.value=0;
            }

            if(flag) {
                var tname = id.replace("menu","").replace("_"," ");
                if(value>1) {
                    // alert(value+" "+tname+"'s, added successfully.");
                    itemAddedSuccessAlert(value+" "+tname+"'s are added successfully.");
                }else {
                    // alert(value+" '"+tname+"' added successfully.");
                    itemAddedSuccessAlert(value+" "+tname+" is added successfully.");
                }
            }
    
        }
    }
}

function itemAddedSuccessAlert(ttext){
    Swal.fire({
        text: ttext,
        icon:'success',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}


function showItems (name){
    $(".info").css("display","unset");
    $(".items").removeClass("show");
    $(".main").css("display","unset");
    $(".orderTotal").css("display","none");
    $(".selecttablesection").css("display","none");
    // setEditableFalse();
    // console.log(name);
    for(var i=0;i<items.length;i++) {
        // console.log(items[i].cat+":"+name.replace("_"," "));
        if(items[i].cat==name.replace("_"," ")) {
            // var section = document.getElementById(items[i].name+"citem");
            // section.style.visibility="visible";
            // section.classList.add("show");
            $(".items").addClass("show");
            // console.log("name : "+items[i].name);
            // console.log("name : "+items[i].name+"citem");
            $("#"+items[i].name+"citem").css("display","unset");
        }else {
            $("#"+items[i].name+"citem").css("display","none");
            // alert("no match");
        }
    }
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

function addOrderedItemsToOrder(){
    var section = document.createElement("section");
    section.setAttribute("class","orderbox");
    // var placeOrder = getPlaceOrderButton(234234234);
    // section.appendChild(placeOrder);
    var orderid = getOrderIdSpan(23432424234);
    section.appendChild(orderid);
    var tablenum = getTableNumSpan(tableNumber);
    section.appendChild(tablenum);
    var sum = getOrderTotalPrice();
    var price = getOrderPriceSpan(sum);
    // console.log(sum);
    section.appendChild(price);
    var oitems = getOrderItemsSpan(223123123);
    for(var i=0;i<orderItems.length;i++) {
        var itemDetails = getItemDetailsSpan(orderItems[i]);
        oitems.appendChild(itemDetails);
    }
    section.appendChild(oitems);
    var payment = getPaymentPendingSpan(234234234);
    section.appendChild(payment);

    var destination = document.querySelector("#orderTotal>.order");
    destination.removeChild(destination.childNodes[0]);
    destination.appendChild(section);
}

function getPlaceOrderButton(oid){
    var btn = document.createElement("button");
    btn.setAttribute("id",oid+"place");
    btn.setAttribute("class","placeorder");
    btn.setAttribute("type","button");
    var text = document.createTextNode("Place Order");
    btn.appendChild(text);
    return btn;
}

function getItemDetailsSpan(item) {
    var span = document.createElement("span");
    span.setAttribute("class","itemdetails");
    var h5 = document.createElement("h5");
    var h5Text = document.createTextNode(item.name.replace("_"," "));
    h5.appendChild(h5Text);
    var p = document.createElement("p");
    p.setAttribute("id",item.name+"foredit");
    p.setAttribute("class","itemforedit");
    var pText = document.createTextNode(item.quantity);
    p.appendChild(pText);
    span.appendChild(h5);
    span.appendChild(p);
    return span;
}

function getOrderIdSpan(id){
    var span = document.createElement("span");
    span.setAttribute("class","orderid");
    var h4 = document.createElement("h4");
    var h4Text = document.createTextNode("Order ID :");
    h4.appendChild(h4Text);
    var p = document.createElement("p");
    var pText = document.createTextNode(id);
    p.appendChild(pText);
    span.appendChild(h4);
    span.appendChild(p);
    return span;
}

function getTableNumSpan(table) {
    var span = document.createElement("span");
    span.setAttribute("class","table");
    var h4 = document.createElement("h4");
    h4.setAttribute("class","tablehead");
    var h4Text = document.createTextNode("Table Number :");
    h4.appendChild(h4Text);
    var p = document.createElement("p");
    var pText = document.createTextNode(table);
    p.appendChild(pText);
    span.appendChild(h4);
    span.appendChild(p);
    return span;
}

function getOrderPriceSpan(price) {
    var span = document.createElement("span");
    span.setAttribute("class","orderprice");
    var h4 = document.createElement("h4");
    var h4Text = document.createTextNode("Order Price :");
    h4.appendChild(h4Text);
    var p = document.createElement("p");
    var pText = document.createTextNode(price);
    p.appendChild(pText);
    span.appendChild(h4);
    span.appendChild(p);
    return span;
}

function getOrderItemsSpan(oid){
    var span = document.createElement("span");
    span.setAttribute("class","endorderitems");
    span.setAttribute("id",oid+"oi");
    var h4 = document.createElement("h4");
    var h4Text = document.createTextNode("Items :");
    h4.appendChild(h4Text);
    span.appendChild(h4);
    return span;
}

function getPaymentSuccessSpan(oid){
    var span = document.createElement("span");
    span.setAttribute("id",oid+"payment");
    span.setAttribute("class","paymentsuccess payment");
    var text = document.createTextNode("Payment Success");
    span.appendChild(text);
    return span;
}

function getPaymentPendingSpan(oid){
    var span = document.createElement("span");
    span.setAttribute("id",oid+"payment");
    span.setAttribute("class","paymentfail payment");
    var text = document.createTextNode("Payment Pending");
    span.appendChild(text);
    return span;
}

function myAlert(text){
    var div = document.createElement("div");
    div.setAttribute("class","alertBox");
    var p = document.createElement("p");
    p.setAttribute("class","says");
    var says = document.createTextNode("Smart restaurant says..");
    p.appendChild(says);
    var p2 = document.createElement("p");
    p2.setAttribute("class","says_text");
    p2.style.position="relative";
    var p2Text = document.createTextNode(text);
    p2.appendChild(p2Text);
    var btn = document.createElement("button");
    btn.setAttribute("type","submit");
    btn.setAttribute("class","alertbtn");
    var btnText = document.createTextNode("OK");
    btn.appendChild(btnText);
    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(btn);
    document.body.appendChild(div);
}


{/* <section class="orderbox">

<span>
<h4>Order ID :</h4>
<p>243284293478</p>
</span>

<span>
<h4>Table Number :</h4>
<p>2</p>
</span>

<span>
<h4>Order Price :</h4>
<p>1500.0 Rs.</p>
</span>

<span id="name+oi">

<h4>Items :</h4>

<span>
<h5>Khaman</h5>
<p>2</p>
</span>

<span>
<h5>Chapati</h5>
<p>12</p>
</span>

<span>
<h5>Rotala</h5>
<p>3</p>
</span>

<span>
<h5>Khichadi</h5>
<p>2</p>
</span>

<span class="paymentsuccess">Payment Success</span>

</span>
</section> */}
