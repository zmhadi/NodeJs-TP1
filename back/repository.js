//Fichier dédié à l'intéraction avec la DB
const md5 = require('blueimp-md5')
const { v4: uuidv4 } = require('uuid')
//////////////////////////////////////////
const users = require('./db')

const getUsers = function() {
    return users
}

const getUserByFirstName = function(firstName) {
    let userByFirstName = users.find((user) => firstName == user.firstName)
    if (userByFirstName == undefined) {
        return undefined
    }
    return userByFirstName
}

const getUserById = function(id) {
    return users.find((user) => id == user.id)
}

const createUser = function(data) {
    //Encrypter le password de l'utilisateur
    //When we want to assigned an id on req.body
    /*if(getUserById(data.id) != undefined) {
        return undefined
    }*/
    data.id = uuidv4()
    data.password = md5(data.password)
    users.push(data)
    return true
}

const editUser = function(data) {
    for(let i = 0; i<users.length; i++) {
        if(users[i].id == data.id) {
            users[i].id = data.id
            users[i].firstName = data.firstName
            users[i].lastName = data.lastName
            if(users[i].password != data.password) {
                //Encrypter le password de l'utilisateur
                users[i].password = md5(data.password)
            }
        }
        
    }
}

const deleteUser = function(id) {
    for(let i = 0; i<users.length; i++) {
        if(users[i].id == id) {
            users.splice(i);
        }
    }
}

module.exports = {
    getUsers,
    getUserByFirstName,
    getUserById,
    createUser,
    editUser,
    deleteUser
}