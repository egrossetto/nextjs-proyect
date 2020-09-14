import styles from '../../styles/EditTeam.module.css';
import { useState, useEffect } from 'react';
import { Button } from '../../components/button';
import moment from "moment";

export default function EditTeam({ categories, zones, teamData }) {
	const [saveError, setSaveError] = useState('');
	const [name, setName] = useState('');
	const [creation, setCreation] = useState('');
	const [zone, setZone] = useState('');
	const [category, setCategory] = useState('');
	
	useEffect(() => {
		if (teamData) {
			setName(teamData[0].name);
			setCreation(moment(teamData[0].creation).format("yyyy-MM-DD"));
			setZone(teamData[0].zoneId);
			setCategory(teamData[0].categoryId);
		}
	}, [])


	const handleSubmit = (e) => { 
		e.preventDefault();
		let editTeam = {
			id: teamData[0]._id,
			name: name,
			creation: creation,
			zoneId: zone,
			categoryId: category
		};

		saveData(editTeam);
	};

	const saveData = (editTeam) => {
		fetch('/api/team/edit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ editTeam	}),
		})
		.then(r => r.json())
		.then((data) => {
			if (data && data.error){
				setSaveError(data.message);
			}

			if(data){
				console.log(data);
			}
		})
	}

	return (
		<div className={styles.container}>
			<section>
				<h3 className={styles.title}>Editar equipo</h3>
				<div className={styles.grid}>
					<form onSubmit={handleSubmit}>

						<label htmlFor='name' className={styles.label}>
							Nombre
							<input
								name="name"
								type="text"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							></input>
						</label>

						<label htmlFor="creation" className={styles.label}>
							Fecha de creacion
							<input
								name="creation"
								type="date"
								value={creation}
								className={styles.date_picker}
								onChange={(e) => {
									setCreation(e.target.value);
								}}
							></input>
						</label>

						<label htmlFor="zone" className={styles.label}>
							Zona
							<br />
							<select id="zone" value={zone} onChange={(e) => setZone(e.target.value)}>
								{zones.map(z => {
									return (<option key={z._id} value={z._id}>{z.name}</option>)
								})}
							</select>
						</label>

						<label htmlFor="category" className={styles.label}>
							Categoria
							<br />
							<select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
								{categories.map(c => {
									return (<option key={c._id} value={c._id}>{c.name}</option>)
								})}
							</select>
						</label>

						<div className={styles.button_container}>
							<Button color='black' text='Enviar' click={handleSubmit} />
						</div>

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

	const [categories, zones, teamData] = await Promise.all([
		fetch('http://localhost:3000/api/categories').then(res => res.json()),
		fetch('http://localhost:3000/api/zones').then(res => res.json()),
		fetch('http://localhost:3000/api/team/info').then(res => res.json())
	]);

	return {
		props: {
			categories: categories,
			zones: zones,
			teamData: teamData
		}
	}
}