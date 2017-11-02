const route = require('express').Router();
const data = require('../../db/actions');

console.log(data.getusername);

route.get('/getusername', (req, res) => {
	console.log("Called")
    username = data.getusername();
    res.send(username);
});

route.get('/getitems', (req, res) => {
    items = data.getitems();
    console.log(items);
    res.send(items);
});

module.exports = route;