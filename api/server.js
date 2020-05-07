const express= require('express');
const helmet= require('helmet');
const session= require('express-session');
const KnexSessionStore= require('connect-session-knex')(session); // allows persistence of data to db even if server is restarted
// same as const knexSessionStore= KnexSessionStore(session)
const db_config= require('../data/db_config.js'); // imported to put into session configuration
const auth_router= require('../auth/auth-router.js');
const user_router= require('../users/user-router.js');

// creates instance of server
const server= express();

// built in & third party middleware
server.use(express.json());
server.use(helmet());
// creating session object
server.use(session({
    name: 'token', // overwrites the default cookie name, keeps our stack safe
    resave: false, // avoids recreating sessions that have not changed
    saveUninitialized: false, // GDPR laws, against setting cookies automatically
    secret: process.env.COOKIE_SECRET || 'secret', // cryptographically sign the cookie
    cookie: {
        httpOnly: true, // disallows js from reading our cookie contents
    },
    store: new KnexSessionStore({
        knex: db_config, // configured instance of knex
        createtable: true, // if a sessions table doesn't exist, create one automatically
    }),
}));

// route handlers
server.get('/', async (req, res, next) => {
    try {
        await res.send(`<h4 align='center'>Welcome to my server! :)</h4>`);
    } catch (err) {
        next(err);
    };
});

server.use('/api', auth_router);
server.use('/api/users', user_router);

// handles no supporting route
server.use((req, res) => {
    res.status(404).send(
        `<h4 align='center'>The url ${req.url.toUpperCase()} was not found.</h4>`
    );
});

// handles errors
server.use((err, req, res, next) => {
    console.log('Server error:', err);
	res.status(500).json({
		message: "Oops, something went wrong. Please try again later.",
	});
});

module.exports= server;