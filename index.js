//Fichier de configuration de l'app
const express = require('express')
const app = express()
const port = 3000
const userRepository = require('./back/repository')
const log = require('./back/log')
const route = require('./back/route')
const cors = require('cors')

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

//Route pour récupérer tous les "user"

//Route pour récupérer un "user" via son firstName
app.get('/users/:firstName', (req, res) => {
    try {   
        res.send(userRepository.getUserByFirstName(req.params.firstName))
    }
    catch (e) {
        console.log(e)
        res.send("Erreur requete GET : userRepository.getUserByFirstName(req.params.firstName)")
    }
})
//Route pour créer un "user"

//Route pour modifier un "user"
app.post('/users/edit' , (req, res) => {
    try {
        //console.log(req.body)
        userRepository.editUser(req.body)
        res.send('Utilisateur modifié !')
    }
    catch {
        res.send('Erreur requete GET : userRepository.editUser(req.body)')
    }

})
//Route pour supprimer un "user"
app.post('/users/delete/:id' , (req, res) => {
    try {
        //console.log(req.params)
        userRepository.deleteUser(req.params.id)
        res.send('Utilisateur supprimé !')
    }
    catch {
        res.send('Erreur requete GET : userRepository.deleteUser(req.params.id)')
    }

})
//Voir les logs
app.get('/logs', (req, res) => {
    try {
        res.send(log.getLogs())
    }
    catch {
        res.send('Erreur requete GET : log.getLogs()')
    }
})

app.listen(port, () => {
  console.log(`TP1 listening on port ${port}`)
})