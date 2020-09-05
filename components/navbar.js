import styles from '../styles/navbar.module.css';

export default function Navbar() {
	return (
		<div>
			<img className={styles.logo} src="" alt="logo" />
			<nav>
                <ul className={styles.nav_links}>
                    <li><a href=''>Sarasa1</a></li>
                    <li><a href=''>Sarasa2</a></li>
                    <li><a href=''>Sarasa3</a></li>
                </ul>
            </nav>
            <a className={styles.cta} href=''><button className={styles.my_button}>Algo</button></a>
		</div>
	);
}
