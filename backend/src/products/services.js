const {ObjectId} = require('mongodb')
const {Database} =require('../database/index');

const COLLECTION = 'products';
const getAll= async ()=>{
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) =>{
    const collection =  await Database(COLLECTION);
    return collection.findOne({ _id :new ObjectId(id) });
}

const createProduct = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product); // querys de mongo DB
    return result.insertedId

}

const deleteProduct = async (id) => {
    const collection = await Database(COLLECTION);
    const result = await collection.deleteOne({_id: new ObjectId(id)})
    return result.deletedCount;
}

const updateProduct = async (id, productData) => {
    delete productData._id;
    const collection = await Database(COLLECTION);
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: productData }
    );
    return result.modifiedCount;
}

module.exports.ProductsService = {
    getAll,
    getById,
    createProduct,
    deleteProduct,
    updateProduct
}