const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  await User.find()
      .then(result =>{
        res.status(200).send(result);
        return;
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({
          message: error.message
        })
      });
});
// .map(user => user.login)

router.post('/', async (req, res) => {
  const {login, password} = req.body;
  await User.find()
    .then(result =>{
      if (result.map(user => user.login).filter(user => user === login).length != 0){
        res.status(401).send({
          message: "Username taken"
        })
      } else {
        const toInsert = new User({login, password});
        toInsert
          .save()
          .then(result =>{
            res.status(200).send(result._id);
            return;
          })
          .catch(error => {
            console.log(error);
            res.status(500).send({
              message: error.message
            });
          });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({
        message: error.message
      });
    });
});

router.post('/login', async (req, res) => {
  const {login, password} = req.body;
  await User.find()
  .then(result =>{
    if (result.map(user => user.login).filter(user => user == login).length == 1){
      const loginUser = result.filter(user => user.login == login)[0];
      if (loginUser.password == password){
        res.status(200).send({
          id: loginUser._id
        })
        return;
      } else {
        res.status(401).send({
          message: "Wrong password"
        })
      }
    } else {
      res.status(401).send({
        message: "User does not exist"
      })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).send({
      message: error.message
    })
  });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id
  await User.findOne({ _id: id })
      .then(result =>{
        res.status(200).send(result.login);
        return;
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({
        message: error.message
        })
      });
});

router.get('/:id/posts', async (req, res) => {
  const id = req.params.id
  await User.findOne({ _id: id })
      .then(user =>{
        Post.find()
        .then(userPosts => {
          res.status(200).send(userPosts.filter(
            post => post.author == id
          ));
          return;
        })
        .catch(error => {
          console.log(error);
          res.status(500).send({
          message: error.message
          })
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({
        message: error.message
        })
      });
});

router.delete('/all', async (req, res) => {
  await User.deleteMany()
        .then(result =>{
          res.status(200).send("all deleted");
          return;
        })
        .catch(error => {
          console.log(error);
          res.status(500).send({
          message: error.message
          })
        });
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id)
        .then(result =>{
          res.status(200).send({
            deletedPostId: id
          });
          return;
        })
        .catch(error => {
          console.log(error);
          res.status(500).send({
          message: error.message
          })
        });
});

module.exports = router;
