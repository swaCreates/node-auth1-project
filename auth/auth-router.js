const express= require('express');
const bcrypt= require('bcryptjs');
const db= require('../users/user-model.js');
const auth= require('../middleware/authN.js');

const router= express.Router();

router.post('/register', async (req, res, next) => {
    try {
        // checking the username through req.body object
        // purpose is to check if username already exists in db
        const username= req.body.username;
        const user= await db.findBy({username}).first();
        
        // checking if username already exists
        if(user){
            return res.status(409).json({ // 409 stands for conflict
				message: "Username is already taken",
			});
        };

        const newUser= await db.add(req.body);
        
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    const authErr= {
        message: 'You shall not pass',
    };

    try {
        // searching for user in db with stored username
        const user= await db.findBy({
            username: req.body.username
        }).first();

        if(!user){
            return res.status(401).json(authErr);
        };

        // since bcrypt hashes generate different results due to the salting,
		// we rely on the magic internals of bcrypt to compare hashes rather than doing it
        // manually with "!=="
        
        const validPswd= await bcrypt.compare(req.body.password, user.password); 
        // checking if the password entered by user 
        // is the same as password saved in db

        if(!validPswd){
            return res.status(401).json(authErr);
        };

        // creates a new session for the user and saves it in memory.

        req.session.user= user;

        res.json({
            message: `Welcome ${user.username}!`,
        });

    } catch (err) {
        next(err);
    }
});

router.get('/logout', auth(), async (req, res, next) => {
    // this will delete the session in the database and try to expire the cookie,
	// though it's ultimately up to the client if they delete the cookie or not.
    // but it becomes useless to them once the session is deleted server-side.
    
    req.session.destroy(err => {
        if(err){
            next(err);
        } else{
            res.json({
                success_message: 'You have logged out.',
            });
        };
    });
});

module.exports= router;