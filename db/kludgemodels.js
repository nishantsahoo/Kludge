const Sequelize = require('sequelize');

const db = new Sequelize('kludge', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = db.define('user', {
	    
    name: Sequelize.STRING,
    email: Sequelize.STRING
});

db.sync({})
