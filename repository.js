//Fichier dédié à l'intéraction avec la DB
const users = require('./db')
const md5 = require('blueimp-md5')

const getUsers = function() {
    return users
}

const getUserByFirstName = function(firstName) {
    return users.find((user) => firstName == user.firstName)
}

const createUser = function(data) {
    //Encrypter le password de l'utilisateur
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
    createUser,
    editUser,
    deleteUser
}