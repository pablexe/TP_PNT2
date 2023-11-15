const { MongoClient } = require('mongodb');
const debug = require('debug')('app:module-database');
const {Config} = require('../config/index')


var connection=null
module.exports.Database = (collectionSol) => new Promise(async(resolve, reject) => {
    try{
        if(!connection){
            const client = new MongoClient(Config.mongouri);
            connection = await client.connect();
            debug("Conexion Existosa MongoDB Atlas")
        }
        debug("Conexion ya realizada, reutilizando")
        const db = connection.db(Config.mongodbname);
        resolve(db.collection(collectionSol))
    }catch(error){
        reject(error);
    }
});