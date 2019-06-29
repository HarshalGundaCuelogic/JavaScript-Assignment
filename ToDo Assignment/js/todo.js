function logout_user()
{
	sessionStorage.removeItem("logged_in_user");
	alert("Logged out successfully");
}

function add_todo_item()
{	
	let user_id =  sessionStorage.getItem("logged_in_user");
	let code_array = JSON.parse(localStorage.getItem("local_storage_array"));

	let myInput = document.getElementById("myInput").value;
	let sdate = document.getElementById("sdate").value;
	let ddate = document.getElementById("ddate").value;
	let ispublictrue = document.getElementById("ispublictrue").value;
	let categories = document.querySelector('input[name="categories"]:checked').value;
	let desc = document.getElementById("description").value;

	let todo_obj = {
		'todo_name' : myInput,
		'start_date' : sdate,
		'end_date' : ddate,
		'is_public' : ispublictrue,
		'categories' : categories,
		'description' : desc
	}

	code_array[user_id].to_do_user.push(todo_obj);

	localStorage.setItem("local_storage_array",JSON.stringify(code_array));

	let code_todo_array = code_array[user_id].to_do_user;

	let arr_length = (code_todo_array.length)-1;
	
	let new_row = document.createElement("tr");
	new_row.innerHTML = "<td>" + code_todo_array[arr_length].todo_name + "</td>" + 
						"<td>" + code_todo_array[arr_length].start_date + "</td>" +
						"<td>" + code_todo_array[arr_length].end_date + "</td>" +
						"<td>" + code_todo_array[arr_length].is_public + "</td>" +
						"<td>" + code_todo_array[arr_length].categories + "</td>" +
						"<td>" + code_todo_array[arr_length].description + "</td>" ;

	document.getElementById("todo_table").appendChild(new_row);

	/* window.location.reload(); */
}