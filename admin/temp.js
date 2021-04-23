var categories = [];


function catValues(){
    var catName = $('#item_cat').val();
    var description = $('#description').val();
    var cats_allcats = $('.cats .allcats');

    
    if(catName!== undefined && catName!==null && catName!== "") {
        if(!isCatExist(catName)) {
            categories.push(catName);
            var li = document.createElement("li");
            var headline = getCatHeading(catName);
            li.prepend(headline);
            cats_allcats.append(li);
            console.log(categories);
        }else {
            alert(catName+" category is already exist");
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


function getCatHeading(text){
    var h3 = document.createElement("h3");
    h3.setAttribute("class","opencat");
    h3.setAttribute("onclick","opencat('cat1')");
    var h3Text = document.createTextNode(text);
    h3.appendChild(h3Text);
    return h3;
}


{/* <section class="cats">
    <ul class="allcats">
        <h3>Categories</h3>
        <li>
            <h3 class="opencat" onclick="opencat('cat1')">Gujrati</h3>
            <ul class="tcat cat1">
                <li><button>Dhokla</button></li>                            
                <li><button onclick="showItem()">Khaman</button></li>                            
                <li><button>Vaghareli-Khichadi</button></li>                            
                <li><button>Chapati</button></li>                            
                <li><button>Rotala</button></li>                            
            </ul>
        </li>
        <li>
            <h3 class="opencat" onclick="opencat('cat2')">Punjabi</h3>
            <ul class="tcat cat2">
                <li ><button>Shahi-Panner</button></li>                            
                <li><button>Kaju-kari</button></li>                            
                <li><button>Paratha</button></li>                            
                <li><button>Nan</button></li>                            
            </ul>
        </li>
    </ul>
</section> */}