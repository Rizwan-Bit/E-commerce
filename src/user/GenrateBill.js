import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getPurchaseHistory } from './apiUser';

const Bill = () => {
	let [ history, setHistory ] = useState([]);

	const { user: { _id }, user, token } = isAuthenticated();

	const init = (userId, token) => {
		getPurchaseHistory(userId, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistory(data);
			}
		});
	};

	useEffect(() => {
		init(_id, token);
	}, []);

	const purchaseHistory = (history) => {
		return (
			<div className="card mb-5 font-italic">
				<ul className="list-group">
					<li className="list-group-item p-5">
						{history.map((h, i) => {
							if (h.status === 'Delivered') {
								return (
									<div key={i}>
										<h2 className="card-header d-flex justify-content-center font-italic">
											Lashion
										</h2>
										<h5 className="mt-3"> Name : {h.user.name}</h5>
										<hr />
										<h5>Order ID : {h._id}</h5>
										<hr />
										<h5>Address : {h.address}</h5>
										<hr />
										<h5>Order Date: {h.createdAt.substring(0, 10)}</h5>
										<hr />
										<h5>Total Amount : Rs.{h.amount}</h5>
										<hr />
										<h3 className="d-flex justify-content-center font-italic">Product Details</h3>
										{h.products.map((p, i) => {
											return (
												<div key={i}>
													<hr />
													<h5>Product Id : {p._id}</h5>
													<h5>Product name: {p.name}</h5>
													<h5>Product price: Rs.{p.price}</h5>
													<h5>Product Count : {p.count} </h5>
												</div>
											);
										})}

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
		<Layout
			title="Your Bills"
			description={`G'day ${user.name}, This is your Billing Information`}
			className="container"
		>
			{purchaseHistory(history)}
		</Layout>
	);
};

export default Bill;
