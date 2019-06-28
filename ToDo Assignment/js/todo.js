let code_array = JSON.parse(localStorage.getItem('local_storage_array'));


let hello_user = code_array;

document.getElementById("hello_user").innerHTML = hello_user;