const {ObjectId} = require('mongodb')
const {Database} =require('../database/index');

const COLLECTION = 'users';
const getAll= async ()=>{
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) =>{
    const collection =  await Database(COLLECTION);
    return collection.findOne({ _id :new ObjectId(id) });
}

const createUser = async (user) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(user); 
    return result.insertedId

}

const deleteUser = async (id) => {
    const collection = await Database(COLLECTION);
    const result = await collection.deleteOne({_id: new ObjectId(id)})
    return result.deletedCount;
}

const updateUser = async (id, userData) => {
    delete userData._id;
    const collection = await Database(COLLECTION);
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: userData }
    );
    return result.modifiedCount;
}

module.exports.UserService = {
    getAll,
    getById,
    createUser,
    deleteUser,
    updateUser
}