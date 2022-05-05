const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/posts');

/* GET users listing. */
router.get('/', postsControllers.getPosts);

router.post('/', postsControllers.createdPosts);

router.delete('/', postsControllers.deletePosts);

router.delete('/:id', postsControllers.deletePost);

router.patch('/:id', postsControllers.changePost);

module.exports = router;
