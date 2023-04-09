const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/check', (req, res, next) => {
   // console.log(process.env.CLIENT_APP_SERVICE_HOST);
   console.log(process.env.CLIENT_APP);
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

   // if we want to use the auto genrate ip address with selected service.
   // then we an use _SERVICE_HOST method.

   // const response = await axios.post(
   //    `http://${process.env.CLIENT_APP_SERVICE_HOST}:3000/task?task=${task}`
   // );

   // but we can alost use the dns which is by default kubernetes gives us.
   const response = await axios.post(
      `http://${process.env.CLIENT_APP}:3000/task?task=${task}`
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
