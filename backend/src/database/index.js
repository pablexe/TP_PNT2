const { MongoClient } = require('mongodb');
const debug = require('debug')('app:module-database');
const {Config} = require('../../../frontend/vite.config')


var connnection=null
module.exports.Database = (collectionSol) => new Promise(async(resolve, reject) => {
    try{
        if(!connnection){
            const client = new MongoClient(Config.mongouri);
            let connnection = await client.connect();
            debug("Conexion Existosa MongoDB Atlas")
        }
        debug("Conexion ya realizada, reutilizando")
        const db = connnection.db(Config.mongoDbname);
        resolve(db.collection(collectionSol))
    }catch(error){
        reject(error);
    }
});