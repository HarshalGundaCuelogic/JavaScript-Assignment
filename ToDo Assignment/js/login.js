function check_validity()
{
    //fetching the data from the form
    let emailid = document.getElementById("email").value;
    let passwd = document.getElementById("password").value;

    /* let regex_emailid = /^[a-zA-Z]{3,}$/; */ // /^([A-Za-z0-9_\-\.])+\@([a-z]){4,}\.([a-z]{2,4})$/;

    //applying email validation
    if(true) //if email validations are true
    {   
        let bRet = FetchItems(emailid,passwd)

        alert(bRet);

        if(bRet == true)
        {
            window.open('../html/todo_page.html'/* ,'_self' */);
        }
        else
        {
            
        }
    }   
    else    //email validations are false
    {
        alert("Invalid Email");
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
        return false;
    }
    else
    {
        let i = 0;
        let flag = true;

        for(i=0; i<code_array.length;i++)   //checking for valid email and password for that email
        {
            //email and password both matches
            if(((code_array[i].email_user) == emailid) && ((code_array[i].password_user) == passwd))
            {
                sessionStorage.setItem("logged_in_user",emailid);
                flag = true;
                break;//create session here and break
            }
            //email found but matching password is not found
            else if(((code_array[i].email_user) == emailid) && ((code_array[i].password_user) != passwd)) 
            {
                alert("Wrong Password");
                flag = false;
                break;
            }
            else
            {
                flag == false;
            }
        }

        if((i == code_array.length) && (flag == false)) //no records found
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