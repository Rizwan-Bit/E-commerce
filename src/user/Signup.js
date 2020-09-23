import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {
	const [ values, setValues ] = useState({
		name: '',
		email: '',
		phoneNo: '',
		password: '',
		rTpassword: '',
		error: '',
		success: false
	});

	const { name, email, phoneNo, password, rTpassword, success, error } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		signup({ name, email, phoneNo, password, rTpassword }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false });
			} else {
				setValues({
					...values,
					name: '',
					email: '',
					phoneNo: '',
					password: '',
					rTpassword: '',
					error: '',
					success: true
				});
			}
		});
	};

	const signUpForm = () => (
		<form>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input onChange={handleChange('name')} type="text" className="form-control" value={name} />
			</div>

			<div className="form-group">
				<label className="text-muted">Email</label>
				<input onChange={handleChange('email')} type="email" className="form-control" value={email} />
			</div>

			<div className="form-group">
				<label className="text-muted">Phone No</label>
				<input onChange={handleChange('phoneNo')} type="number" className="form-control" value={phoneNo} />
			</div>

			<div className="form-group">
				<label className="text-muted">Password</label>
				<input onChange={handleChange('password')} type="password" className="form-control" value={password} />
			</div>

			<div className="form-group">
				<label className="text-muted">Re-Type Password</label>
				<input
					onChange={handleChange('rTpassword')}
					type="password"
					className="form-control"
					value={rTpassword}
				/>
			</div>
			<button onClick={clickSubmit} className="btn btn-primary">
				Submit
			</button>
		</form>
	);

	const showError = () => (
		<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
			New account is created. Please <Link to="/signin">Signin</Link>
		</div>
	);

	return (
		<Layout title="Signup" description="Signup to E-commerce App" className="Container col-md-8 offset-md-2">
			{showSuccess()}
			{showError()}
			{signUpForm()}
			{/* {JSON.stringify(values)} */}
		</Layout>
	);
};

export default Signup;
