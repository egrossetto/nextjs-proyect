const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'batidorafc';

const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export default (req, res) => {
    if(req.method === 'POST'){
        try {
			assert.notStrictEqual(null, req.body.editTeam.name, 'Ingrese nombre');
            assert.notStrictEqual(null, req.body.editTeam.creation, 'Ingrese fecha de creacion');
            assert.notStrictEqual(null, req.body.editTeam.categoryId, 'Seleccione una categoria');
            assert.notStrictEqual(null, req.body.editTeam.zoneId, 'Seleccione una zona');
		} catch (error) {
            res.status(403).send(error.message);
            return;
        }
        
        client.connect((error) => {
            assert.strictEqual(null, error);

            const db = client.db(dbName);
        
            const editTeam = req.body.editTeam 
            
            const teamId = editTeam.id;
			const name = editTeam.name;
            const creation = editTeam.creation;
            const categoryId = editTeam.categoryId;
            const zoneId = editTeam.zoneId;

            const collection = db.collection('team');
            collection.updateOne(
                { "_id": ObjectId(teamId) },
                { $set: {
                    name: name,
                    creation: creation,
                    categoryId: categoryId,
                    zoneId: zoneId
                }},
                (error, result) => {
                    if(error){
                        res.status(403).json({ error: true, message: error.message });
                        return;
                    }

                    if(result){
                        res.status(200).json({ result });
                        return;
                    }
                }
            )
        })
    }
}