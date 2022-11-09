import Axios from "axios";

const publicApi = async (url, data) =>
	new Promise((resolve, reject) => {
		Axios.post(url, data)
			.then((response) => {
				if (response.status != 200) {
					reject(response.data);
				}
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			});
	});

const privateApi = (url, data) =>
	new Promise((resolve, reject) => {
		Axios.post(url, data, {
			headers: {
				token: localStorage.getItem("token"),
			},
		})
			.then((response) => {
				if (response.status != 200) {
					reject(response.data);
				}
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			});
	});

export { publicApi, privateApi };
