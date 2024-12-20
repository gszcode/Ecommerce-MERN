const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;

export const uploadImage = async image => {
	const formData = new FormData();
	formData.append("file", image);
	formData.append("upload_preset", "mern_product");

	const dataResponse = await fetch(url, {
		method: "POST",
		body: formData,
	});

	return dataResponse.json();
};
