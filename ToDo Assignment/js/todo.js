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

	let new_sdate = new Date(sdate);
	let new_ddate = new Date(ddate);

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

	if(new_ddate.getTime() < new_sdate.getTime())
	{
		alert("Due date should come after the start date");
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
		'description' : desc,
		'status' : 'pending',
		'id' : new Date().getTime()
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

	let current_date = new Date();
	let month = ('0' + (current_date.getMonth() + 1)).slice(-2);
	let date = ('0' + current_date.getDate()).slice(-2);
	let year = current_date.getFullYear();
	current_date = year + '-' + month + '-' + date;

	document.getElementById("sdate").min = current_date;
	document.getElementById("ddate").min = current_date;

	PrintTable(code_todo_array);
}

function delete_todo_item()
{
	let confirm_delete = confirm("Do you want to delete?");

	if(confirm_delete == true)
	{
		let code_array = JSON.parse(localStorage.getItem("local_storage_array"));	//fetching the array from local storage
	
		let user_id = sessionStorage.getItem("logged_in_user");		//fetching which user is logged in (its index in users array)

		let code_todo_array = code_array[user_id].to_do_user;	//array of todo items

		let select_items_checkbox = document.getElementsByName("selected_checkbox");	//array of the checkboxes
		
		let checkedarray = [];
		let todostring;
		let todoid;

		//find the checked elements from the array which wants to delete
		for(let iCnt = 0; iCnt < (select_items_checkbox.length); iCnt++)	
		{
			todostring = select_items_checkbox[iCnt].id;
			todoid = todostring.split("-");

			if(document.getElementById("checkbox-"+todoid[1]).checked == true)
			{
				checkedarray.push(todoid[1]);
			}
		}

		for(let jCnt = checkedarray.length-1; jCnt >= 0 ;jCnt--)
		{
			for(let k = 0; k < code_todo_array.length; k++)
			{
				if(checkedarray[jCnt] == code_todo_array[k].id)
				{
					code_array[user_id].to_do_user.splice(k,1);	
					document.getElementById("row-"+checkedarray[jCnt]).remove();
				}
			}
		}

		localStorage.setItem("local_storage_array",JSON.stringify(code_array));		//set the changes in the local storage
	}
}

