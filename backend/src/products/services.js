const {ObjectId} = require('mongodb')
const {Database} =require('../database')

const COLLECTION = 'products';
const getAll= async ()=>{
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) =>{
    const collection =  await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) });
}

const createProduct = async (product) => {
    const collection = await Database(COLLECTION);
    let result = collection.insertOne(product); // querys de mongo DB
    return result.insertedId

}

module.exports.ProductsService = {
    getAll,
    getById,
    createProduct
}