import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import { readOrder, updateOrder, updateOrderByUser } from './apiUser';
// import { updateOrderByUser } from '../../../backend/controllers/order';

const Order = ({ match }) => {
	const [ values, setValues ] = useState({
		address: '',
		error: false,
		success: false
	});

	const { token } = isAuthenticated();
	const { address, success } = values;

	const init = (orderId) => {
		// console.log(userId);
		readOrder(orderId, token).then((data) => {
			if (data.error) {
				setValues({ ...values, error: true });
			} else {
				setValues({ ...values, address: data.address });
			}
		});
	};

	useEffect(() => {
		init(match.params.orderId);
	}, []);

	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		updateOrderByUser(match.params.orderId, userId, token, { address }).then((data) => {
			if (data.error) {
				// console.log(data.error);
				alert(data.error);
			} else {
				updateOrder(data, () => {
					setValues({
						...values,
						address: data.address,
						success: true
					});
				});
			}
		});
	};

	const redirectUser = (success) => {
		if (success) {
			return <Redirect to="user/dashboard" />;
		}
	};

	const orderUpdate = (address) => (
		<form>
			<div className="form-group">
				<label className="text-muted">Address</label>
				<input type="password" onChange={handleChange('address')} className="form-control" value={address} />
			</div>

			<button onClick={clickSubmit} className="btn btn-primary">
				Submit
			</button>
		</form>
	);

	return (
		<Layout title="Order" description="Update your Order details" className="container-fluid">
			<h2 className="mb-4">Order update</h2>
			{orderUpdate(address)}
			{redirectUser(success)}
		</Layout>
	);
};

export default Order;
