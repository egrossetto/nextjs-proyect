import styles from '../../styles/Home.module.css';
import { useState } from 'react';

export default function EditTeam({categories}) {
	const [saveError, setSaveError] = useState('');
	const [name, setName] = useState('');
	const [foundation, setFoundation] = useState('');
	const [zone, setZone] = useState('');
	const [category, setCategory] = useState('');

	const handleSubmit = (e) => {};

	return (
		<div className={styles.container}>
			<pre>{JSON.stringify(category, null, 2)}</pre>
			<section>
				<h3 className={styles.title}>Editar equipo</h3>
				<div className={styles.grid}>
					<form onSubmit={handleSubmit}>
						<input
							placeholder="Nombre"
							name="name"
							type="text"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						></input>
						<label htmlFor="foundation">
							Fecha de creacion
							<input
								name="foundation"
								type="date"
								value={foundation}
								onChange={(e) => {
									setFoundation(e.target.value);
								}}
							></input>
						</label>
						<label htmlFor="zone">
							Zona
							<input
								name="zone"
								type="text"
								value={zone}
								onChange={(e) => {
									setZone(e.target.value);
								}}
							></input>
						</label>
						<label htmlFor="category">
							Categoria
							<select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
								{categories.map(c => {
									return(<option key={c._id} value={c._id}>{c.name}</option>)
								})}
							</select>
						</label>
						<input type="submit" value="Enviar"></input>
						{saveError && (
							<p style={{ color: 'red' }}>{saveError}</p>
						)}
					</form>
				</div>
			</section>
		</div>
	);
}

export async function getStaticProps() {
	const res = await fetch('http://localhost:3000/api/categories')
	const data = await res.json();
	
	return {
	  props: {		
		  categories: data.categories
	  }
	}
  }