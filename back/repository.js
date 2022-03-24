//Fichier dédié à l'intéraction avec la DB
const users = require('./db')
const md5 = require('blueimp-md5')

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
    if(getUserById(data.id) != undefined) {
        return undefined
    } 
    data.password = md5(data.password)
    users.push(data)
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