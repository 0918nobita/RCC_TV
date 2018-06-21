const express = require('express'),
      router = express.Router();

router.get('/', function(req, res, next) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(200);
  res.send({
    'api-version': '1.0'
  });
});

module.exports = router;
