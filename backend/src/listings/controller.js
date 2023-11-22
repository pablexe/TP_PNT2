const createError = require('http-errors')
const {ListingService} = require('./services')
const debug = require ('debug')('app:module-Listing-controles')
const {Response} = require ('../common/response')

module.exports.ListingController={
    
    getListings: async (req,res) => {
        try{
            let listings = await ListingService.getAll()
            Response.success(res, 200, 'Lista de Publicaciones', listings)
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    getListingById:async (req,res)=>{
        try{
            const {
                params : { id },
            } = req;
        let listing = await ListingService.getById(id);
        if(!listing){
            Response.error(res, new createError.NotFound())
        }else{
            Response.success(res, 200, 'Publicaciones', listing)
        }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    createListing:async(req,res)=>{
        try{
            const{ body } = req;
            if(!body || Object.keys(body).length ===0){
                Response.error(res,new createError.BadRequest())
            }else{
                const insertedId = await ListingService.createListing(body);
                Response.success(res,201,'Publicacion Agregada',insertedId)
            }
        }catch(error){
            debug(error)
            Response.error(res);
        }
    },
    deleteListing:async(req,res)=>{
        try{
            const{id}= req.params;
            const deletedCount = await ListingService.deleteListing(id);
            if(deletedCount > 0){
                Response.success(res,200, `Publicacion con ID ${id} eliminado`,deletedCount);
            }else{
                Response.error(res, new createError.NotFound(`Publicacion con ID ${id} no encontrado`));
            }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    updateListing: async (req, res) => {
        try {
            const { id } = req.params;
            const listingData = req.body;
            const modifiedCount = await ListingService.update(id, listingData);
            if (modifiedCount > 0) {
                Response.success(res, 200, `Listing con ID ${id} actualizado`, modifiedCount);
            } else {
                Response.error(res, new createError.NotFound(`Listing con ID ${id} no encontrado`));
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
}