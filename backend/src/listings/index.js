const express = require('express')
const {ListingController} = require('./controller')

const router = express.Router();

module.exports.ListingAPI= (app) => {
    router
    .get('/',ListingController.getListings) 
    .get('/:id', ListingController.getListingById)
    .post('/',ListingController.createListing)
    .delete('/:id',ListingController.deleteListing)
    .put('/:id', ListingController.updateListing)

    app.use('/api/listings',router);
}