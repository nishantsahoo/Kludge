const db = require('./models').db;
const models = require('./models').models;
const uid = require('uid2');
const mysql = require('mysql');
var randomInt = require('random-int');

// make use of uid2 library to make unique ids for the user

// Connection string, database connection should be done in this file

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "kludge"
});

function signUp(username, password, address, phone_number) {
    console.log("SignUp Called");
    con.connect(function(err) {
      if (err) throw err;
      var random_val = randomInt(100,100000);
      console.log(`${username} ${password}`);
      query_string = `call register( ${random_val}, '${password}', '${address}', '${phone_number}', '${username}' )`;
      con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
    });
    alert("Registered");
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

module.exports = {
    addUser, signUp, login, logout
};