const express = require('express')
const userRepository = require('./repository')
const router = express.Router()

//Route pour récupérer tous les "user"
router.get('/users', (req, res) => {
    try {
        res.send(userRepository.getUsers())
    }
    catch {
        res.send('Erreur requete GET : userRepository.getUsers()')
    }
})

//Route pour récupérer un "user" via son firstName
router.get('/users/:firstName', (req, res) => {
    try {   
        let userByFirstName = userRepository.getUserByFirstName(req.params.firstName)
        if (userByFirstName == undefined) {
            res.status(404).end()
        }
        res.status(200).send(userByFirstName)
    }
    catch {
        res.send("Erreur requete GET : userRepository.getUserByFirstName(req.params.firstName)")
    }
})

//Route pour récupérer un "user" via son id
router.get('/users/id/:id', (req,res) => {
    try {
        const foundUser = userRepository.getUserById(req.params.id)
        if(foundUser == undefined) {
            res.status(404).end()
        }
        res.status(200).send(foundUser)
    }
    catch (e){
        res.send('Erreur requete GET : userRepository.getUserById(req.params.id)')
    }
})

//Route pour créer un "user"
router.post('/users', (req,res) => {
    try {
        let createUser = userRepository.createUser(req.body)
        if (createUser == undefined) {
            res.status(409).end()
        }
        res.status(201).end()
    }
    catch {
        res.send('Erreur requete GET : userRepository.createUser(req.body)')
    }
})

//Route pour modifier un "user"
router.post('/users/edit' , (req, res) => {
    try {
        //console.log(req.body)
        userRepository.editUser(req.body)
        res.status(204).send('Utilisateur modifié !')
    }
    catch {
        res.send('Erreur requete GET : userRepository.editUser(req.body)')
    }

})

//Route pour supprimer un "user"
router.post('/users/delete/:id' , (req, res) => {
    try {
        //console.log(req.params)
        userRepository.deleteUser(req.params.id)
        res.status(202).send('Utilisateur supprimé !')
    }
    catch {
        res.send('Erreur requete GET : userRepository.deleteUser(req.params.id)')
    }

})

//Voir les logs
router.get('/logs', (req, res) => {
    try {
        res.status(200).send(log.getLogs())
    }
    catch {
        res.send('Erreur requete GET : log.getLogs()')
    }
})

exports.initializeRoutes = function() {
    return router
}