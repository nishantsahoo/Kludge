const db = require('./models').db;
const models = require('./models').models;
const uid = require('uid2');
const mysql = require('mysql');
var randomInt = require('random-int');

// make use of uid2 library to make unique ids for the user

// Connection string, database connection should be done in this file

const Sequelize = require('sequelize');

const DB = new Sequelize('kludge', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const Item = DB.define('items', {
    ITEM_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    OWNER: Sequelize.STRING,
    PRICE: Sequelize.INTEGER,
    DESCRIPTION: Sequelize.STRING
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "kludge"
});

function getusername()
{
    return "sdf"
}

function getitems() {
    con.connect(function(err) {
      query_string = "Select * from items";
      con.query(query_string, function (err, result, fields) {
        console.log(result);
      });
  });
}

function signUp(username, password, address, phone_number) {
    console.log("SignUp Called");
    con.connect(function(err) {
      var random_val = randomInt(100,100000);
      console.log(`${username} ${password}`);
      query_string = `call register( ${random_val}, '${password}', '${address}', '${phone_number}', '${username}' )`;
      con.query(query_string, function (err, result, fields) {
        console.log(result);
      });
    });
} // end of signUp

function logout() {
    console.log("Logout called");
    con.connect(function(err) {
      query_string = "truncate table cur_user";
      con.query(query_string, function (err, result, fields) {
        console.log(result);
      });
    });
} // end of the function logout

function login(username, password) {
    var status = "";
    con.connect(function(err) {
      // call login function
      query_string = `select login( '${username}', '${password}' ) as status`;
      con.query(query_string, function (err, result, fields) {
        console.log("Status: ", result[0].status);
        status = result[0].status;
      });
        // var user_id;
        //   console.log("username: ", username);
        //   query_string = `select u_id from user where name='${username}'`;
        //   con.query(query_string, function (err, result, fields) {
        //     if (err) throw err;
        //     console.log(result[0]);
        //     user_id = result[0].u_id;
        //   });

          query_string = `insert into cur_user values(null, '${username}');`;
          con.query(query_string, function (err, result, fields) {
            console.log(result);
            console.log("mai bhi");
          });
    });    
} // end of the function login

function addUser(name, email) {
    return models.User.create({
        name, email
    })
}

function auction (itemid, price) {
    console.log("Auction Called");
    con.connect(function(err) {
      query_string = `call cur_auction(5, ${itemid}, ${price})`;
      con.query(query_string, function (err, result, fields) {
        console.log(result);
      });
    });
} // end of signUp

function rent (itemid, dur, amt) {
  console.log("Rent is called");
  var random_val = randomInt(100,100000);
  con.connect(function(err) {
      query_string = `call rent(${random_val}, ${itemid}, 2, '${dur}', ${amt})`;
      con.query(query_string, function (err, result, fields) {
        console.log(result);
      });
    });
}

function share (s_id, buyer1, buyer2, owner, dur, amt, itemid) {
  var random_val = randomInt(100,100000);
  con.connect(function(err) {
      query_string = `call share_item(${s_id}, ${buyer1}, ${buyer2}, ${owner}, '${dur}', ${amt}, ${itemid})`;
      con.query(query_string, function (err, result, fields) {
        console.log(result);
      });
    });
}

module.exports = {
    addUser, signUp, login, logout, getusername, getitems, auction, rent, share
};