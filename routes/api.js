// @flow
import axios from 'axios';
import config from './config';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const auth = { username: config.bitbucket.username,
                 password: config.bitbucket.password };
  
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(200);
  
  const repository = await axios.get('https://api.bitbucket.org/2.0/repositories/' + auth.username + '/ltvod/src', { auth });
  const href = repository.data.values[0].links.self.href;
  const directory = await axios.get(href, { auth });
  const files = directory.data.values;

  for (let file of files)
    await axios.get(file.links.self.href, { auth })
      .then(result => console.log(result.data));

  res.send(JSON.stringify(files));
});

module.exports = router;
