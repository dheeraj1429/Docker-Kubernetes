const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/user-info', async (req, res, next) => {
   const { name, email } = req.query;
   const respose = await axios.get(
      `http://${process.env.API_APP_SERVICE_HOST}:8000/info?name=${name}&email=${email}`
   );
   if (respose?.data?.status === 200) {
      return res.status(200).json(respose.data);
   }
});

app.post('/task', (req, res, next) => {
   const { task } = req.query;
   const folderPath = path.join(__dirname, 'task', 'task.txt');
   fs.writeFileSync(folderPath, task, 'utf-8');

   return res.status(200).json({
      success: true,
      error: false,
      task: task,
   });
});

app.get('/get-task', (req, res, next) => {
   const filePath = path.join(__dirname, 'task', 'task.txt');
   fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
         console.log(err);
      }
      return res.status(200).json({
         success: true,
         error: false,
         task: data,
      });
   });
});

app.listen(3000, () => {
   console.log('api server runing in port 3000');
});
