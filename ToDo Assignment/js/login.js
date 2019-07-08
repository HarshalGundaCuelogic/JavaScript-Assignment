function check_validity()
{
    //fetching the data from the form
    let emailid = document.getElementById("email").value;
    let passwd = document.getElementById("password").value;

    let regex_emailid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let regex_passwd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    //applying email validation
    if((emailid.match(regex_emailid)) &&
       (passwd.match(regex_passwd)))
    {  
        let bRet = FetchItems(emailid,passwd)

        if(bRet == true)
        {
            window.location = '../html/todo_page.html';
        }
        else
        {
            window.location.reload;
            return;
        }
    }   
    else if(!emailid.match(regex_emailid))   //email validations are false
    {
        alert("Invalid Email");
    }
    else if(!passwd.match(regex_passwd))    //password validations are false
    {
        alert("Password must be 8-15 characters which contains at least a capital letter, a small letter, a number and a special symbol");
    }
}

function FetchItems(emailid,passwd)
{   
    let user_info = {
        'email_user' : emailid,
        'password_user' : passwd
    }

    let code_array = JSON.parse(localStorage.getItem('local_storage_array'));

    if(code_array == null)
    {
        alert("No records found");
        return false;
    }
    else
    {
        let flag = true;
        let index = 0;

        for(index=0; index<code_array.length;index++)   //checking for valid email and password for that email
        {
            //email and password both matches
            if((code_array[index].email_user) == emailid) /* && ((code_array[index].password_user) == passwd) */
            {
                let dec_pass = CryptoJS.AES.decrypt(code_array[index].password_user, "cuelogic");

                decrypted_pass = dec_pass.toString(CryptoJS.enc.Utf8);

                if(decrypted_pass == passwd)
                {
                    sessionStorage.setItem("logged_in_user",index);     //create session here and break
                    flag = true;
                    break;
                }
                else if(decrypted_pass != passwd)   //email found but matching password is not found
                {
                    alert("Wrong Password");
                    flag = false;
                    break;
                }        
            }
            else
            {
                flag == false;
            }
        }

        if((index == code_array.length) && (flag == false)) //no records found
        {   
            alert("No records found!!!");
            return false;
        }
        else if(flag == false)  //email found but wrong password
        {
            return false;
        }
        else    //email id and password both found and matches
        {
            return true;
        }
    }
}