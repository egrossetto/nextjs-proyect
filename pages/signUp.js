import { useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

export default function SignUp() {
	const [signupError, setSignupError] = useState('');
	const [dni, setDni] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				dni,
				password,
			}),
		})
			.then((r) => r.json)
			.then((data) => {
				if (data && data.error) {
					setSignupError(data.message);
				}
				if (data && data.token) {
					cookie.set('token', data.token, { expires: 2 });
					Router.push('/home');
				}
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<p>Sign Up</p>
			<label htmlFor="email">
				DNI
				<input
					value={dni}
					onChange={(e) => setDni(e.target.value)}
					name="email"
					type="numeric"
				/>
			</label>

			<br />

			<label htmlFor="password">
				Password
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name="password"
					type="password"
				/>
			</label>

			<br />

			<input type="submit" value="Submit" />
			{signupError && <p style={{ color: 'red' }}>{signupError}</p>}
		</form>
	);
}
