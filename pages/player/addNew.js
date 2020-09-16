import React, { useState } from 'react';

export default function AddNew({ positions }) {
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dni, setDni] = useState('');
	const [position, setPosition] = useState('');
	const [responseMsg, setResponseMsg] = useState(null);

	const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`assad! ${name} ${lastName} ${dni} ${position}`);
        
        fetch('/api/players', {
            method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
                lastName,
                dni,
                position
			})
        })
        .then((r) => {
            return r.json();
        })
        .then((data) => {
            if (data && data.error) {
                setResponseMsg(data.message);
            }else{
                setResponseMsg('Jugador creado correctamente!')
            }
        });
        
	};

	return (
		<div className="w-full max-w-s flex justify-center">
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="name"
					>
						Nombre
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						></input>
					</label>
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="lastName"
					>
						Apellido
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
							type="text"
							name="lastName"
							id="lastName"
							value={lastName}
							onChange={(e) => {
								setLastName(e.target.value);
							}}
						></input>
					</label>
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="dni"
					>
						DNI
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
							type="numeric"
							name="dni"
							id="dni"
							value={dni}
							onChange={(e) => {
								setDni(e.target.value);
							}}
						></input>
					</label>
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="position"
					>
						Posicion
					</label>
					<div className="relative">
						<select
							className="block w-auto bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="position"
							value={position}
							onChange={(e) => setPosition(e.target.value)}
						>
							{positions.map((p) => {
								return (
									<option key={p._id} value={p._id}>
										{p.name}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div className="flex justify-center">
					<input
                        type="submit"
                        className="bg-black hover:text-black hover:bg-white text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        value="Guardar"
					/>
				</div>
				<p>{responseMsg }</p>
			</form>
		</div>
	);
}

export async function getStaticProps() {
	let res = await fetch('http://localhost:3000/api/positions');
	let positions = await res.json();

	return {
		props: {
			positions: positions,
		},
	};
}
