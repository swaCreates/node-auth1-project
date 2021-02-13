const express= require('express');
const db= require('./user-model.js');
const auth= require('../middleware/authN.js');

const router= express.Router();

router.get('/', auth(), async (req, res, next) => {
    try {
        const users= await db.find();
        res.json(users);
    } catch (err) {
        next(err);
    };
});

module.exports= router;