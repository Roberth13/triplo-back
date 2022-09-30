const express = require('express');
const router = express.Router();
const usersServices = require('../services/users');

/* GET users */
router.get('/', async function(req, res, next) {
  try {
    res.json(await usersServices.getUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/* GET user*/
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await usersServices.getUser(req.params.id));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});

/* Create user */
router.post('/', async function(req, res, next) {
  try {
    console.log("BODY")
    console.log(req.body);
    res.json(await usersServices.create(req.body));
  } catch (err) {
    console.error(`Error while creating user `, err.message);
    next(err);
  }
});

/* Create user and quote */
router.post('/add', async function(req, res, next) {
  try {
    res.json(await usersServices.add(req.body));
  } catch (err) {
    console.error(`Error while creating user `, err.message);
    next(err);
  }
});

/* PUT user */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await usersServices.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

/* DELETE user */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await usersServices.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
});

module.exports = router;