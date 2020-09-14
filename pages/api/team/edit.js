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
			assert.notEqual(null, req.body.editTeam.name, 'Ingrese nombre');
            assert.notEqual(null, req.body.editTeam.creation, 'Ingrese fecha de creacion');
            assert.notEqual(null, req.body.editTeam.categoryId, 'Seleccione una categoria');
            assert.notEqual(null, req.body.editTeam.zoneId, 'Seleccione una zona');
		} catch (error) {
            res.status(403).send(error.message);
            return;
        }
        
        client.connect((error) => {
            assert.equal(null, error);

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
                    console.log('error:' + JSON.stringify(error))
                    console.log('res:' + JSON.stringify(result))
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