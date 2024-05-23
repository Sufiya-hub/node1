const express = require('express');
const router = express.Router();
const burgers = require('./burgerModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const mykey = 'qwertyuiop';
const userModel = require('./userModel');

router.get('/getBurger', async (req, res) => {
  const burgerData = await burgers.find();
  if (burgerData) return res.status(200).json(burgerData);
  res.status(400).json({
    status: 'failure',
  });
});
router.post('/addBurger', async (req, res, next) => {
  let jwtKey;
  console.log(req.cookies);
  console.log(req.headers);

  console.log(req.body);

  if (req.headers?.cookie) {
    jwtKey = req.headers.cookie.split('=')[1];
  }
  if (!jwtKey) {
    return res.status(404).json({
      message: 'No login',
    });
  }
  const decoded = await promisify(jwt.verify)(jwtKey, mykey);
  const user = await userModel.findOne({ _id: decoded.id });
  if (user.role !== 'admin') {
    return res.status(404).json({
      message: 'you are not allowed',
    });
  }
  next();
});
router.post('/addBurger', async (req, res) => {
  const newData = req.body;
  const newBurger = await burgers.create(newData);
  if (!newBurger)
    return res.status(400).json({
      status: 'Failure',
    });
  res.status(200).json(newBurger);
});

router.patch('/updateBurger/:id', async (req, res) => {
  // console.log(req.params.id);
  const id = req.params.id;
  const updateData = req.body;
  const updatedData = await burgers.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (updatedData) return res.status(200).json(updatedData);
  res.status(400).json({
    status: 'Failure',
  });
});
router.delete('/deleteBurger/:id', async (req, res) => {
  const id = req.params.id;
  const deletedData = await burgers.findByIdAndDelete(id, { new: true });
  if (deletedData)
    return res.status(200).json({
      message: 'deleted document successfully',
    });
  res.status(400).json({
    status: 'Failure',
    message: 'can not delete document',
  });
});

module.exports = router;
