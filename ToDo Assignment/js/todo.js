function logoutUser()
{
	sessionStorage.removeItem("loggedInUser");
	alert("Logged out successfully");
}

function addToDoItem()
{	
	let userId =  sessionStorage.getItem("loggedInUser");
	let codeArray = JSON.parse(localStorage.getItem("localStorageArray"));

	let myInput = document.getElementById("myInput").value;
	let sDate = document.getElementById("sDate").value;
	let dDate = document.getElementById("dDate").value;
	let isPublicTrue = document.getElementById("isPublicTrue").checked;
	let categories = document.querySelector('input[name="categories"]:checked').value;
	let desc = document.getElementById("description").value;

	let newStartDate = new Date(sDate);
	let newDueDate = new Date(dDate);

	if(myInput == "")
	{
		alert("Title is blank")
		return;
	}

	if(sDate == "")
	{
		alert("Please set the start date");
		return;
	}

	if(dDate == "")
	{
		alert("Please set the end date");
		return;
	}

	if(newDueDate.getTime() < newStartDate.getTime())
	{
		alert("Due date should come after the start date");
		return;
	}

	if(desc == "")
	{
		alert("Please enter the description");
		return;
	}
	
	isPublicTrue = isPublicTrue === true ? "Yes" : "No";

	let toDoObj = {
		'toDoName' : myInput,
		'startDate' : sDate,
		'endDate' : dDate,
		'isPublic' : isPublicTrue,
		'categories' : categories,
		'description' : desc,
		'status' : 'pending',
		'id' : new Date().getTime()
	}

	codeArray[userId].toDoUser.push(toDoObj);

	localStorage.setItem("localStorageArray",JSON.stringify(codeArray));

	/* let codeToDoArray = codeArray[userId].toDoUser;

	let arrLength = (codeToDoArray.length)-1;
	
	let newRow = document.createElement("tr");
	
	newRow.innerHTML = "<td>" + "<input type='checkbox' class='select_todo' value='yes'" + "</td>" + 
						"<td>" + codeToDoArray[arrLength].toDoName + "</td>" + 
						"<td>" + codeToDoArray[arrLength].startDate + "</td>" +
						"<td>" + codeToDoArray[arrLength].endDate + "</td>" +
						"<td>" + codeToDoArray[arrLength].isPublic + "</td>" +
						"<td>" + codeToDoArray[arrLength].categories + "</td>" +
						"<td>" + codeToDoArray[arrLength].description + "</td>" ;

	document.getElementById("todo_table").appendChild(newRow); */
	window.location.reload();
}

function showUsersToDoOnPageLoad()
{
	let userId =  sessionStorage.getItem("loggedInUser");
	let codeArray = JSON.parse(localStorage.getItem("localStorageArray"));
	let codeToDoArray = codeArray[userId].toDoUser;

	if(codeToDoArray.length == 0)
	{
		document.getElementsByClassName("left")[0].style.display = "none";
		document.getElementById("noDataFound").style.display = "inline-block";
	}
	
	let currentDate = new Date();
	let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
	let date = ('0' + currentDate.getDate()).slice(-2);
	let year = currentDate.getFullYear();
	currentDate = year + '-' + month + '-' + date;

	document.getElementById("sDate").min = currentDate;
	document.getElementById("dDate").min = currentDate;

	PrintTable(codeToDoArray);
}

function deleteToDoItem()
{
	let confirmDelete = confirm("Do you want to delete?");

	if(confirmDelete == true)
	{
		let codeArray = JSON.parse(localStorage.getItem("localStorageArray"));	//fetching the array from local storage
		let userId = sessionStorage.getItem("loggedInUser");		//fetching which user is logged in (its index in users array)
		let codeToDoArray = codeArray[userId].toDoUser;	//array of todo items

		let checkboxItemsArray = document.getElementsByName("selectedCheckbox");	//array of the checkboxes
		
		let checkedArray = [];
		let toDoString;
		let toDoId;

		//find the checked elements from the array which wants to delete
		for(let iCnt = 0; iCnt < (checkboxItemsArray.length); iCnt++)	
		{
			toDoString = checkboxItemsArray[iCnt].id;
			toDoId = toDoString.split("-");

			if(document.getElementById("checkbox-"+toDoId[1]).checked == true)
			{
				checkedArray.push(toDoId[1]);
			}
		}

		for(let jCnt = checkedArray.length-1; jCnt >= 0 ;jCnt--)
		{
			for(let k = 0; k < codeToDoArray.length; k++)
			{
				if(checkedArray[jCnt] == codeToDoArray[k].id)
				{
					codeArray[userId].toDoUser.splice(k,1);	
					document.getElementById("row-"+checkedArray[jCnt]).remove();
				}
			}
		}

		localStorage.setItem("localStorageArray",JSON.stringify(codeArray));		//set the changes in the local storage
		window.location.reload();
	}
}

