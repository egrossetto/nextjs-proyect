import { create } from 'domain';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const url = 'mongodb://localhost:27017';
const dbName = 'batidorafc';

const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const findPlayer = (db, dni, callback) => {
	const collection = db.collection('players');
	collection.findOne({ dni }, callback);
};

const createPlayer = (db, name, lastName, dni, positionId, callback) => {
    const collection = db.collection('players');
    collection.insertOne(
        {
            name,
            lastName,
            dni,
            positionId
        },
        (error, userCreated) => {
            assert.strictEqual(error, null);
            callback(userCreated);
        }
    );

};

export default (req, res) => {
	if (req.method === 'POST') {
		try {
            assert.notStrictEqual(null, req.body.name, 'Nombre obligatorio');
            assert.notStrictEqual(null, req.body.lastName, 'Apellido obligatorio');
			assert.notStrictEqual(null, req.body.dni, 'DNI obligatorio');
			assert.notStrictEqual(null, req.body.position, 'Posicion obligatorio');
		} catch (error) {
			res.status(403).json({ error: true, message: error.message });
		}

		client.connect((error) => {
			assert.strictEqual(null, error);

            const db = client.db(dbName);
            const name = req.body.name;
            const lastName = req.body.lastName;
			const dni = req.body.dni;
			const positionId = req.body.position;

			findPlayer(db, dni, (error, user) => {
				if (error) {
					res.status(500).json({
						error: true,
						message: error.message,
					});
					return;
				}

				if (!user) {
					//No tira error, pero el jugador no existe, lo creamos..
					createPlayer(db, name, lastName, dni, positionId, (creationResult) => {
						if (creationResult.ops.length === 1) {
							const user = creationResult.ops[0];
							res.status(200).json({ user });
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
