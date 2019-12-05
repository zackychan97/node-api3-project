const express = require('express');

const router = express.Router();

const UserDB = require('./userDb.js');
const PostDB = require('../posts/postDb.js');

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  res.send('from the users')
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id
  UserDB.getById(id)
    .then(id => {
      req.user = id
    })
    .catch(() => {
      res.status(400).json({ message: "user id dont exist sonny" })
    })
    next();
}

function validateUser(req, res, next) {
  // do your magic!
  const infoOfUser = req.body;

  if(Object.values(infoOfUser).length <= 0) {
    res.status(400).json({ message: "you dont have any info for us" })
  } else if (!infoOfUser.name) {
    res.status(400).json({ message: "we need the name" })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const postsBody = req.body
  if(Object.values(postsBody).length <= 0){
    res.status(400).json({ message: "you dont have any info for us" })
  } else if (!postsBody.text) {
    res.status(400).json({ message: "we need the name" })
  } else {
    next();
  }

}

module.exports = router;