function editToDoItem()
{
	let codeArray = JSON.parse(localStorage.getItem("localStorageArray"));	//fetching the array from local storage
	
	let userId = sessionStorage.getItem("loggedInUser");		//fetching which user is logged in (its index in users array)

	let codeToDoArray = codeArray[userId].toDoUser;		//array of todo items

	let checkboxItemsArray = document.getElementsByName("selectedCheckbox");	//array of the checkboxes
	
	let flag = 0;
	let iCnt = 0;
	let edit_item = 0;

	/* let checkedArray = [];
	let toDoString;
	let toDoId;

	for(let iCnt = 0; iCnt < (checkboxItemsArray.length); iCnt++)	
	{
		toDoString = checkboxItemsArray[iCnt].id;
		toDoId = toDoString.split("-");

		if(document.getElementById("checkbox-"+toDoId[1]).checked == true)
		{
			checkedArray.push(toDoId[1]);
		}
	}

	for(let jCnt = checkedArray.length-1; jCnt >= 0 ;jCnt--)
	{
		for(let k = 0; k < codeToDoArray.length; k++)
		{
			if(checkedArray[jCnt] == codeToDoArray[k].id)
			{
				codeArray[userId].toDoUser.splice(k,1);
				document.getElementById("row-"+checkedArray[jCnt]).remove();
			}
		}
	} */

	//find the checked elements from the array which wants to delete
    for(iCnt = (codeArray[userId].toDoUser.length-1); iCnt >= 0; iCnt--)	
    {
    	if(checkboxItemsArray[iCnt].checked === true)	//if item is checked for deletion
        {
			flag++;
			edit_item = iCnt;
        }
	}

	if(flag == 1)
	{	
		if(checkboxItemsArray[edit_item].checked === true)	//if item is checked for deletion
		{
			document.getElementById("myInput").value = codeArray[userId].toDoUser[edit_item].toDoName;
			document.getElementById("sDate").value = codeArray[userId].toDoUser[edit_item].startDate;
			document.getElementById("dDate").value = codeArray[userId].toDoUser[edit_item].endDate;

			//isPublic item is not checked
			if((codeArray[userId].toDoUser[edit_item].isPublic) == "No")	
			{
				document.getElementById("isPublicTrue").checked = false;	//do not check the field
			}
			else	//isPublic item is checked
			{
				document.getElementById("isPublicTrue").checked = true;		//check the field
			}
			
			if((codeArray[userId].toDoUser[edit_item].categories) == "Home")
			{
				document.getElementsByName("categories")[0].checked = true;
			}
			else if((codeArray[userId].toDoUser[edit_item].categories) == "Personal")
			{
				document.getElementsByName("categories")[1].checked = true;
			}
			else
			{
				document.getElementsByName("categories")[2].checked = true;
			}

			document.getElementById("description").value = codeArray[userId].toDoUser[edit_item].description;

			document.getElementById("add").style.display = "none";
			document.getElementById("delete").disabled = true;
			document.getElementById("save").style.display = "inline-block";
			sessionStorage.setItem("toDoArrayIndex",edit_item);
			/* codeArray[userId].toDoUser[edit_item].toDoName = ; */
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

	/* localStorage.setItem("localStorageArray",JSON.stringify(codeArray));		//set the changes in the local storage */

	/* window.location.reload();  */	//refresh the page
}

function saveChanges()
{
	let index = sessionStorage.getItem("toDoArrayIndex");
	
	let codeArray = JSON.parse(localStorage.getItem("localStorageArray"));	//fetching the array from local storage
	
	let userId = sessionStorage.getItem("loggedInUser");		//fetching which user is logged in (its index in users array)

	//let codeToDoArray = codeArray[userId].toDoUser;	//array of todo items

	codeArray[userId].toDoUser[index].toDoName = document.getElementById("myInput").value;
	codeArray[userId].toDoUser[index].startDate = document.getElementById("sDate").value;
	codeArray[userId].toDoUser[index].endDate = document.getElementById("dDate").value;

	if(document.getElementById("isPublicTrue").checked == true)
	{
		codeArray[userId].toDoUser[index].isPublic = "Yes";
	}
	else
	{
		codeArray[userId].toDoUser[index].isPublic = "No";
	}

	if(document.getElementsByName("categories")[0].checked == true)
	{
		codeArray[userId].toDoUser[index].categories = "Home";
	}
	else if(document.getElementsByName("categories")[1].checked == true)
	{
		codeArray[userId].toDoUser[index].categories = "Personal";
	}
	else
	{
		codeArray[userId].toDoUser[index].categories = "Office";
	}
	
	codeArray[userId].toDoUser[index].description = document.getElementById("description").value;

	localStorage.setItem("localStorageArray",JSON.stringify(codeArray));
	sessionStorage.removeItem("toDoArrayIndex");
}

function markDone()
{
	let codeArray = JSON.parse(localStorage.getItem("localStorageArray"));	//fetching the array from local storage
	
	let userId = sessionStorage.getItem("loggedInUser");		//fetching which user is logged in (its index in users array)

	let checkboxItemsArray = document.getElementsByName("selectedCheckbox");	//array of the checkboxes

	let flag = 0;

	for(iCnt = 0; iCnt <= (checkboxItemsArray.length-1); iCnt++)	
    {
    	if(checkboxItemsArray[iCnt].checked === true)	//if item is checked for moved to done
        {
			flag++;
			codeArray[userId].toDoUser[iCnt].status = "done";
        }
	}

	if(flag == 0)
	{
		alert("Select the items to mark as done")
	}
	else
	{
		localStorage.setItem("localStorageArray",JSON.stringify(codeArray));
		window.location.reload();
	}
}

function filterToDo()
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
		let codeArray = JSON.parse(localStorage.getItem("localStorageArray"));	//fetching the array from local storage
		let userId = sessionStorage.getItem("loggedInUser");		//fetching which user is logged in (its index in users array)
		let codeToDoArray = codeArray[userId].toDoUser;	//fetching todo array of that user
		/* show_users_todo_on_page_load(); */
		document.getElementById("filter_status").style.display = "none";
		document.getElementById("filter_categories").style.display = "none";
		document.getElementById("date_filters").style.display = "none";
		clearTable();

		PrintTable(codeToDoArray);
	}

}

