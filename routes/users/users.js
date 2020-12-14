const express = require('express');
const router = express.Router();

const {signUp, login} = require('./controller/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-up', signUp)
router.post('/login', login)

module.exports = router;
