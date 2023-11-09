const express = require ('express')
const debug= require('debug')('app:server')
const {Config} = require('./src/config/index')
const {ProductsAPI} = require('./src/products')
const app=express()

app.use(express.json())

//modulos
ProductsAPI(app);

app.listen(Config.port, () =>{
    debug('Servidor escuchando en el puerto '+Config.port)
})