const {ProductsService} = require('./services')
const debug = require ('debug')('app:module-producs-controles')

module.exports.ProductsController={
    getProducts: async (req,res) => {
        try{
            let products = await ProductsService.getAll()
            res.json(products);
        }catch(error){
            debug(error);
            res.status(500).json({message:"Internal server error"})
        }
    },
    getProduct:(req,res)=>{},
    createProduct:(req,res)=>{}
}