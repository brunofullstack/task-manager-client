import { api } from '../../api';
import axios from 'axios'

function setAxiosHeaders(token) {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function login(store, creds) {
	return new Promise((resolve, reject) => {
		api
			.login(creds)
			.then((response) => {
				store.commit('login', response.data);
				setAxiosHeaders(response.data.access_token);

				resolve(response);
			})
			.catch((e) => {
				reject(e.response);
			});
	});
}

export function logout(store) {
	return new Promise((resolve) => {
		store.commit('logout');
		resolve();
	});
}

// Tasks
export function storeTask({ commit }, payload) {
	return new Promise((resolve, reject) => {
		axios
			.post(api.apiUrl + '/tasks', payload)
			.then((response) => {
				// Handle the response as needed
				commit('setData', response.data);

				// Resolve the Promise with the response data
				resolve(response.data);
			})
			.catch((error) => {
				// Handle errors, such as network issues or API errors
				console.error('Error posting data:', error);

				// Reject the Promise with the error
				reject(error);
			});
	});
}

export function updateTask({ commit }, payload) {
	console.log('updateTask: ', payload);
	return new Promise((resolve, reject) => {
		axios
			.put(api.apiUrl + '/tasks/' + payload.id, payload)
			.then((response) => {
				// Handle the response as needed
				commit('setData', response.data);

				// Resolve the Promise with the response data
				resolve(response.data);
			})
			.catch((error) => {
				// Handle errors, such as network issues or API errors
				console.error('Error posting data:', error);

				// Reject the Promise with the error
				reject(error);
			});
	});
}

export function deleteTask({ commit }, payload) {
	console.log('deleteTask: ', payload);
	return new Promise((resolve, reject) => {
		axios
			.delete(api.apiUrl + '/tasks/' + payload.id, payload)
			.then((response) => {
				// Handle the response as needed
				commit('setData', response.data);

				// Resolve the Promise with the response data
				resolve(response.data);
			})
			.catch((error) => {
				// Handle errors, such as network issues or API errors
				console.error('Error posting data:', error);

				// Reject the Promise with the error
				reject(error);
			});
	});
}

export function getTasks({ commit }) {
	return new Promise((resolve, reject) => {
		axios
			.get(api.apiUrl + '/tasks')
			.then((response) => {
				// Handle the response as needed
				commit('setData', response.data);

				// Resolve the Promise with the response data
				resolve(response.data);
			})
			.catch((error) => {
				// Handle errors, such as network issues or API errors
				console.error('Error posting data:', error);

				// Reject the Promise with the error
				reject(error);
			});
	});
}