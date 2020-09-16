const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'batidorafc';

const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export default (req, res) => {
	if (req.method === 'GET') {
		client.connect((error) => {
			assert.strictEqual(null, error);

			const db = client.db(dbName);
			const collection = db.collection('positions');

			collection.find({}).toArray((error, positions) => {
				if (error) {
					res.status(500).json({
						error: true,
						message: 'Error al buscar las posiciones..',
					});
					return;
				}

				if (positions) {
					res.status(200).json(positions);
				} else {
					res.status(500).json({
						error: true,
						message: 'Error al buscar las posiciones..',
					});
				}
			});
		});
	}
};
