$(document).ready(function () {
	$(window).scroll(function () {
		// sticky navbar on scroll script code
		if (this.scrollY > 20) {
			$(".navbar").addClass("sticky");
		} else {
			$(".navbar").removeClass("sticky");
		}

		// scroll-up button show/hide script code
		if (this.scrollY > 500) {
			$(".scroll-up-btn").addClass("show");
		} else {
			$(".scroll-up-btn").removeClass("show");
		}
	});

	// slide-up script code
	$(".scroll-up-btn").click(function () {
		$("html").animate({ scrollTop: 0 });
		// removing smooth scroll on slide-up button click code
		$("html").css("scrollBehavior", "auto");
	});

	$(".navbar .menu li a").click(function () {
		// applying again smooth scroll on menu items click code
		$("html").css("scrollBehavior", "smooth");
	});

	// toggle menu/navbar script code
	$(".menu-btn").click(function () {
		$(".navbar .menu").toggleClass("active");
		$(".menu-btn i").toggleClass("active");
	});

	// typing text animation script code
	var typed = new Typed(".typing", {
		strings: ["Computer Scientist", "Web Developer", "JS Game Developer"],
		typeSpeed: 100,
		backSpeed: 60,
		loop: true,
	});

	var typed = new Typed(".typing-2", {
		strings: ["Computer Scientist", "Web Developer", "JS Game Developer"],
		typeSpeed: 100,
		backSpeed: 60,
		loop: true,
	});
});

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
	collection,
	addDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
const db = getFirestore();

let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function () {
	let name = document.getElementById("name");
	let email = document.getElementById("email");
	let subject = document.getElementById("subject");
	let message = document.getElementById("message");

	if (
		name.value &&
		email.value.includes("@gmail.com") &&
		subject.value &&
		message.value
	) {
		addDataToDatabase(name.value, email.value, subject.value, message.value);
		name.value = "";
		email.value = "";
		subject.value = "";
		message.value = "";

		alert(
			"Your Message has been Sent to Mr. Khadim Hussain !\nHe Will respond you ASAP!"
		);
	}
});
async function addDataToDatabase(name, email, subject, message) {
	let ref = collection(db, "Messages");
	const docRef = await addDoc(ref, {
		name: name,
		email: email,
		subject: subject,
		message: message,
		read:false,
	})
		.then(() => {
			alert("store");
		})
		.catch((err) => {
			alert(err);
		});
}
