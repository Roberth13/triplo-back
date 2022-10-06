const express = require('express');
const router = express.Router();
const uploadService = require('../services/upload');

/* Create version */
router.post('/:id', async function(req, res, next) {
    try {
      res.json(await uploadService.create(req.body, req.params.id));
    } catch (err) {
      console.error(`Error while upload data `, err.message);
      next(err);
    }
});

module.exports = router;