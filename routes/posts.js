const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');


router.get('/', async (req, res) => {
  await Post.find()
      .then(result =>{
        res.status(200).send({
          allPosts: result
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

router.get('/id', async (req, res) => {
  await Post.find()
      .then(result =>{
        res.status(200).send({
          allPosts: result.sort(function(a, b){return  new Date(a.date) - new Date(b.date)}).map(post => post._id)
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

router.post('/', async (req, res) => {
  const {text, date, author} = req.body;
  await User.findOne({ _id: author })
    .then(user => {
      const toInsert = new Post({text, date, author});
      toInsert
        .save()
        .then( result =>{
          console.log(user)
          User.findByIdAndUpdate(author, {'$addToSet': {posts: result._id}})
          .then( userUpdate => {
            res.status(200).send(result);
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
    })
    .catch(error => {
      res.status(404).send({
        message: "Author does not exist"
      });
    });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
	await Post.findById(id)
    .then(result =>{
      res.status(200).send({
        putPostId: id
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

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    await Post.findByIdAndUpdate(id, req.body)
      .then(result =>{
        res.status(200).send({
          putPostId: id
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

router.delete('/all', async (req, res) => {
  await Post.deleteMany()
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
  await Post.findByIdAndDelete(id)
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

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    await Post.findByIdAndUpdate(id, req.body)
      .then(result =>{
        res.status(200).send({
          patchPostId: id
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
