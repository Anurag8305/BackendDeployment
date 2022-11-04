let mainbody_div = document.getElementById("mainbody");
const getData = async (clicked_button, limit) => {
	try {
		let res = await fetch(`https://enigmatic-spire-82564.herokuapp.com/data`);
		let data = await res.json();
		//appendPosts(data);
		createButtons(data.length, 2);
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};
const getPaginatedData = async (clicked_button, limit) => {
	try {
		let res = await fetch(
			`https://enigmatic-spire-82564.herokuapp.com/data?_page=${clicked_button}&_limit=${limit}`
		);
		let data = await res.json();
		appendPosts(data, mainbody_div);
		//createButtons(data.length, 2);
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};
getData();
getPaginatedData(1, 2);
function appendPosts(data) {
	let mainbody_div = document.getElementById("mainbody");
	mainbody_div.innerHTML = null;
	data.forEach(function (el) {
		let div = document.createElement("div");
		let img = document.createElement("img");
		img.src = el.image_url;

		let p = document.createElement("p");
		p.innerText = el.caption;

		div.append(img, p);
		mainbody_div.append(div);
	});
}

//pagination
let button_div = document.getElementById("buttons");
const createButtons = (total_images, images_per_page) => {
	const buttons = Math.ceil(total_images / images_per_page);
	for (let i = 1; i <= buttons; i++) {
		let btn = document.createElement("button");
		btn.id = i;
		btn.innerText = i;
		btn.onclick = () => {
			getPaginatedData(i, 2);
		};
		button_div.append(btn);
	}
};

//1,2,3,4,5
//show results in parts
//insted of full data at once showing results in parts by changing code in API; https://enigmatic-spire-82564.herokuapp.com/data?_page=${clicked_button}&_limit=${limit}
