import React, { useState, useEffect } from 'react';
import { getProducts } from './apiCore';
import Card from './Card';
import Menu from './Menu';
// import Search from './Search';
import '../styles.css';


import one from './images/c1.jpg';
import two from './images/c2.jpg';
import three from './images/sg3.jpg';
import five from './images/w3.jpg';

const Home = () => {
	const [ productsBySell, setProductsBySell ] = useState([]);
	const [ productsByArrival, setProductsByArrival ] = useState([]);
	const [ setError ] = useState(false);

	const loadProductsBySell = () => {
		getProducts('sold').then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProductsBySell(data);
			}
		});
	};

	const loadProductsByArrival = () => {
		getProducts('createdAt').then((data) => {
			// console.log(data);
			if (data.error) {
				setError(data.error);
			} else {
				setProductsByArrival(data);
			}
		});
	};

	useEffect(() => {
		loadProductsByArrival();
		loadProductsBySell();
	}, []);

	return (
		<div>
			<Menu />
			{/* <Search /> */}
			<div id="slider" /* className="mt-5" */>
				<figure>
					<img src={five} alt="img1" />
					<img src={two} alt="img2" />
					<img src={three} alt="img3" />
					<img src={one} alt="img4" />
					<img src={five} alt="img1" /> 
				</figure>
			</div>
			<div className="container">
				<h2 className="mb-4 ">New Arrivals</h2>
				<div className="row">
					{productsByArrival.map((product, i) => (
						<div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
							<Card product={product} />
						</div>
					))}
				</div>

				<h2 className="mb-4">Best Sellers</h2>
				<div className="row">
					{productsBySell.map((product, i) => (
						<div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
							<Card product={product} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default Home;
