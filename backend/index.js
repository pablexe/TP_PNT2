const express = require ('express')
const cors = require('cors')
const debug= require('debug')('app:server')
const {Config} = require('./src/config/index')
const {ProductsAPI} = require('./src/products')
const { UserAPI } = require('./src/users/index')
const app=express()

app.use(cors());
app.use(express.json())


//modulos
ProductsAPI(app);
UserAPI(app)

app.listen(Config.port, () =>{
    debug('Servidor escuchando en el puerto '+Config.port)
})