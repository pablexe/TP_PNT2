const createError = require('http-errors')
const {UserService} = require('./services')
const debug = require ('debug')('app:module-users-controles')
const {Response} = require ('../common/response')

module.exports.UserController={
    
    getUsers: async (req,res) => {
        try{
            let users = await UserService.getAll()
            Response.success(res, 200, 'Lista de Usuarios', users)
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    getUser:async (req,res)=>{
        try{
            const {
                params : { id },
            } = req;
        let user = await UserService.getById(id);
        if(!user){
            Response.error(res, new createError.NotFound())
        }else{
            Response.success(res, 200, 'User', user)
        }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    createUser:async(req,res)=>{
        try{
            const{ body } = req;
            if(!body || Object.keys(body).length ===0){
                Response.error(res,new createError.BadRequest())
            }else{
                const insertedId = await UserService.createUser(body);
                Response.success(res,201,'Usuario Agregado',insertedId)
            }
        }catch(error){
            debug(error)
            Response.error(res);
        }
    },
    deleteUsuario:async(req,res)=>{
        try{
            const{id}= req.params;
            const deletedCount = await UserService.deleteUser(id);
            if(deletedCount > 0){
                Response.success(res,200, `Usuario con ID ${id} eliminado`,deletedCount);
            }else{
                Response.error(res, new createError.NotFound(`Usuario con ID ${id} no encontrado`));
            }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const userdata = req.body;
            const modifiedCount = await UserService.updateUser(id, userdata);
            if (modifiedCount > 0) {
                Response.success(res, 200, `Usuario con ID ${id} actualizado`, modifiedCount);
            } else {
                Response.error(res, new createError.NotFound(`Usuario con ID ${id} no encontrado`));
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
}