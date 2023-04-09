const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/check', (req, res, next) => {
   res.status(200).json({
      message: 'working',
   });
});

app.get('/info', (req, res, next) => {
   const { name, email } = req.query;
   if (name && email) {
      return res.status(200).json({
         name,
         email,
         status: 200,
      });
   }

   return res.status(400).json({
      success: false,
      error: true,
      message: 'user information is not found!',
   });
});

app.post('/create-task', async (req, res, next) => {
   const { task } = req.body;

   const response = await axios.post(
      `http://${process.env.APP_ADDRESS}/task?task=${task}`
   );

   if (response?.data) {
      return res.status(200).json(response?.data);
   }

   return res.status(400).json({
      success: false,
      error: true,
      message: 'something worng',
   });
});

app.listen(8000, () => {
   console.log('api server runing in port 8000');
});
