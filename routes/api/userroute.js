const route = require('express').Router();
const data = require('../../db/actions');

console.log(data.getusername);

route.get('/getusername', (req, res) => {
    username = data.getusername();
    res.send(username);
});

module.exports = route;