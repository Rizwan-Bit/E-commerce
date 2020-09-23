import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
	const [ items, setItems ] = useState([]);
	const [ run, setRun ] = useState(false);

	useEffect(
		() => {
			setItems(getCart());
		},
		[ run ]
	);

	const showItems = (items) => {
		return (
			<div>
				<h2>
					{' '}
					{items.length > 1 ? `Your cart has ${items.length} items` : `Your cart has ${items.length} item`}
				</h2>
				<hr />
				{items.map((product, i) => (
					<Card
						key={i}
						product={product}
						showAddToCartButton={false}
						cartUpdate={true}
						showRemoveProductButton={true}
						setRun={setRun}
						run={run}
					/>
				))}
			</div>
		);
	};

	const noItemsMessage = () => (
		<h2>
			Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
		</h2>
	);

	return (
		<div>
			<Menu />

			<div className="container-fluid mt-3">
				<div className="row">
					<div className="col-xl-8 col-lg-7 col-md-6 col-sm-12 col-12">
						{items.length > 0 ? showItems(items) : noItemsMessage()}
					</div>

					<div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 col-12">
						<h2 className="mb-4 mt-3">Your cart summary</h2>
						<hr />
						<Checkout products={items} setRun={setRun} run={run} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
