import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from './apiUser';
import { updateOrderStatus } from '../admin/apiAdmin';
import moment from 'moment';

const Dashboard = () => {
	let [ history, setHistory ] = useState([]);

	const { user: { _id, name, email, role } } = isAuthenticated();
	const { user, token } = isAuthenticated();

	const init = (userId, token) => {
		getPurchaseHistory(userId, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistory(data);
				console.log(data);
			}
		});
	};

	useEffect(() => {
		init(_id, token);
	}, []);

	const CancelOrder = (e, orderId) => {
		updateOrderStatus(user._id, token, orderId, e).then((data) => {
			if (data.error) {
				console.log('Status update failed');
			} else {
				console.log('Order status updated Successfully!');
				alert('Your Order is Cancelled/Returned Successfully!');
			}
		});
	};

	const userLinks = () => {
		return (
			<div>
				<div className="card">
					<h4 className="card-header">User Links</h4>
					<ul className="list-group">
						<li className="list-group-item">
							<Link className="nav-link" to="/cart">
								My Cart
							</Link>
						</li>
						<li className="list-group-item">
							<Link className="nav-link" to={`/profile/${_id}`}>
								Update Profile
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	};

	const userInfo = () => {
		return (
			<div className="card mb-5">
				<h3 className="card-header">User Information</h3>
				<ul className="list-group">
					<li className="list-group-item">{name}</li>
					<li className="list-group-item">{email}</li>
					<li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
				</ul>
			</div>
		);
	};

	const purchaseHistory = (history) => {
		return (
			<div className="card mb-5">
				<h3 className="card-header">Purchase history</h3>
				<ul className="list-group">
					<li className="list-group-item">
						{history.map((h, i) => {
							if (h.status !== 'CancelledByTheUser') {
								return (
									<div key={i}>
										<h3>
											{' '}
											{h.status === 'Cancelled' ? (
												'Sorry! Your Order Is Not Received!'
											) : (
												`Order Status : Your Order Is ${h.status}`
											)}
										</h3>

										{h.products.map((p, i) => {
											return (
												<div key={i}>
													<hr />
													<h6>Product name: {p.name}</h6>
													<h6>Product price: Rs.{p.price}</h6>
													<h6>Purchased date: {h.createdAt.substring(0, 10)}</h6>
													<hr />
												</div>
											);
										})}

										<div>
											{history.map((o, i) => {
												if (o.status === 'Delivered') {
													return (
														<div key={i}>
															<Link to="/user/bill">
																<button className="btn btn-outline-primary">
																	{' '}
																	Genrate Bill{' '}
																</button>
															</Link>
															<Link to="/user/cart">
																<button
																	onClick={(e) =>
																		CancelOrder((e = 'Returned'), h._id)}
																	className="btn btn-outline-info ml-2"
																>
																	Return Order
																</button>
															</Link>
														</div>
													);
												} else {
													if (o.status === 'Returned') {
														return null;
													} else {
														if (o.status === 'Delivered') {
															return null;
														} else {
															return (
																<Link to="/cart">
																	<button
																		onClick={(e) =>
																			CancelOrder(
																				(e = 'CancelledByTheUser'),
																				h._id
																			)}
																		className="btn btn-outline-info ml-2"
																	>
																		Cancel Order
																	</button>
																</Link>
															);
														}
													}
												}
											})}
										</div>
										<hr />
									</div>
								);
							} else {
								return null;
							}
						})}
					</li>
				</ul>
			</div>
		);
	};

	return (
		<Layout title="Profile" description={`G'day ${name} !`} className="container-fluid">
			<div className="row">
				<div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-12 mt-3"> {userLinks()} </div>
				<div className="col-xl-9 col-lg-8 col-md-7 col-sm-6 col-12 mt-3">
					{userInfo()}
					{purchaseHistory(history)}
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
