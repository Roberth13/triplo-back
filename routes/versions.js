const express = require('express');
const router = express.Router();
const versionsServices = require('../services/versions');

/* GET versions */
router.get('/', async function(req, res, next) {
  try {
    res.json(await versionsServices.getVersions(req.query.page));
  } catch (err) {
    console.error(`Error while getting versions `, err.message);
    next(err);
  }
});

/* GET version */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await versionsServices.getVersion(req.params.id));
  } catch (err) {
    console.error(`Error while getting version `, err.message);
    next(err);
  }
});

/* Create version */
router.post('/', async function(req, res, next) {
  try {
    res.json(await versionsServices.create(req.body));
  } catch (err) {
    console.error(`Error while creating version `, err.message);
    next(err);
  }
});

/* PUT version */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await versionsServices.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating version`, err.message);
    next(err);
  }
});

/* DELETE version */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await versionsServices.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting version`, err.message);
    next(err);
  }
});

/* GET versions by modelId*/
router.get('/s/:id', async function(req, res, next) {
  try {
    res.json(await versionsServices.getVersionByModel(req.params.id));
  } catch (err) {
    console.error(`Error while getting versions `, err.message);
    next(err);
  }
});

module.exports = router;