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
            const collection = db.collection('category');

            collection.find({}).toArray((error, categories) => {
                if (error) {
                    res.status(500).json({
                        error: true,
                        message: 'Error al buscar las categorias..',
                    });
                    return;
                }
                if(categories){
                    res.status(200).json({ categories });
                }else{
                    res.status(500).json({
                        error: true,
                        message: 'Error al buscar las categorias..',
                    });
                }
            });
        })
    } else {
		res.statusCode = 200;
		res.json({ name: 'John Doe' });
	}
}