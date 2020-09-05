import { create } from 'domain';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
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
	const collection = db.collection('user');
	collection.findOne({ dni }, callback);
};

const createUser = (db, dni, password, callback) => {
	const collection = db.collection('user');
	bcrypt.hash(password, saltRounds, (error, hash) => {
		//Guardamos la password hasheada.
		collection.insertOne(
			{
				userId: v4(),
				dni,
				password: hash,
			},
			(error, userCreated) => {
				assert.equal(error, null);
				callback(userCreated);
			}
		);
	});
};

export default (req, res) => {
	if (req.method === 'POST') {
		try {
			assert.notEqual(null, req.body.dni, 'DNI obligatorio');
			assert.notEqual(null, req.body.password, 'Password obligatorio');
		} catch (error) {
			res.status(403).json({ error: true, message: error.message });
		}

		client.connect((error) => {
			assert.equal(null, error);
			console.log('Conectado a Mongo');
			const db = client.db(dbName);
			const dni = req.body.dni;
			const password = req.body.password;

			findUser(db, dni, (error, user) => {
				if (error) {
					res.status(500).json({
						error: true,
						message: 'El usuario no existe.',
					});
					return;
				}

				if (!user) {
					//No tira error, pero el usuario no existe.
					createUser(db, dni, password, (creationResult) => {
						if (creationResult.ops.length === 1) {
							const user = creationResult.ops[0];
							const token = jwt.sign(
								{ userId: user.userId, dni: user.dni },
								jwtSecret,
								{
									expiresIn: 4000,
								}
							);
							res.status(200).json({ token });
							return;
						}
					});
				} else {
					res.status(403).json({
						error: true,
						message: 'Ya hay un usuario con ese DNI',
					});
					return;
				}
			});
		});
	} else {
		res.statusCode = 200;
		res.json({ name: 'John Doe' });
	}
};
