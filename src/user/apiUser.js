import { API } from '../config';

export const read = (userId, token) => {
	return fetch(`${API}/user/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const readOrder = (orderId, token) => {
	return fetch(`${API}/order/${orderId}/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const update = (userId, token, user) => {
	return fetch(`${API}/user/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(user)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateUser = (user, next) => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('jwt')) {
			let auth = JSON.parse(localStorage.getItem('jwt'));
			auth.user = user;
			localStorage.setItem('jwt', JSON.stringify(auth));
			next();
		}
	}
};

export const updateOrder = (order, next) => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('jwt')) {
			let auth = JSON.parse(localStorage.getItem('jwt'));
			auth.order = order;
			localStorage.setItem('jwt', JSON.stringify(order));
			next();
		}
	}
};

export const updateOrderByUser = (orderId, userId, token, order) => {
	return fetch(`${API}/order/${orderId}/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(order)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getPurchaseHistory = (userId, token) => {
	return fetch(`${API}/orders/by/user/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
