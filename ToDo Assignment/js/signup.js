function validations()
{
    // fetching the fields from the form 
    let first_name = document.getElementById("fname").value;
    let last_name = document.getElementById("lname").value;
    let address = document.getElementById("address").value;
    let emailid = document.getElementById("email").value;
    let passwd = document.getElementById("password").value;
    let conf_passwd = document.getElementById("confirm_password").value;
    let gender_type = document.querySelector('input[name="gender"]:checked').value;

    // Here, regular expression for every field is written 
    let regex_first_name = /^([a-zA-Z]{3,})$/;
    let regex_last_name = /^[a-zA-Z]{3,}$/;
    let regex_emailid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let regex_passwd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    // condition to check whether each field is valid or not
    if((first_name.match(regex_first_name)) &&
       (last_name.match(regex_last_name)) &&
       (emailid.match(regex_emailid)) &&
       (passwd.match(regex_passwd)) &&
       (conf_passwd.match(passwd)))
    {   
        alert("all elements are valid");
        let bRet = StoreItems(first_name,last_name,address,emailid,passwd,gender_type)

        if(bRet == true)
        {
            alert("Your form has been submitted successfully");
            sessionStorage.removeItem("display_picture");
            window.location = '../html/login.html';
        }
        else
        {
            window.location.reload();
        }
    }
    else
    {
        window.location.reload();
    }
}

function StoreItems(first_name,last_name,address,emailid,passwd,gender_type)
{   
    let to_do_list = new Array();
    
    let profile_picture = sessionStorage.display_picture;

    let user_info = {
        'first_name_user' : first_name,
        'last_name_user' : last_name,
        'address_user' : address,
        'email_user' : emailid,
        'password_user' : passwd,
        'gender_user': gender_type,
        'to_do_user' : to_do_list,
        'display_picture' : profile_picture
    }
    /* console.log(user_info.email_user); */

    let code_array = JSON.parse(localStorage.getItem('local_storage_array'));

    if(code_array == null)
    {
        code_array = [];

        code_array.push(user_info);
        localStorage.setItem("local_storage_array",JSON.stringify(code_array));
        return true;
    }
    else
    {
        let i=0;
        for(i=0; i<code_array.length;i++)
        {
            if((code_array[i].email_user) == emailid)
            {
                break;
            }
        }

        if(i == code_array.length)
        {   
            code_array.push(user_info);
            localStorage.setItem("local_storage_array",JSON.stringify(code_array));
            return true;
        }
        else
        {
            alert("Email ID already exists");
            return false;
        }
    }
}

function upload_profile_picture()
{
    let Image = document.getElementById("profile_picture").files[0];

    getimgbase64(Image);

    function getimgbase64(Image)
    {
        let imagereader = new FileReader();
        imagereader.readAsDataURL(Image);

        imagereader.onload = function () {
            let imgdata = imagereader.result;
            sessionStorage.setItem("display_picture",imgdata);
            document.getElementById("user_pic").src = sessionStorage.display_picture;
        };

        imagereader.onerror = function (error) {
        };
    }
}