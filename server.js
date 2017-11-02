const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const passport = require('./auth/passport');
const uid = require('uid2');

var randomInt = require('random-int');

console.log("Random Integer:", randomInt(100,100000000))

const app = express();

app.get('/', (req, res) => {
   res.send('Dashboard')
});

// app.set("view engine", "hbs");

app.use(cookieParser('abracadabra'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
    secret: 'abracadabra',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

const BandwidthRoute = require('./routes/bandwidth'); // route for Bandwidth
app.use('/sniff/bandwidth', BandwidthRoute);

app.use(express.static(__dirname + '/views'));

app.use('/', require('./routes/pages'));

app.listen(9000, function () {
    console.log("Server started on http://localhost:9000");
});