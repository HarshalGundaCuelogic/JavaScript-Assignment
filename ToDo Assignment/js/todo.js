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
	let ispublictrue = document.getElementById("ispublictrue").checked;
	let categories = document.querySelector('input[name="categories"]:checked').value;
	let desc = document.getElementById("description").value;

	if(myInput == "")
	{
		alert("Title is blank")
		return;
	}

	if(sdate == "")
	{
		alert("Please set the start date");
		return;
	}

	if(ddate == "")
	{
		alert("Please set the end date");
		return;
	}

	if(desc == "")
	{
		alert("Please enter the description");
		return;
	}
	
	ispublictrue = ispublictrue === true ? "Yes" : "No";

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

	/* let code_todo_array = code_array[user_id].to_do_user;

	let arr_length = (code_todo_array.length)-1;
	
	let new_row = document.createElement("tr");
	
	new_row.innerHTML = "<td>" + "<input type='checkbox' class='select_todo' value='yes'" + "</td>" + 
						"<td>" + code_todo_array[arr_length].todo_name + "</td>" + 
						"<td>" + code_todo_array[arr_length].start_date + "</td>" +
						"<td>" + code_todo_array[arr_length].end_date + "</td>" +
						"<td>" + code_todo_array[arr_length].is_public + "</td>" +
						"<td>" + code_todo_array[arr_length].categories + "</td>" +
						"<td>" + code_todo_array[arr_length].description + "</td>" ;

	document.getElementById("todo_table").appendChild(new_row); */
	window.location.reload();
}

function show_users_todo_on_page_load()
{
	let user_id =  sessionStorage.getItem("logged_in_user");
	let code_array = JSON.parse(localStorage.getItem("local_storage_array"));
	let code_todo_array = code_array[user_id].to_do_user;

	for(let i=0; i<(code_todo_array.length); i++)
	{
		let new_row = document.createElement("tr");

		new_row.innerHTML = "<td>" + "<input name='selected_checkbox' type='checkbox' value='yes'" + "</td>" + 
							"<td>" + code_todo_array[i].todo_name + "</td>" + 
							"<td>" + code_todo_array[i].start_date + "</td>" +
							"<td>" + code_todo_array[i].end_date + "</td>" +
							"<td>" + code_todo_array[i].is_public + "</td>" +
							"<td>" + code_todo_array[i].categories + "</td>" +
							"<td>" + code_todo_array[i].description + "</td>" ;

		document.getElementById("todo_table").appendChild(new_row);
	}
}

function delete_todo_item()
{
	let confirm_delete = confirm("Do you want to delete?");

	if(confirm_delete == true)
	{
		let code_array = JSON.parse(localStorage.getItem("local_storage_array"));	//fetching the array from local storage
	
		let user_id = sessionStorage.getItem("logged_in_user");		//fetching which user is logged in (its index in users array)

		//let code_todo_array = code_array[user_id].to_do_user;	//array of todo items

		let select_items_checkbox = document.getElementsByName("selected_checkbox");	//array of the checkboxes

		//find the checked elements from the array which wants to delete
		for(let iCnt = (code_array[user_id].to_do_user.length-1); iCnt >= 0; iCnt--)	
		{
			if(select_items_checkbox[iCnt].checked === true)	//if item is checked for deletion
			{
				code_array[user_id].to_do_user.splice(iCnt,1); //then delete that todo from the todo array
			}
		}

		localStorage.setItem("local_storage_array",JSON.stringify(code_array));		//set the changes in the local storage

		window.location.reload(); 	//refresh the page
	}
}

function edit_todo_item()
{
	let code_array = JSON.parse(localStorage.getItem("local_storage_array"));	//fetching the array from local storage
	
	let user_id = sessionStorage.getItem("logged_in_user");		//fetching which user is logged in (its index in users array)

	//let code_todo_array = code_array[user_id].to_do_user;	//array of todo items

	let select_items_checkbox = document.getElementsByName("selected_checkbox");	//array of the checkboxes
	
	let flag = 0;
	let iCnt = 0;
	let edit_item = 0;

	//find the checked elements from the array which wants to delete
    for(iCnt = (code_array[user_id].to_do_user.length-1); iCnt >= 0; iCnt--)	
    {
    	if(select_items_checkbox[iCnt].checked === true)	//if item is checked for deletion
        {
			flag++;
			edit_item = iCnt;
        }
	}

	if(flag == 1)
	{	
		if(select_items_checkbox[edit_item].checked === true)	//if item is checked for deletion
		{
			document.getElementById("myInput").value = code_array[user_id].to_do_user[edit_item].todo_name;
			document.getElementById("sdate").value = code_array[user_id].to_do_user[edit_item].start_date;
			document.getElementById("ddate").value = code_array[user_id].to_do_user[edit_item].end_date;

			//is_public item is not checked
			if((code_array[user_id].to_do_user[edit_item].is_public) == "No")	
			{
				document.getElementById("ispublictrue").checked = false;	//do not check the field
			}
			else	//is_public item is checked
			{
				document.getElementById("ispublictrue").checked = true;		//check the field
			}
			
			if((code_array[user_id].to_do_user[edit_item].categories) == "Home")
			{
				document.getElementsByName("categories")[0].checked = true;
			}
			else if((code_array[user_id].to_do_user[edit_item].categories) == "Personal")
			{
				document.getElementsByName("categories")[1].checked = true;
			}
			else
			{
				document.getElementsByName("categories")[2].checked = true;
			}

			document.getElementById("description").value = code_array[user_id].to_do_user[edit_item].description;

			document.getElementById("add").style.display = "none";
			document.getElementById("update").disabled = true;
			document.getElementById("delete").disabled = true;
			document.getElementById("save").style.display = "inline-block";
			sessionStorage.setItem("todo_array_index",edit_item);
			/* code_array[user_id].to_do_user[edit_item].todo_name = ; */
		}
	}
	else if(flag == 0)
	{
		alert("Select atleast one item to edit");
	}
	else
	{
		alert("Only one item at a time can be edited");
	}

	/* localStorage.setItem("local_storage_array",JSON.stringify(code_array));		//set the changes in the local storage */

	/* window.location.reload();  */	//refresh the page
}

function save_changes()
{
	let index = sessionStorage.getItem("todo_array_index");
	
	let code_array = JSON.parse(localStorage.getItem("local_storage_array"));	//fetching the array from local storage
	
	let user_id = sessionStorage.getItem("logged_in_user");		//fetching which user is logged in (its index in users array)

	//let code_todo_array = code_array[user_id].to_do_user;	//array of todo items

	code_array[user_id].to_do_user[index].todo_name = document.getElementById("myInput").value;
	code_array[user_id].to_do_user[index].start_date = document.getElementById("sdate").value;
	code_array[user_id].to_do_user[index].end_date = document.getElementById("ddate").value;

	if(document.getElementById("ispublictrue").checked == true)
	{
		code_array[user_id].to_do_user[index].is_public = "Yes";
	}
	else
	{
		code_array[user_id].to_do_user[index].is_public = "No";
	}

	if(document.getElementsByName("categories")[0].checked = true)
	{
		code_array[user_id].to_do_user[index].categories = "Home";
	}
	else if(document.getElementsByName("categories")[1].checked = true)
	{
		code_array[user_id].to_do_user[index].categories = "Personal";
	}
	else
	{
		code_array[user_id].to_do_user[index].categories = "Office";
	}
	
	code_array[user_id].to_do_user[index].description = document.getElementById("description").value;

	localStorage.setItem("local_storage_array",JSON.stringify(code_array));
	sessionStorage.removeItem("todo_array_index");
}