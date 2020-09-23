import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getUsers } from './apiAdmin';

const ManageUsers = () => {
	const [ users, setUsers ] = useState([]);

	const { user, token } = isAuthenticated();

	const loadUsers = () => {
		getUsers().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setUsers(data);
			}
		});
	};

	// const destroy = (userId) => {
	// 	deleteUser(userId, user._id, token).then((data) => {
	// 		if (data.error) {
	// 			console.log(data.error);
	// 		} else {
	// 			loadUsers();
	// 		}
	// 	});
	// };

	useEffect(() => {
		loadUsers();
	}, []);

	return (
		<Layout title="Manage Users" description="Perform Oprations on Users" className="container-fluid">
			<div className="row">
				<div className="col-12">
					<h2 className="text-center">Total {users.length} Users</h2>
					<hr />
					<ul className="list-group">
						<li className="list-group-item d-flex justify-content-around align-items-center">
							<strong>User Name</strong>
							<strong>Email</strong>
							<strong>Role</strong>
						</li>
					</ul>
					<ul className="list-group">
						{users.map((u, i) => (
							<li key={i} className="list-group-item d-flex justify-content-around align-items-center">
								<strong>{u.name}</strong>
								<strong>{u.email}</strong>
								<strong>{u.role}</strong>
								{/* <Link to={`/admin/user/update/${u._id}`}>
									<span className="badge badge-warning badge-pill">Update</span>
									</Link> */}
								{/* <span onClick={() => destroy(u._id)} className="badge badge-danger badge-pill">
									Delete
								</span> */}
							</li>
						))}
					</ul>
					<br />
				</div>
			</div>
		</Layout>
	);
};

export default ManageUsers;
