const createError = require('http-errors')
const {ProductsService} = require('./services')
const debug = require ('debug')('app:module-producs-controles')
const {Response} = require ('../common/response')

module.exports.ProductsController={
    getProducts: async (req,res) => {
        try{
            let products = await ProductsService.getAll()
            Response.success(res, 200, 'Lista de productos', products)
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    getProduct:async (req,res)=>{
        try{
            const {
                params : { id },
            } = req;
        let product = await ProductsService.getById(id);
        if(!product){
            Response.error(res, new createError.NotFound())
        }else{
            Response.success(res, 200, 'Producto', product)
        }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    createProduct:async(req,res)=>{
        try{
            const{ body } = req;
            if(!body || Object.keys(body).length ===0){
                Response.error(res,new createError.BadRequest())
            }else{
                const insertedId = await ProductsService.createProduct(body);
                Response.success(res,201,'Producto Agregado',insertedId)
            }
        }catch(error){
            debug(error)
            Response.error(res);
        }
    },
    deleteProduct:async(req,res)=>{
        try{
            const{id}= req.params;
            const deletedCount = await ProductsService.deleteProduct(id);
            if(deletedCount > 0){
                Response.success(res,200, `Producto con ID ${id} eliminado`,deletedCount);
            }else{
                Response.error(res, new createError.NotFound(`Producto con ID ${id} no encontrado`));
            }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const productData = req.body;
            const modifiedCount = await ProductsService.updateProduct(id, productData);
            if (modifiedCount > 0) {
                Response.success(res, 200, `Producto con ID ${id} actualizado`, modifiedCount);
            } else {
                Response.error(res, new createError.NotFound(`Producto con ID ${id} no encontrado`));
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
}