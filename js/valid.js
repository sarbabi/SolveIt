//﻿<!--
function validateForm(){
	
var field = document.forms["ana"]["name","username","password1","password2","email"].value;
if (field == null || field == ""){

    alert("فیلدهای ستاره دار نباید خالی باشند.");
    return false;
  }
	var p = document.forms["ana"]["username"].value;
    if(!p.match(/^[A-Za-z0-9_]+$/i))
        {
        alert("نام کاربری فقط می تواند شامل حروف ، اعداد باشد.")
		return false;
        }
		
			 var b = document.forms["ana"]["password1"].value;
    if(!b.match(/^[A-Za-z0-9_]+$/i))
        {
        alert("کلمه عبور فقط می تواند شامل اعداد و حروف باشد.")
		return false;
        }
					 var b = document.forms["ana"]["password2"].value;
    if(!b.match(/^[A-Za-z0-9_]+$/i))
        {
        alert("کلمه عبور فقط می تواند شامل اعداد و حروف باشد.")
		return false;
        }
    var x = document.forms["ana"]["email"].value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert("لطفا آدرس ایمیل خود را به شکل صحیح وارد کنید.");
        return false;
    }
		 var y = document.forms["ana"]["name"].value;
    if(!y.match(/^[A-Za-z_]+$/i))
        {
        alert("نام شخص فقط باید شامل حروف باشد.")
		return false;
        }
}
//-->