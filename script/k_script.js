$(document).ready(function(){
    console.log("hello");
    // $('.k_login_section').hide();
    // $('.admin_login_section').hide();
    
    $('#a_login').click(function () { 
        $('.parts').css("opacity","0.35");
        $('.admin_login_section').css("display","unset");
        document.getElementById('k_login').disabled = true;
        document.getElementById('frgt_pass').disabled = true;
        document.getElementById('cust').disabled = true;
    });
    $('#admin_cancel_btn').click(function () {
        $('.parts').css("opacity","1");
        $('.admin_login_section').css("display","none");
        document.getElementById('k_login').disabled = false;
        document.getElementById('frgt_pass').disabled = false;
        document.getElementById('cust').disabled = false;
    });
    $('#admin_btn').click(function () {
        document.getElementById('k_login').disabled = false;
        document.getElementById('frgt_pass').disabled = false;
        document.getElementById('cust').disabled = false;
        // window.open("../admin/admin.html");
        // $('#admin_pass').val("");
    });
    
    $('#k_login').click(function () { 
        $('.parts').css("opacity","0.35");
        $('.k_login_section').css("display","unset");
        document.getElementById('a_login').disabled = true;
        document.getElementById('frgt_pass').disabled = true;
        document.getElementById('cust').disabled = true;
    });
    $('#kitchen_cancel_btn').click(function () {
        $('.parts').css("opacity","1");
        $('.k_login_section').css("display","none");
        document.getElementById('a_login').disabled = false;
        document.getElementById('frgt_pass').disabled = false;
        document.getElementById('cust').disabled = false;
    });
    $('#kitchen_btn').click(function(){
        // $('.parts').css("opacity","1");
        // $('.k_login_section').css("display","none");
        document.getElementById('a_login').disabled = false;
        document.getElementById('frgt_pass').disabled = false;
        document.getElementById('cust').disabled = false;
    });

    $('#frgt_pass').click(function () { 
        // var h2 = "Forgot Password";
        // $('.forgot_pass>h2').text(h2);
        $('.parts').css("opacity","0.35");
        $('.forgot_pass').css("display","unset");
        document.getElementById('a_login').disabled = true;
        document.getElementById('k_login').disabled = true;
        document.getElementById('cust').disabled = true;
    });
    $('#fpass_cancel_btn').click(function () {
        $('.parts').css("opacity","1");
        $('.forgot_pass').css("display","none");
        document.getElementById('a_login').disabled = false;
        document.getElementById('k_login').disabled = false;
        document.getElementById('cust').disabled = false;
    });
    $('#fpass_btn').click(function () {
        document.getElementById('a_login').disabled = false;
        document.getElementById('k_login').disabled = false;
        document.getElementById('cust').disabled = false;
        // window.open("../admin/admin.html");
    });

    //customer part
    $('#cust').click(function(){
        // var ans = sweetConfirmCustOpening("Opening Customer page.ok?");
        // var ans = 
        sweetConfirmCustOpening("Opening Customer page. ok?");
        // if(ans) e.preventDefault(); 
        // else e.canplay();
    });
});


function sweetConfirmCustOpening(item){
    Swal.fire({
        title: item,
        icon: 'warning',
        confirmButtonText: 'Yes, open it!',
        showCancelButton: true,
        cancelButtonText: 'No, keep here!',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    }).then((result) => {
        if (result.value) {
            // ../customer/customer.html
            window.open("../customer/customer.html");
            return true;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // e.preventDefault();
            return false;
        }
    });
}