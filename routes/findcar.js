const express = require('express');
const router = express.Router();
const findcarServices = require('../services/findcar');

/* Save findcar */
router.post("/", async function(req, res, next) {
	try {
	    res.json(await findcarServices.create(req.body));
	} catch (err) {
	    console.error(`Error while creating findcar `, err.message);
	    next(err);
	}
});

module.exports = router;