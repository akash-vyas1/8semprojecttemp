window.catsForCustomer=[];

function addCat(cat){
    catsForCustomer.push(cat);
    console.log("middle : "+catsForCustomer);
}

function getCatsFromMiddle(){
    console.log("middle called");
    return catsForCustomer;
}
