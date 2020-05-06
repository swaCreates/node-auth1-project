const express= require('express');
const helmet= require('helmet');

// creates instance of server
const server= express();

// built in & third party middleware
server.use(express.json());
server.use(helmet());

// routes

// handles no supporting route
server.use((req, res) => {
    res.status(404).send(
        `<h4 align='center'>The url ${req.url.toUpperCase()} was not found.</h4>`
    );
});

// handles errors
server.use((err, req, res, next) => {
    console.log('Server error:', err)
	res.status(500).json({
		message: "Oops, something went wrong. Please try again later.",
	});
});

module.exports= server;