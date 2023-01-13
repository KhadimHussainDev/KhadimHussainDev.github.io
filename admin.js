var srNo = 0;
var srNo = 0;
function addDataToTable(name, email, subject, read, message, id) {
	var table = document.getElementById("myTable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);
	var cell7 = row.insertCell(6);
	var cell8 = row.insertCell(7);
	srNo++;
	cell1.innerHTML = srNo;
	cell2.innerHTML = name;
	cell3.innerHTML = email;
	cell4.innerHTML = subject;
	cell5.innerHTML = read;
	cell6.innerHTML = "<button onclick='deleteRow(this)'>Delete</button>";
	cell7.innerHTML = message;
	cell8.innerHTML = id;
	cell8.style.display = "none";
}
window.deleteRow = function deleteRow(btn) {
	var row = btn.parentNode.parentNode;
	var id = row.cells[7].innerHTML;
	// use id here
	// console.log(id)
	let ref = doc(db, "Messages", id);
	deleteDoc(ref).then(() => {
		alert("Deleted");
	});
	row.parentNode.removeChild(row);
};

// <------------------------Linking With DataBase--------------------------->

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDstXvph5BdFXiWEimkrjJekToZXs3gyrY",
	authDomain: "oyekhadimporfolio.firebaseapp.com",
	projectId: "oyekhadimporfolio",
	storageBucket: "oyekhadimporfolio.appspot.com",
	messagingSenderId: "345555187239",
	appId: "1:345555187239:web:ded907bf1ef2875cb90002",
	measurementId: "G-FYR04F13L2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//import functions
import {
	getFirestore,
	doc,
	getDocs,
	collection,
	updateDoc,
	query,
	orderBy,
	limit,
	deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
const db = getFirestore();
window.onload = async () => {
	const messageRef = collection(db, "Messages");
	const q = query(messageRef, orderBy("read", "asc"), limit(100));
	const snap = await getDocs(q);
	let messages = [];
	snap.forEach((element) => {
		messages.push({ id: element.id, data: element.data() });
	});
	// console.log(messages);
	// console.log(snap);
	messages.forEach((element) => {
		addDataToTable(
			element.data.name,
			element.data.email,
			element.data.subject,
			element.data.read,
			element.data.message,
			element.id
		);
		let ref = doc(db, "Messages", element.id);
		updateDoc(ref, {
			read: true,
		});
	});
};
