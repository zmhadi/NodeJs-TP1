//Fichier de configuration de l'app
const express = require('express')
const app = express()
const port = 3000
const userRepository = require('./repository')
const log = require('./log')

// Middleware //////////////////////

app.use(express.json())

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
app.get('/users', (req, res) => {
    try {
        res.send(userRepository.getUsers())
    }
    catch {
        res.send('Erreur requete GET : userRepository.getUsers()')
    }
})
//Route pour récupérer un "user" via son firstName
app.get('/users/:firstName', (req, res) => {
    try {   
        //console.log(req.params)
        res.send(userRepository.getUserByFirstName(req.params.firstName))
    }
    catch {
        res.send("Erreur requete GET : userRepository.getUserByFirstName(req.params.firstName)")
    }
})
//Route pour créer un "user"
app.post('/users/create' , (req, res) => {
    try {
        //console.log(req.body)
        userRepository.createUser(req.body)
        res.send('Utilisateur a été crée !')
    }
    catch {
        res.send('Erreur requete GET : userRepository.createUser(req.body)')
    }
})
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