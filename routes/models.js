const express = require('express');
const router = express.Router();
const modelsServices = require('../services/models');

/* GET models */
router.get('/', async function(req, res, next) {
  try {
    res.json(await modelsServices.getModels(req.query.page));
  } catch (err) {
    console.error(`Error while getting models `, err.message);
    next(err);
  }
});

/* GET model */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await modelsServices.getModel(req.params.id));
  } catch (err) {
    console.error(`Error while getting model `, err.message);
    next(err);
  }
});

/* GET models by yearId*/
router.get('/s/:id', async function(req, res, next) {
  try {
    res.json(await modelsServices.getModelsByYear(req.params.id));
  } catch (err) {
    console.error(`Error while getting models `, err.message);
    next(err);
  }
});

/* Create model */
router.post('/', async function(req, res, next) {
  try {
    res.json(await modelsServices.create(req.body));
  } catch (err) {
    console.error(`Error while creating model `, err.message);
    next(err);
  }
});

/* Create models */
router.post('/y/:year_id', async function(req, res, next) {
  try {
    res.json(await modelsServices.createByYear(req.params.year_id,req.body));
  } catch (err) {
    console.error(`Error while creating model `, err.message);
    next(err);
  }
});

/* PUT model */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await modelsServices.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating model`, err.message);
    next(err);
  }
});

/* DELETE model */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await modelsServices.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting model`, err.message);
    next(err);
  }
});

module.exports = router;