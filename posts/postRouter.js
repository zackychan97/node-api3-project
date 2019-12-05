const express = require('express');

const router = express.Router();

//grab the database
const Posts = require('./postDb');



router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error: 'Could not get posts from db'})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id
  Posts.getById(id)
    .then(foundID => {
      res.status(200).json(foundID)
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not get post id from db'})
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id
  Posts.getById(id)
    .then(deletePost => {
      if (deletePost) {
        Posts.remove(id, deletePost)
          .then(removed => {
            res.status(200).json({ message: 'Post deleted', deletePost })
          })
          .catch(() => {
            res.status(500).json({ error: 'Could not delete post' })
          })
      } else {
        res.status(404).json({ message: 'Post with the desired id does not exist'})
      }
    })
    .catch(() => {
        res.status(500).json({ error: 'You cant delete that post' })
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
  res.send(req.body);

  Posts.update(req.params.id, req.body)
    .then(putPost => {
      res.status(200).json(putPost)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Cant get that post buddy" })
    })

});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  Posts.getById(req.params.id)
    .then(post => {
      if (post){
        req.response = post;
        next();
      } else {
        res.status(400).json({ message: 'The post with the desired ID does not exist'})
      }
    })
    .catch(error => {
      console.log(error)
    });
}

module.exports = router;
