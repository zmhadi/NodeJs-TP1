//Fichier de configuration de l'app
const express = require('express')
const cors = require('cors')
///////////////////////////////////
const log = require('./back/log')
const route = require('./back/route')
///////////////////////////////////
const port = 3000
///////////////////////////////////
const app = express()

// Middleware //////////////////////
app.use(express.json())
app.use(cors())
app.use(route.initializeRoutes())
app.use((req, res, next) => {
    const start = new Date()
    console.log(`request called at : ${start.toLocaleString()}`)
    res.on("finish", function() {
        const end = new Date()
        //Logger chaque requête avec: Date, IP de l'appelant, durée de la requête
        log.addLog(req.ip ,start, end)
    });
    next()
})
//Middleware pour la gestion des erreurs
app.use((err, req, res, next) => {
    if (err) {
        return res.status(err.statusCode || 500).json(err.message);  
    }
    next() 
}); 
/////////////////////////////////////

app.listen(port, () => {
  console.log(`TP1 listening on port ${port}`)
})