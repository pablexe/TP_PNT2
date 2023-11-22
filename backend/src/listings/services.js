const {ObjectId} = require('mongodb')
const {Database} =require('../database/index');

const COLLECTION = 'listings';
const getAll= async ()=>{
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) =>{
    const collection =  await Database(COLLECTION);
    return collection.findOne({ _id :new ObjectId(id) });
}

const createListing = async (listing) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(listing); 
    return result.insertedId

}

const deleteListing = async (id) => {
    const collection = await Database(COLLECTION);
    const result = await collection.deleteOne({_id: new ObjectId(id)})
    return result.deletedCount;
}

const updateListing = async (id, listingData) => {
    const collection = await Database(COLLECTION);
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: listingData }
    );
    return result.modifiedCount;
}

module.exports.ListingService = {
    getAll,
    getById,
    createListing,
    deleteListing,
    updateListing
}