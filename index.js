const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const body = require('body-parser');
const userRouter = require('./usersRoute');
const burgerRouter = require('./burgersRoute');
const cookieParser = require('cookie-parser');
const PORT = 8080;
app.use(cookieParser());
const mongodburl =
  'mongodb+srv://sufiyapattan4:alipattan@training.mlrfd8f.mongodb.net/?retryWrites=true&w=majority&appName=training';
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

mongoose
  .connect(mongodburl)
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use(body.json());

app.use('/users', userRouter);
// app.use('/burgers/', (req, res, next) => {
//   // console.log(req.headers.cookie);
//   let coo;
//   if (req.headers?.cookie) {
//     coo = req.headers?.cookie.split('=')[1];
//   }
//   if (!coo)
//     return res.status(400).json({
//       message: 'you are not authorized',
//     });
//   next();
// });
app.use('/burgers', burgerRouter);
app.listen(PORT, () => {
  console.log('Running');
});
