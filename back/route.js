const express = require('express')
const router = express.Router()
const userRepository = require('./repository')

router.get('/users', (req, res) => {
    try {
        res.send(userRepository.getUsers())
    }
    catch {
        res.send('Erreur requete GET : userRepository.getUsers()')
    }
})

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

router.post('/users', (req,res) => {
    try {
        const createUser = userRepository.createUser(req.body)
        if (createUser == undefined) {
            res.status(409).end()
        }
        res.status(201).end()
    }
    catch {
        res.send('Erreur requete GET : userRepository.createUser(req.body)')
    }
})

exports.initializeRoutes = function() {
    return router
}