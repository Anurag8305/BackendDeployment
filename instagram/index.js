import { navbar } from "./Components/navbar.js";
import { append } from "./scripts/append.js";

let posts_div = document.getElementById("posts");
let navbar_div = document.getElementById("navbar");
navbar_div.innerHTML = navbar();

//append will need two things
const getData = async () => {
	let res = await fetch("https://enigmatic-spire-82564.herokuapp.com/data");
	let data = await res.json();

	append(data, posts_div);
};
getData();

//pagination

const createButtons = (total_images, images_per_page) => {
	const buttons = Math.ceil(total_images / images_per_page);
	for (let i = 1; i <= buttons; i++) {
		let btn = document.createElement("button");
		btn.id = i;
		btn.innerText = i;
		btn.onclick = () => {
			console.log(i);
		};
	}
};
