const express = require('express')
const {UserController} = require('./controller')

const router = express.Router();

module.exports.UserAPI= (app) => {
    router
    .get('/',UserController.getUsers) 
    .get('/:id', UserController.getUser)
    .post('/',UserController.createUser)
    .delete('/:id',UserController.deleteUsuario)
    .put('/:id', UserController.updateUser)

    app.use('/api/users',router);
}