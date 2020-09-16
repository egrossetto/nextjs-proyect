const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'SECRETAZO2020';

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
            const collection = db.collection('zones');

            collection.find({}).toArray((error, zones) => {
                if (error) {
                    res.status(500).json({
                        error: true,
                        message: 'Error al buscar las zonas..',
                    });
                    return;
                }
                if(zones){
                    res.status(200).json( zones );
                }else{
                    res.status(500).json({
                        error: true,
                        message: 'Error al buscar las zonas..',
                    });
                }
            });
        })
    }
}