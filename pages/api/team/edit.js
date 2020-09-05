const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'SECRETAZO2020';

const url = 'mongodb://localhost:27017';
const dbName = 'batidorafc';

