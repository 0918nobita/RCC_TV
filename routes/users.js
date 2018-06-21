const express = require('express'),
      router = express.Router();

router.get('/', function(req, res, next) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(200);
  res.send({
    "users": [
      {
        "name": "root",
        "created": "2018-06-21 15:39:00",
        "modified": "2018-06-21 15:39:00"
      },
      {
        "name": "guest",
        "created": "2018-06-21 15:39:00",
        "modified": "2018-06-21 15:39:00"
      },
      {
        "name": "0918nobita",
        "created": "2018-06-21 15:39:00",
        "modified": "2018-06-21 15:39:00"
      }
    ]
  });
});

module.exports = router;
