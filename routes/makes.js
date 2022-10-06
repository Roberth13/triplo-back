const express = require('express');
const router = express.Router();
const makesServices = require('../services/makes');

/* GET makes */
router.get('/', async function(req, res, next) {
  try {
    res.json(await makesServices.getMakes(req.query.page));
  } catch (err) {
    console.error(`Error while getting makes `, err.message);
    next(err);
  }
});

/* GET make*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await makesServices.getMake(req.params.id));
  } catch (err) {
    console.error(`Error while getting make `, err.message);
    next(err);
  }
});
/* GET make by Name*/
router.get('/s/:name', async function(req, res, next) {
  try {
    res.json(await makesServices.getMakeByName(req.params.name));
  } catch (err) {
    console.error(`Error while getting make `, err.message);
    next(err);
  }
});

/* Create Make */
router.post('/', async function(req, res, next) {
  try {
    console.log("BODY")
    console.log(req.body);
    res.json(await makesServices.create(req.body));
  } catch (err) {
    console.error(`Error while creating makes `, err.message);
    next(err);
  }
});

/* PUT make */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await makesServices.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating make`, err.message);
    next(err);
  }
});

/* DELETE make */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await makesServices.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting make`, err.message);
    next(err);
  }
});

module.exports = router;