function filterToDoByCategories()
{
	let codeArray = JSON.parse(localStorage.getItem("localStorageArray"));	//fetching the array from local storage
	let userId = sessionStorage.getItem("loggedInUser");		//fetching which user is logged in (its index in users array)
	let codeToDoArray = codeArray[userId].toDoUser;	//fetching todo array of that user

	let filterValueCategories = document.getElementById("filter_categories").value;

	if(filterValueCategories == "Home")
	{
		let homeUserArray = codeToDoArray.filter(function(categoryHome){
				return(categoryHome.categories === "Home")
				})

		//document.getElementById("todo_table_body").style.display = "none";

		clearTable();

		PrintTable(homeUserArray);
		return homeUserArray;
	}
	else if(filterValueCategories == "Personal")
	{
		let personalUserArray = codeToDoArray.filter(function(categoryPersonal){
				return(categoryPersonal.categories === "Personal")
				})
		
		clearTable();

		PrintTable(personalUserArray);
		return personalUserArray;
	}
	else if(filterValueCategories == "Office")
	{
		let officeUserArray = codeToDoArray.filter(function(categoryOffice){
				return(categoryOffice.categories === "Office")
				})
		
		clearTable();
		
		PrintTable(officeUserArray);
		return officeUserArray;
	}
	else
	{
		clearTable();

		PrintTable(codeToDoArray);
		return codeToDoArray;
	}
}

