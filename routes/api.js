const axios = require('axios'),
      config = require('./config'),
      router = require('express').Router();

const asyncMiddleware = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncMiddleware(async (req, res, next) => {
  const auth = { username: config.bitbucket.username,
                 password: config.bitbucket.password };
  
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(200);
  
  const result = await axios.get('https://api.bitbucket.org/2.0/repositories/' + auth.username + '/ltvod/src', { auth });
  const href = result.data.values[0].links.self.href;
  const result2 = await axios.get(href, { auth });
  const files = result2.data.values;

  for (let file of files) {
    console.log('[' + file.path + ']');
    
    await axios.get(file.links.self.href, { auth }).then(result => {
      console.log(result.data);
    });
  }

  res.send(JSON.stringify(files));
}));

module.exports = router;
