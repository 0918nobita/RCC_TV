const argv = require('argv'),
      axios = require('axios'),
      router = require('express').Router();

const asyncMiddleware = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncMiddleware(async (req, res, next) => {
  const args = argv.run().targets,
        auth = { auth: { username: args[0], password: args[1] } };
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(200);
  axios.get('https://api.bitbucket.org/2.0/repositories/' + args[0] + '/ltvod/src', auth)
  .then(result => result.data.values[0].links.self.href)
  .then(href => {
    axios.get(href, auth)
    .then(result => {
      const files = result.data.values;
      console.log(files);
      res.send(JSON.stringify(files));
    });
  });
}));

module.exports = router;