function filterToDoByStatus()
{
	let codeArray = JSON.parse(localStorage.getItem("localStorageArray"));	//fetching the array from local storage
	let userId = sessionStorage.getItem("loggedInUser");		//fetching which user is logged in (its index in users array)
	let codeToDoArray = codeArray[userId].toDoUser;	//fetching todo array of that user

	let filter_value_status = document.getElementById("filter_status").value;

	if(filter_value_status == "done")
	{
		let status_done_array = codeToDoArray.filter(function(done_status){
			return(done_status.status === "done")
			})

		clearTable();	
		PrintTable(status_done_array);
		return status_done_array;
	}
	else if(filter_value_status == "pending")
	{
		let pending_done_array = codeToDoArray.filter(function(pending_status){
			return(pending_status.status === "pending")
			})

		clearTable();
		PrintTable(pending_done_array);
		return pending_done_array;
	}
	else
	{
		clearTable();
		PrintTable(codeToDoArray);
		return codeToDoArray;
	}
}

function filterToDoByDate()
{
	if(document.getElementById("filter_sDate") == "")
	{
		alert("Please select the start date");
		return;
	}
	else if(document.getElementById("filter_dDate") == "")
	{
		alert("Please select the end date");
		return;
	}
	else
	{
		let codeArray = JSON.parse(localStorage.getItem("localStorageArray"));	//fetching the array from local storage
		let userId = sessionStorage.getItem("loggedInUser");		//fetching which user is logged in (its index in users array)
		let codeToDoArray = codeArray[userId].toDoUser;	//fetching todo array of that user

		let sDate = document.getElementById("filter_sDate").value;
		let dDate = document.getElementById("filter_dDate").value;

		let newStartDate = new Date(sDate);
		let newDueDate = new Date(dDate);

		if(newStartDate.getTime() > newDueDate.getTime())
		{
			alert("'From' date should come before 'to' date");
			return;
		}

		let dateArray = codeToDoArray.filter(function(date1){
			
			return((new Date(date1.startDate).getTime() >= newStartDate.getTime()) && 
				   	(new Date(date1.startDate).getTime() <= newDueDate.getTime()))
			})

		clearTable();
		
		PrintTable(dateArray);
		return(dateArray);
	}
}

function clearTable()
{
	let tableBody = document.getElementById("todo_table_body");
	let deleteRow = tableBody.lastElementChild;

	while(deleteRow)
	{
		tableBody.removeChild(deleteRow);
		deleteRow = tableBody.lastElementChild;
	}
}

function PrintTable(arr)
{
	for(let i=0; i<arr.length; i++)
	{
		let newRow = document.createElement("tr");
		newRow.setAttribute("id", "row-" + arr[i].id);
		newRow.innerHTML = "<td>" + "<input name='selectedCheckbox' type='checkbox' value='yes' id='checkbox-" + arr[i].id + "' </td>" + 
							"<td>" + arr[i].toDoName + "</td>" + 
							"<td>" + arr[i].startDate + "</td>" +
							"<td>" + arr[i].endDate + "</td>" +
							"<td>" + arr[i].isPublic + "</td>" +
							"<td>" + arr[i].categories + "</td>" +
							"<td>" + "<button class='read_todo' id='view-" + arr[i].id + "' onclick='readDesc(" + i + ")'>View</button" + "</td>" +
							"<td>" + arr[i].status + "</td>";
				
		document.getElementById("todo_table_body").appendChild(newRow);
	}
}

function readDesc(i)
{
	// let codeArray = JSON.parse(localStorage.getItem("localStorageArray"));	//fetching the array from local storage
	let filteredArray =  filterToDoByCategories();
	if( !filteredArray )
	{
		filteredArray = filterToDoByStatus();
		
		if(!filteredArray) 
		{
			filteredArray = filterToDoByDate();
		}
	}
	
	alert(filteredArray[i].description);
}