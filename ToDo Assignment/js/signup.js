function validations(){
    // fetching the fields from the form 
    let first_name = document.getElementById("fname").value;
    let last_name = document.getElementById("lname").value;
    let address = document.getElementById("address").value;
    /* let emailid = document.signup.getElementById("email").value; */
    let passwd = document.getElementById("password").value;
    let conf_passwd = document.getElementById("confirm_password").value;
    
    // Here, regular expression for every field is written 
    let regex_first_name = /^([a-zA-Z]{3,})$/;
    let regex_last_name = /^[a-zA-Z]{3,}$/;
    /* let regex_emailid = /^[a-zA-Z]{3,}$/; */ // /^([A-Za-z0-9_\-\.])+\@([a-z]){4,}\.([a-z]{2,4})$/; 
    let regex_passwd = /^[a-zA-Z]{3,}$/;

    // condition to check whether each field is valid or not
    if((first_name.match(regex_first_name)) &&
       (last_name.match(regex_last_name)) &&
       /* (emailid.match(regex_emailid)) && */
       (passwd.match(regex_passwd)) &&
       (conf_passwd.match(passwd)))
    {   
        alert("hi");
        StoreItems(first_name,last_name,address,passwd);
        /* Window.open("../html/profile_page.html"); */
        var myWindow = window.open("../html/profile_page.html", "_self");
        myWindow.document.write("../html/profile_page.html");
    }
    else
    {
        alert("bye");
        //window.location.href = "../html/signup.html";
        Window.open("../html/signup.html");
    }
}

function StoreItems(first_name,last_name,address,passwd)
{    
    let user_info = {
        'first_name_user' : first_name,
        'last_name_user' : last_name,
        'address_user' : address,
        /* 'email_user' : emailid, */
        'password_user' : passwd
    }

    /* console.log(user_info.first_name_user); */
    let code_array = JSON.parse(localStorage.getItem('local_storage_array'));

    if(code_array == null)
    {
        code_array = [];
    }
    
    code_array.push(user_info);

    localStorage.setItem("local_storage_array",JSON.stringify(code_array));
}