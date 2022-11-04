import { navbar } from "./Components/navbar.js";

let navbar_div = document.getElementById("navbar");
navbar_div.innerHTML = navbar();

//5c61d0dbf09f83d65dc0dc6d7adf28a7
let homepage = document.getElementById("homepage");
homepage.onclick = () => {
	window.location.replace("homepage.html");
};

let create_btn = document.getElementById("create_btn");
create_btn.onclick = () => {
	//submitting a post to server
	createPost();
};

//add event handler on select file input

let inp_image = document.getElementById("image");
inp_image.onchange = () => {
	handleImage();
};

let image_url;
const handleImage = async () => {
	let img = document.getElementById("image");

	//by below code we can access the image data
	let actual_img = img.files[0];
	console.log(actual_img);
	//shows the details of the selected image

	//imgbb is asking to send data in the formdata object
	let form = new FormData();
	form.append("image", actual_img);

	//lets make the post request
	let res = await fetch(
		"https://api.imgbb.com/1/upload?key=5c61d0dbf09f83d65dc0dc6d7adf28a7",
		{
			method: "POST",
			body: form,
		}
	);
	let data = await res.json();
	console.log(data);
	image_url = data.data.display_url;
};

const createPost = async () => {
	//grabbing all the data
	let id = document.getElementById("id").value;
	let caption = document.getElementById("caption").value;
	//store all the data to be sent in object
	let send_this_data = {
		id,
		caption,
		image_url,
	};
	//above data is accessible to whom=>local
	//is it supposed to be accessible to everyone=>yes
	//where the above data is going=>server {local server}

	//json-server package.

	let res = await fetch("https://enigmatic-spire-82564.herokuapp.com/data", {
		method: "POST",
		body: JSON.stringify(send_this_data),
		headers: {
			"Content-Type": "application/json",
		},
	});
	let data = await res.json();
	console.log(data);
};

let delete_btn = document.getElementById("delete_btn");
delete_btn.onclick = () => {
	deletePost();
};

const deletePost = async () => {
	let delete_id = document.getElementById("delete_id").value;
	let res = await fetch(
		`https://enigmatic-spire-82564.herokuapp.com/data/${delete_id}`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
};

let updat_btn = document.getElementById("updat_btn");
updat_btn.onclick = () => {
	updatePost();
};

const updatePost = async () => {
	let update_id = document.getElementById("update_id").value;
	let new_caption = document.getElementById("update_caption").value;

	let send_this_data = {
		caption: new_caption,
	};

	let res = await fetch(
		`https://enigmatic-spire-82564.herokuapp.com/data/${update_id}`,
		{
			method: "PATCH",
			body: JSON.stringify(send_this_data),
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	let data = await res.json();
	console.log(data);
};
//CRED
//create, read, update, delete
