const route = require('express').Router();
const models = require('../db/models').models;
const dbActions = require('../db/actions');
const passport = require('../auth/passport');
const el = require('../auth/authutils').ensureLogin;
const uid = require('uid2');
const path = require('path');

route.get('/login', (req, res) => {
    res.redirect('/login.html');
});

// TODO : Use Passport to login
route.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/profile'
}));

route.post('/login', (req, res) => {
    console.log('Log in details: ', req.body);
    dbActions.login(
        req.body.username,
        req.body.password
    );
    res.redirect('/login.html');
});

route.post('/authorize', (req, res) => {
    models.UserLocal.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then((user) => {

        models.AuthToken.create({
            token: uid(30),
            userId: user.id
        }).then((authtoken) => {
            res.send({
                succcess: true,
                token: authtoken.token
            })
        })

    })
});

route.get('/signup', (req, res) => {
    res.redirect('/signup.html');
});

route.post('/signup', (req, res) => {
    console.log('Sign up details: ', req.body);
    dbActions.signUp(
        req.body.username,
        req.body.password,
        req.body.address,
        req.body.phone_number
    );
    res.redirect('/login.html');
});

route.get('/profile', el('/login'), (req, res) => {
        console.log(req.user);
        res.redirect("/profile.html");
});

route.get('/auction', el('/login'), (req, res) => {
        console.log(req.user);
        res.redirect("auction.html");
});

route.get('/logout', (req, res) => {
    req.user = null;
    req.logout();

    req.session.destroy(() => {
        res.redirect('/login.html');
    });
});

module.exports = route;
