const express = require('express');
const router = express.Router();
const yearsServices = require('../services/years');

/* GET years */
router.get('/', async function(req, res, next) {
  try {
    res.json(await yearsServices.getYears(req.query.page));
  } catch (err) {
    console.error(`Error while getting years `, err.message);
    next(err);
  }
});

/* GET year*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await yearsServices.getYear(req.params.id));
  } catch (err) {
    console.error(`Error while getting year `, err.message);
    next(err);
  }
});

/* GET years by makeId*/
router.get('/s/:id', async function(req, res, next) {
  try {
    res.json(await yearsServices.getYearsByMake(req.params.id));
  } catch (err) {
    console.error(`Error while getting years `, err.message);
    next(err);
  }
});

/* Create year */
router.post('/', async function(req, res, next) {
  try {
    res.json(await yearsServices.create(req.body));
  } catch (err) {
    console.error(`Error while creating year `, err.message);
    next(err);
  }
});

/* PUT year */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await yearsServices.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating year`, err.message);
    next(err);
  }
});

/* DELETE year */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await yearsServices.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting year`, err.message);
    next(err);
  }
});

module.exports = router;