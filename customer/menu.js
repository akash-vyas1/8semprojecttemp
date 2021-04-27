console.log("Hello from menu");

function getAddItemSection(item) {
    var section = document.createElement("section");
    section.setAttribute("class","item");
    section.setAttribute("id",item.name+"citem");
    var headingSpan = getItemHeading(item.name);
    var priceSpan = getItemPriceSpan(item.price);
    var itemNumSpan = getItemNumsSpan(item.name);
    var desSpan = getItemDesSpan(item.des);
    section.appendChild(headingSpan);
    section.appendChild(priceSpan);
    section.appendChild(itemNumSpan);
    section.appendChild(desSpan);
    section.style.display = "none";
    return section;
}

function getItemHeading(name){
    var h3 = document.createElement("h3");
    h3.setAttribute("class","itemname");
    var text = document.createTextNode(name.replace("_"," "));
    var btn = getItemAddBtn(name+"menu");
    h3.appendChild(text);
    h3.appendChild(btn);
    return h3;
}

function getItemAddBtn(name){
    var btn = document.createElement("button");
    btn.setAttribute("onclick","addItemToOrder('"+name+"')");
    btn.setAttribute("type","submit");
    var text = document.createTextNode("ADD");
    btn.appendChild(text);
    return btn;
}

function getItemPriceSpan(price){
    var span = document.createElement("span");
    var h3 = document.createElement("h3");
    var h3Text = document.createTextNode("Item price : ");
    h3.appendChild(h3Text);
    var h4 = document.createElement("h4");
    var h4Text = document.createTextNode(price+"  Rs.");
    h4.appendChild(h4Text);
    span.appendChild(h3);
    span.appendChild(h4);
    return span;
}

function getItemDesSpan(des) {
    var span = document.createElement("span");
    span.setAttribute("class","des");
    var h3 = document.createElement("h3");
    var h3Text = document.createTextNode("Additional Details : ");
    h3.appendChild(h3Text);
    var h4 = document.createElement("h4");
    var h4Text = document.createTextNode(des);
    h4.appendChild(h4Text);
    span.appendChild(h3);
    span.appendChild(h4);
    return span;
}

function getItemNumsSpan(name) {
    var span = document.createElement("span");
    span.setAttribute("class","itemnums");
    var h3 = document.createElement("h3");
    var h3Text = document.createTextNode("Select quantity : ");
    h3.appendChild(h3Text);
    span.appendChild(h3);

    var div = document.createElement("div");
    
    var btnDec = document.createElement("button");
    btnDec.setAttribute("type","button");
    btnDec.setAttribute("class","itembtn itembtnsub");
    btnDec.setAttribute("onclick","doDecrement('"+name+"menu')");
    var minus = document.createTextNode("-");
    btnDec.appendChild(minus);
    div.appendChild(btnDec);

    var input = document.createElement("input");
    input.setAttribute("id",name+"menu");
    input.setAttribute("class","totalitems");
    input.setAttribute("type","number");
    input.setAttribute("min","0");
    input.setAttribute("max","50");
    input.setAttribute("placeholder","upto 50");
    input.setAttribute("required","true");
    div.appendChild(input);

    var btnInc = document.createElement("button");
    btnInc.setAttribute("type","button");
    btnInc.setAttribute("class","itembtn itembtnplus");
    btnInc.setAttribute("onclick","doIncrement('"+name+"menu')");
    var plus = document.createTextNode("+");
    btnInc.appendChild(plus);
    div.appendChild(btnInc);

    span.appendChild(div);
    return span;
}

// <section class="item">
//                     <h3 class="itemname">
//                         Chapati
//                         <button onclick="addItemToOrder('Chapati')" type="submit">ADD</button>
//                     </h3>
//                 <span>
//                     <h3>Item Price : </h3>
//                     <h4>100.0 &nbsp; Rs.</h4>
//                 </span>
//                 <span class="itemnums">
//                     <h3>Select Quantity : </h3>
//                     <div>
//                         <button class="itembtn itembtnsub" onclick="doDecrement('Chapati')" type="button">-</button>
//                         <input class="totalitems" id="Chapati" type="number" min="0" max="50" placeholder="upto 50" required>
//                         <button type="button" class="itembtn itembtnplus" onclick="doIncrement('Chapati')" >+</button>
//                     </div>
//                 </span>
//                 <span class="des">
//                     <h3>Additional Details : </h3>
//                     <h4>Chapati is a famous gujrati dish</h4>
//                 </span>
// </section>