function edit_todo_item()
{
	let code_array = JSON.parse(localStorage.getItem("local_storage_array"));	//fetching the array from local storage
	
	let user_id = sessionStorage.getItem("logged_in_user");		//fetching which user is logged in (its index in users array)

	let code_todo_array = code_array[user_id].to_do_user;	//array of todo items

	let select_items_checkbox = document.getElementsByName("selected_checkbox");	//array of the checkboxes
	
	let flag = 0;
	let iCnt = 0;
	let edit_item = 0;

	/* let checkedarray = [];
	let todostring;
	let todoid;

	for(let iCnt = 0; iCnt < (select_items_checkbox.length); iCnt++)	
	{
		todostring = select_items_checkbox[iCnt].id;
		todoid = todostring.split("-");

		if(document.getElementById("checkbox-"+todoid[1]).checked == true)
		{
			checkedarray.push(todoid[1]);
		}
	}

	for(let jCnt = checkedarray.length-1; jCnt >= 0 ;jCnt--)
	{
		for(let k = 0; k < code_todo_array.length; k++)
		{
			if(checkedarray[jCnt] == code_todo_array[k].id)
			{
				code_array[user_id].to_do_user.splice(k,1);
				document.getElementById("row-"+checkedarray[jCnt]).remove();
			}
		}
	} */

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

	if(document.getElementsByName("categories")[0].checked == true)
	{
		code_array[user_id].to_do_user[index].categories = "Home";
	}
	else if(document.getElementsByName("categories")[1].checked == true)
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

function mark_done()
{
	let code_array = JSON.parse(localStorage.getItem("local_storage_array"));	//fetching the array from local storage
	
	let user_id = sessionStorage.getItem("logged_in_user");		//fetching which user is logged in (its index in users array)

	let select_items_checkbox = document.getElementsByName("selected_checkbox");	//array of the checkboxes

	let flag = 0;

	for(iCnt = 0; iCnt <= (select_items_checkbox.length-1); iCnt++)	
    {
    	if(select_items_checkbox[iCnt].checked === true)	//if item is checked for moved to done
        {
			flag++;
			code_array[user_id].to_do_user[iCnt].status = "done";
        }
	}

	if(flag == 0)
	{
		alert("Select the items to mark as done")
	}
	else
	{
		localStorage.setItem("local_storage_array",JSON.stringify(code_array));
		window.location.reload();
	}
}

function filter_todo()
{
	filter_value = document.getElementById("filterby").value;

	if(filter_value == "categories")
	{
		document.getElementById("filter_status").style.display = "none";
		document.getElementById("filter_categories").style.display = "inline-block";
		document.getElementById("date_filters").style.display = "none";
	}
	else if(filter_value == "status")
	{
		document.getElementById("filter_status").style.display = "inline-block";
		document.getElementById("filter_categories").style.display = "none";
		document.getElementById("date_filters").style.display = "none";
	}
	else if(filter_value == "date")
	{
		document.getElementById("filter_status").style.display = "none";
		document.getElementById("filter_categories").style.display = "none";
		document.getElementById("date_filters").style.display = "inline-block";
	}
	else
	{
		let code_array = JSON.parse(localStorage.getItem("local_storage_array"));	//fetching the array from local storage
		let user_id = sessionStorage.getItem("logged_in_user");		//fetching which user is logged in (its index in users array)
		let code_todo_array = code_array[user_id].to_do_user;	//fetching todo array of that user
		/* show_users_todo_on_page_load(); */
		document.getElementById("filter_status").style.display = "none";
		document.getElementById("filter_categories").style.display = "none";
		document.getElementById("date_filters").style.display = "none";
		clearTable();

		PrintTable(code_todo_array);
	}

}

function filter_todo_by_categories()
{
	let code_array = JSON.parse(localStorage.getItem("local_storage_array"));	//fetching the array from local storage
	let user_id = sessionStorage.getItem("logged_in_user");		//fetching which user is logged in (its index in users array)
	let code_todo_array = code_array[user_id].to_do_user;	//fetching todo array of that user

	let filter_value_categories = document.getElementById("filter_categories").value;

	if(filter_value_categories == "Home")
	{
		let home_user_array = code_todo_array.filter(function(category_home){
				return(category_home.categories === "Home")
				})

		//document.getElementById("todo_table_body").style.display = "none";

		clearTable();

		PrintTable(home_user_array);
		return home_user_array;
	}
	else if(filter_value_categories == "Personal")
	{
		let personal_user_array = code_todo_array.filter(function(category_personal){
				return(category_personal.categories === "Personal")
				})
		
		clearTable();

		PrintTable(personal_user_array);
		return personal_user_array;
	}
	else if(filter_value_categories == "Office")
	{
		let office_user_array = code_todo_array.filter(function(category_office){
				return(category_office.categories === "Office")
				})
		
		clearTable();
		
		PrintTable(office_user_array);
		return office_user_array;
	}
	else
	{
		clearTable();

		PrintTable(code_todo_array);
		return code_todo_array;
	}
}

function filter_todo_by_status()
{
	let code_array = JSON.parse(localStorage.getItem("local_storage_array"));	//fetching the array from local storage
	let user_id = sessionStorage.getItem("logged_in_user");		//fetching which user is logged in (its index in users array)
	let code_todo_array = code_array[user_id].to_do_user;	//fetching todo array of that user

	let filter_value_status = document.getElementById("filter_status").value;

	if(filter_value_status == "done")
	{
		let status_done_array = code_todo_array.filter(function(done_status){
			return(done_status.status === "done")
			})

		clearTable();	
		PrintTable(status_done_array);
		return status_done_array;
	}
	else if(filter_value_status == "pending")
	{
		let pending_done_array = code_todo_array.filter(function(pending_status){
			return(pending_status.status === "pending")
			})

		clearTable();
		PrintTable(pending_done_array);
		return pending_done_array;
	}
	else
	{
		clearTable();
		PrintTable(code_todo_array);
		return code_todo_array;
	}
}

function filter_todo_by_date()
{
	if(document.getElementById("filter_sdate") == "")
	{
		alert("Please select the start date");
		return;
	}
	else if(document.getElementById("filter_ddate") == "")
	{
		alert("Please select the end date");
		return;
	}
	else
	{
		let code_array = JSON.parse(localStorage.getItem("local_storage_array"));	//fetching the array from local storage
		let user_id = sessionStorage.getItem("logged_in_user");		//fetching which user is logged in (its index in users array)
		let code_todo_array = code_array[user_id].to_do_user;	//fetching todo array of that user

		let sdate = document.getElementById("filter_sdate").value;
		let ddate = document.getElementById("filter_ddate").value;

		let new_sdate = new Date(sdate);
		let new_ddate = new Date(ddate);

		if(new_sdate.getTime() > new_ddate.getTime())
		{
			alert("'From' date should come before 'to' date");
			return;
		}

		let date_array = code_todo_array.filter(function(date1){
			
			return((new Date(date1.start_date).getTime() >= new_sdate.getTime()) && 
				   	(new Date(date1.start_date).getTime() <= new_ddate.getTime()))
			})

		clearTable();
		
		PrintTable(date_array);
		return(date_array);
	}
}

function clearTable()
{
	let table_body = document.getElementById("todo_table_body");
	let deleterow = table_body.lastElementChild;

	while(deleterow)
	{
		table_body.removeChild(deleterow);
		deleterow = table_body.lastElementChild;
	}
}

function PrintTable(arr)
{
	let code_array = JSON.parse(localStorage.getItem("local_storage_array"));	//fetching the array from local storage
	let user_id = sessionStorage.getItem("logged_in_user");		//fetching which user is logged in (its index in users array)
	let code_todo_array = code_array[user_id].to_do_user;	//fetching todo array of that user

	for(let i=0; i<arr.length; i++)
	{
		let new_row = document.createElement("tr");
		new_row.setAttribute("id", "row-"+arr[i].id);
		new_row.innerHTML = "<td>" + "<input name='selected_checkbox' type='checkbox' value='yes' id='checkbox-" + arr[i].id + "' </td>" + 
							"<td>" + arr[i].todo_name + "</td>" + 
							"<td>" + arr[i].start_date + "</td>" +
							"<td>" + arr[i].end_date + "</td>" +
							"<td>" + arr[i].is_public + "</td>" +
							"<td>" + arr[i].categories + "</td>" +
							"<td>" + "<button class='read_todo' id='view-" + arr[i].id + "' onclick='read_desc(" + i + ")'>View</button" + "</td>" +
							"<td>" + arr[i].status + "</td>";
							/* "<td>" + "<button class='edit_todo' id='edit-" + arr[i].id + "' onclick='edit_todo_item(" + i + ")'>Edit</button" + "</td>" ; */
				
		document.getElementById("todo_table_body").appendChild(new_row);
	}
}

function read_desc(i)
{
	// let code_array = JSON.parse(localStorage.getItem("local_storage_array"));	//fetching the array from local storage
	let filteredArray =  filter_todo_by_categories();
	if( !filteredArray )
	{
		filteredArray = filter_todo_by_status();
		
		if(!filteredArray) 
		{
			filteredArray = filter_todo_by_date();
		}
	}
	
	alert(filteredArray[i].description);
}