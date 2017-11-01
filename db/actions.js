const db = require('./models').db;
const models = require('./models').models;
const uid = require('uid2');

// make use of uid2 library to make unique ids for the user

// Connection string, database connection should be done in this file

function signUp(name, email, username, password) {
    return models.UserLocal.create({
        username: username,
        password: password,
        user: {
            name: name,
            email: email
        }
    }, {
        include: [models.User]
    })
}


function addUser(name, email) {
    return models.User.create({
        name, email
    })
}

module.exports = {
    addUser, signUp
};