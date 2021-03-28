$(document).ready(function() {
    console.log("hello");
    
    $('#fgt_pass').click(function(){
        $('.login').css("opacity","0.35");
        $('.fpass').css("display","unset");
    });
    $('#fcancel').click(function(){
        $('.login').css("opacity","1");
        $('.fpass').css("display","none");
    });
    

});





