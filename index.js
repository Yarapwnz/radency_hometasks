let showArchive = false;
let categories = ["Task", "Random Thought", "Idea"];
let isEdit = null;
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
	let addTxt = document.getElementById("addTxt");
	let addCrt = document.getElementById("addCrt");
	let addCat = document.getElementById("addCat");
	let addCon = document.getElementById("addCon");
	let addDat = document.getElementById("addDat");
	let notes = localStorage.getItem("notes");

	if (notes == null) notesObj = [];
	else notesObj = JSON.parse(notes);

	if (isEdit) {
		const current = notesObj[isEdit];
		current.name = addTxt.value;
		current.created = addCrt.value;
		current.category = addCat.value;
		current.content = addCon.value;
		current.dates = addDat.value;
		localStorage.setItem("notes", JSON.stringify(notesObj));
		isEdit = null;
		showNotes();
	} else {
		const lastID = notesObj[notesObj.length - 1]
			? notesObj[notesObj.length - 1].id + 1
			: 0;
		notesObj.push({
			id: lastID,
			name: addTxt.value,
			created: addCrt.value,
			category: addCat.value,
			content: addCon.value,
			dates: addDat.value,
		});
		localStorage.setItem("notes", JSON.stringify(notesObj));
		addTxt.value = "";
		addCrt.value = "";
		addCat.value = "Task";
		addCon.value = "";
		addDat.value = "";

		showNotes();
	}
});

function setIsArchive(index) {
	let notes = localStorage.getItem("notes");

	if (notes == null) notesObj = [];
	else notesObj = JSON.parse(notes);

	if (showArchive) {
		notesObj[index].isArchive = false;
	} else {
		notesObj[index].isArchive = true;
	}

	localStorage.setItem("notes", JSON.stringify(notesObj));
	showNotes();
}

function showNotes() {
	let notes = localStorage.getItem("notes");

	if (notes == null) notesObj = [];
	else notesObj = JSON.parse(notes);

	if (showArchive) {
		notesObj = notesObj.filter((value) => {
			return value.isArchive;
		});
		document.getElementById("changeText").innerHTML = `Archive Tasks`;
	} else {
		notesObj = notesObj.filter((value) => {
			return !value.isArchive;
		});
		document.getElementById("changeText").innerHTML = `Tasks`;
	}

	let html = "";
	notesObj.forEach(function (element, index) {
		html += `<tr>
        <td>${element.name}</td>
        <td>${element.created}</td>
        <td>${element.category}</td>
        <td>${element.content}</td>
        <td>${element.dates}</td>
        <td><i class="bi bi-pencil" id="${index}" onclick="editData(${element.id})"></i></td>
        <td><i class="bi bi-archive" id="${index}" onclick="setIsArchive(${element.id})"></i></td>
        <td><i class="bi bi-x" id="${index}" onclick="deleteNote(${element.id})"></i></td>
    </tr>`;
	});

	let notesElm = document.getElementById("notes");
	if (notesObj.length != 0) notesElm.innerHTML = html;
	else
		notesElm.innerHTML = `Nothing to show! 
        Use "Add a Note" section above to add notes.`;

	showNotesCategories();
}

function deleteNote(index) {
	let notes = localStorage.getItem("notes");

	if (notes == null) notesObj = [];
	else notesObj = JSON.parse(notes);

	notesObj.splice(index, 1);

	localStorage.setItem("notes", JSON.stringify(notesObj));

	showNotes();
}

function showNotesCategories() {
	let notes = localStorage.getItem("notes");

	if (notes == null) notesObj = [];
	else notesObj = JSON.parse(notes);
	let html = "";
	categories.forEach((category) => {
		const countActive = notesObj.filter(
			(el) => el.category == category && !el.isArchive
		).length;
		const countArchive = notesObj.filter(
			(el) => el.category == category && el.isArchive
		).length;
		html += `<tr>
        <td>${category}</td>
        <td>${countActive}</td>
        <td>${countArchive}</td>
    	</tr>`;
	});

	let notesElm = document.getElementById("notesCategories");
	if (notesObj.length != 0) notesElm.innerHTML = html;
	else
		notesElm.innerHTML = `Nothing to show! 
        Use "Add a Note" section above to add notes.`;
}

function editData(index) {
	let addTxt = document.getElementById("addTxt");
	let addCrt = document.getElementById("addCrt");
	let addCat = document.getElementById("addCat");
	let addCon = document.getElementById("addCon");
	let addDat = document.getElementById("addDat");
	let notes = localStorage.getItem("notes");

	if (notes == null) notesObj = [];
	else notesObj = JSON.parse(notes);

	const current = notesObj[index];

	addTxt.value = current.name;
	addCrt.value = current.created;
	addCat.value = current.category;
	addCon.value = current.content;
	addDat.value = current.dates;
	isEdit = current.id;
}
