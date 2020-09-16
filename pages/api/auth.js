const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'SECRETAZO2020';

const saltRounds = 10;
const url = 'mongodb://localhost:27017';
const dbName = 'batidorafc';

const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const findUser = (db, dni, callback) => {
	const collection = db.collection('users');
	collection.findOne({ dni }, callback);
};

const authUser = (db, dni, password, hash, callback) => {
	const collection = db.collection('users');
	bcrypt.compare(password, hash, callback);
};

export default (req, res) => {
	if (req.method === 'POST') {
		//Logeamos!
		try {
			assert.notStrictEqual(null, req.body.dni, 'Ingrese DNI');
			assert.notStrictEqual(null, req.body.password, 'Ingrese su contraseña');
		} catch (error) {
			res.status(403).send(error.message);
		}

		client.connect((error) => {
			assert.strictEqual(null, error);
			
			const db = client.db(dbName);
			const dni = req.body.dni;
			const password = req.body.password;

			findUser(db, dni, (error, user) => {
				if (error) {
					res.status(500).json({
						error: true,
						message: 'Error al buscar el usuario.',
					});
					return;
				}

				if (!user) {
					res.status(500).json({
						error: true,
						message: 'Usuario no encontrado.',
					});
					return;
				} else {
					authUser(
						db,
						dni,
						password,
						user.password,
						(error, match) => {
							if (error) {
								res.status(500).json({
									error: true,
									message: 'Error en la autenticacion.',
								});
								return;
							}

							if (match) {
								const token = jwt.sign(
									{ userId: user.userId, dni: user.dni },
									jwtSecret,
									{
										expiresIn: 4000,
									}
								);
								res.status(200).json({ token });
							} else {
								res.status(401).json({
									error: true,
									message: 'Error en la autenticacion.',
								});
								return;
							}
						}
					);
				}
			});
		});
	} else {
		res.statusCode = 401;
		res.end();
	}
};
