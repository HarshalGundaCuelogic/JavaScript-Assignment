function enable_fields()
{
    /* let code_array = JSON.parse(localStorage.getItem('local_storage_array')); */
    document.getElementById("fname").disabled = false;
    document.getElementById("lname").disabled = false;
    document.getElementById("address").disabled = false;
    document.getElementById("password").disabled = false;
    document.getElementsByClassName("radio").disabled = false;
    /* document.getElementById("confirm_password").disabled = false; */
}