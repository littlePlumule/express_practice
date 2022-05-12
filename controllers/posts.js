const Post = require('../models/posts');
const { success, fail, notFound } = require('../service/response');

const posts = {
  async getPosts(req, res) {
    const data = await Post.find();
    success(res, data);
  },

  async createdPosts(req, res) {
    try {
      const { body } = req;
      if(body.content) {
        const newPosts = await Post.create(body);
        success(res, newPosts);
      } else {
        fail(res, '未填寫貼文內容')
      }      
    } catch(error) {
      fail(res, error.message)
    }
  },

  async deletePosts(req, res) {
    if (req.originalUrl === '/posts/') {
      notFound(res);
    } else {
      await Post.deleteMany({});
      success(res, []);
    }
  },

  async deletePost(req, res) {
    const posts = await Post.find();
    const id = req.params.id;
    const index = posts.findIndex(element => element._id == id);
    if(index !== -1) {
      await Post.findByIdAndDelete(id);
      const posts = await Post.find();
      success(res, posts);
    } else {
      fail(res, 'id 不匹配');
    }
  },

  async changePost(req, res) {
    try {
      const { body } = req;
      const posts = await Post.find();
      const id = req.params.id;
      const index = posts.findIndex(element => element._id == id);
      if(index !== -1 && body.content) {
        await Post.findByIdAndUpdate(id, body);
        const posts = await Post.findById(id);
        success(res,posts);
      } else {
        fail(res, 'id 不匹配 or 未填寫貼文內容');
      }
    } catch(error) {
      fail(res, error.message);
    }
  }
}

module.exports = posts;
