import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<section>
				<div className={styles.grid}>
					<a className={styles.card}>
						<h3>EQUIPO</h3>
					</a>
					<a className={styles.card}>
						<h3>FIXTURE</h3>
					</a>
					<a className={styles.card}>
						<h3>PERFIL</h3>
					</a>
					<a className={styles.card}>
						<h3>NOSE</h3>
					</a>
				</div>
			</section>
		</div>
	);
}
