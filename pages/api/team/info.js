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
            assert.equal(null, error);
            console.log('Conectado a Mongo');
            const db = client.db(dbName);
            const collection = db.collection('team');

            collection.find({}).toArray((error, team) => {
                if (error) {
                    res.status(500).json({
                        error: true,
                        message: 'Error al buscar el equipo..',
                    });
                    return;
                }
                if(team){
                    res.status(200).json( team );
                }else{
                    res.status(500).json({
                        error: true,
                        message: 'Error al buscar el equipo..',
                    });
                }
            });
        })
    }
}