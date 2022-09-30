const express = require('express');
const router = express.Router();
const quotesServices = require('../services/quotes');

/* GET quote*/
router.get('/:id', async function(req, res, next) {
    try {
      res.json(await quotesServices.getQuote(req.params.id));
    } catch (err) {
      console.error(`Error while getting quote `, err.message);
      next(err);
    }
});

router.post("/tucarro", async function(req, res, next) {
    try {
      res.json(await quotesServices.getTest(req.body));
    } catch (err) {
      console.error(`Error while getting test `, err.message);
      next(err);
    }
});

module.exports = router;