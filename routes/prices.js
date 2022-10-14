const express = require('express');
const router = express.Router();
const pricesServ = require('../services/prices');

/* Save prices */
router.post("/", async function(req, res, next) {
	try {
	    res.json(await pricesServ.create(req.body));
	} catch (err) {
	    console.error(`Error while creating price `, err.message);
	    next(err);
	}
});

module.exports = router;