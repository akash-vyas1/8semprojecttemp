$(document).ready(function() {
    console.log("hello");
    
    $('#fgt_pass').click(function(){
        $('.login').css("display","none");
        $('.reg').css("display","none");
        $('.fpass').css("display","unset");
    });
    $('#fcancel').click(function(){
        $('.login').css("display","unset");
        $('.reg').css("display","none");
        $('.fpass').css("display","none");
    });

    $('#newReg').click(function(){
        $('.login').css("display","none");
        $('.fpass').css("display","none");
        $('.reg').css("display","unset");
    });
    $('#newregcancel').click(function(){
        $("#r_mail").val("");
        $("#r_pass").val("");
        $("#r_phone").val("");
        $("#r_rname").val("");
        $('.login').css("display","unset");
        $('.fpass').css("display","none");
        $('.reg').css("display","none");
    });


    $("#fsubmit").click(function(){
        var p1 = $("#f_pass1");
        var p2 = $("#f_pass2");
        var otp = $("#f_otp");
        if(otp.val().trim()=="") {
            warningAlert("OTP required.");
        }
        else if(p1.val().trim()=="" || p2.val().trim()=="" ) {
            warningAlert("Password required.");
        }else {
            if(p1.val()!==p2.val()) {
                $('.fpass2').css("background","#e63946ff");
                errorAlert("Password not match, try again.");
                p2.val("");
            }else {
                successAlert("Password changed successfully.");
                $('.fpass2').css("background","#3d5a80ff");
                p1.val("");
                p2.val("");
                otp.val("");
            }
        }
    });

});

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

