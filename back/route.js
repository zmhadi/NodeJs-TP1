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
         res.send(foundUser)
    }
    catch (e){
        console.log(e)
    }
})

router.post('/users', (req,res) => {
    try {
        userRepository.createUser(req.body)
        res.status(201).end()
    }
    catch {
        res.send('Erreur requete GET : userRepository.createUser(req.body)')
    }
})

exports.initializeRoutes = function() {
    return router
}