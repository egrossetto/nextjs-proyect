import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import cookie from 'js-cookie';

export default function Home() {
	const [loginError, setLoginError] = useState('');
	const [dni, setDni] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch('/api/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				dni,
				password,
			}),
		})
			.then((r) => {
				return r.json();
			})
			.then((data) => {
				if (data && data.error) {
					setLoginError(data.message);
				}

				if (data && data.token) {
					cookie.set('token', data.token, { expires: 2 });
					Router.push('/home');
				}
			});
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Batidora FC</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Bienvenidos!</h1>

				<div className={styles.grid}>
					<form onSubmit={handleSubmit}>
						<input
							placeholder="DNI"
							name="dni"
							type="numeric"
							value={dni}
							onChange={(e) => {
								setDni(e.target.value);
							}}
						></input>
						<input
							placeholder="Password"
							name="password"
							type="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						></input>
						<input type="submit" value="Enviar"></input>
						{loginError && (
							<p style={{ color: 'red' }}>{loginError}</p>
						)}
					</form>
				</div>

				<section>
					<h3>
						<Link href="/signUp">
							<a>Sign up?</a>
						</Link>
					</h3>
				</section>
			</main>

			<footer className={styles.footer}></footer>
		</div>
	);
}
