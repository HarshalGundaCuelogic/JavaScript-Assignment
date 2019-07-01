function enable_fields()
{
    document.getElementById("fname").disabled = false;
    document.getElementById("lname").disabled = false;
    document.getElementById("address").disabled = false;
    document.getElementById("password").disabled = false;
    document.getElementById("submit").disabled = false;

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
    let gender = document.querySelector('input[name="gender"]:checked').value;
    /* let conf_passwd = document.getElementById("confirm_password").value; */
    alert(gender);
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
        let bRet = StoreItems(first_name,last_name,address,emailid,passwd,gender)
        alert("Your changes has been saved successfully");
        window.location = '../html/todo_page.html';
    }
    else
    {
        alert("Invalid Credentials");
        window.location.reload();
    }
}

function StoreItems(first_name,last_name,address,emailid,passwd,gender)
{   
    let code_array = JSON.parse(localStorage.getItem("local_storage_array"));
    let user_id =  sessionStorage.getItem("logged_in_user");
    let code_todo_array = code_array[user_id].to_do_user;

    code_array[user_id].first_name_user = first_name;
    code_array[user_id].last_name_user = last_name;
    code_array[user_id].address_user = address;
    code_array[user_id].email_user = emailid;
    code_array[user_id].password_user = passwd;
    code_array[user_id].to_do_user = code_todo_array;
    code_array[user_id].gender_user = gender;
    
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

    if(code_array[user_id].gender_user == "male")
    {
        document.getElementsByName("gender")[0].checked = true;
    }
    else if(code_array[user_id].gender_user == "female")
    {
        document.getElementsByName("gender")[1].checked = true;
    }
    else
    {
        document.getElementsByName("gender")[2].checked = true;
    }

    /* document.querySelector('input[name="categories"]:checked').value = code_array[user_id].gender_user; */
}