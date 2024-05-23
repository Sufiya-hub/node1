const express = require('express');
const router = express.Router();
const users = require('./userModel');
const jwt = require('jsonwebtoken');

const myKey = 'qwertyuiop';

const sign = (id) => {
  return jwt.sign({ id }, myKey, { expiresIn: '1d' });
};
const sendres = (user, res) => {
  const token = sign(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  res.status(200).json({
    token,
    user,
  });
};
router.get('/getUsers', async (req, res) => {
  const userdata = await users.find();
  if (userdata) return res.status(200).json(userdata);
  else
    return res.status(400).json({
      status: 'failure',
    });
});

router.post('/createUser', async (req, res) => {
  console.log(req.body);
  const data = req.body;
  const newUser = await users.create(data);
  if (newUser) return res.status(200).json(newUser);
  res.status(400).json({
    message: 'failure',
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  //   console.log(email, password);
  const user = await users.findOne({ email: email });
  console.log(user);
  if (!user)
    return res.status(404).json({
      message: 'No user',
      status: 'failure',
    });
  if (user.password === password) {
    // return res.status(200).json({
    //   message: 'logged in',
    //   status: 'success',
    //   jwt: 'abcdtoken',
    // });
    sendres(user, res);
    return;
  }

  res.status(400).json({
    message: 'Incorrect',
    status: 'failure',
  });
});

router.post('/signup', async (req, res) => {});
module.exports = router;
