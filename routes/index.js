// @flow
import express from 'express';

const router = express.Router();

router.get('/', function(req, res, next) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(200);
  res.send(JSON.stringify("index"));
});

module.exports = router;
