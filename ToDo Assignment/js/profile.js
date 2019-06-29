function enable_fields()
{
    document.getElementById("fname").disabled = false;
    document.getElementById("lname").disabled = false;
    document.getElementById("address").disabled = false;
    document.getElementById("password").disabled = false;

    for(let i=0;i<(document.getElementsByName("gender").length);i++)
    {
        document.getElementsByName("gender")[i].disabled = false;
    }
}

function validations()
{
    // fetching the fields from the form
    let first_name = document.getElementById("fname").value;
    let last_name = document.getElementById("lname").value;
    let address = document.getElementById("address").value;
    let emailid = document.getElementById("email").value;
    let passwd = document.getElementById("password").value;
    /* let conf_passwd = document.getElementById("confirm_password").value; */
    
    // Here, regular expression for every field is written 
    let regex_first_name = /^([a-zA-Z]{3,})$/;
    let regex_last_name = /^[a-zA-Z]{3,}$/;
    let regex_passwd = /^[a-zA-Z]{3,}$/;

    // condition to check whether each field is valid or not
    if((first_name.match(regex_first_name)) &&
       (last_name.match(regex_last_name)) &&
       (passwd.match(regex_passwd)) /* &&
       (conf_passwd.match(passwd)) */)
    {   
        let bRet = StoreItems(first_name,last_name,address,emailid,passwd)
        alert("Your changes has been saved successfully");
        window.location = '../html/todo_page.html';
    }
    else
    {
        alert("Invalid Credentials");
        window.location.reload();
    }
}

function StoreItems(first_name,last_name,address,emailid,passwd)
{   
    let user_id =  sessionStorage.getItem("logged_in_user");
    let user_info = {
        'first_name_user' : first_name,
        'last_name_user' : last_name,
        'address_user' : address,
        'email_user' : emailid,
        'password_user' : passwd
    }
    /* console.log(user_info.email_user); */

    let code_array = JSON.parse(localStorage.getItem('local_storage_array'));
    code_array[user_id] = user_info;
    localStorage.setItem("local_storage_array",JSON.stringify(code_array));
    return true;
}

function set_logged_in_user_values()
{
    let code_array = JSON.parse(localStorage.getItem("local_storage_array"));
    let user_id =  sessionStorage.getItem("logged_in_user");

    document.getElementById("fname").value = code_array[user_id].first_name_user;
    document.getElementById("lname").value = code_array[user_id].last_name_user;
    document.getElementById("address").value = code_array[user_id].address_user;
    document.getElementById("email").value = code_array[user_id].email_user;
    document.getElementById("password").value = code_array[user_id].password_user;
    /* let gender_array = document.getElementsByName("gender");
    
    alert(gender_array[1].value);

    for(let i = 0; i < gender_array.length; i++)
    {
        if(gender_array[i] == code_array[user_id].gender_user)
        {
            gender_array[i].checked = true;
        }
    } */
}