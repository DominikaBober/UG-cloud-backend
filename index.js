require('dotenv').config();
const cors = require('cors');
const express = require('express');
const users = require('./routes/users');
const posts = require('./routes/posts');

const app = express();
const cache = express();



app.use(express.json());
app.use(cors());
app.use('/users', users);
app.use('/posts', posts);


const mongoose = require('mongoose');

const dbConnData = {
  host: process.env.MONGO_HOST || '127.0.0.1',
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DATABASE || 'mydb',
  pass: process.env.MONGODB_PASSWORD || 'pass',
  user: process.env.MONGODB_USERNAME || 'user'
}

mongoose
  .connect(`mongodb://${dbConnData.user}:${dbConnData.pass}@${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(response => {
    console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
    const port = process.env.PORT || "5000";
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(error => console.error('Error connecting to MongoDB', error));

  