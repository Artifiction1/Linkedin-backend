import express from "express";
import PostsModel from "./model.js";
import createHttpError from "http-errors"
const postsRouter = express.Router();

postsRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new PostsModel(req.body);
    const { _id } = await newPost.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/", async (req, res, next) => {
  try {
    //const posts = await PostsModel.find().populate({ path: "users" });
    const posts = await PostsModel.find()
    const users = await UsersModel.find()
    //console.log(posts)
    posts.forEach(
        post =>{
        const foundUser = users.find(user => post.username === user.username)
        post.users = foundUser
      console.log(post)}
      )
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:postId", async (req, res, next) => {
  try {
    const post = await PostsModel.findById(req.params.postId).populate({ path: "users" });
    if (post) {
      res.send(post);
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.postId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.put("/:postId", async (req, res, next) => {
  try {
    const updatedPost = await PostsModel.findByIdAndUpdate(
        req.params.postId, 
        req.body, 
        { new: true, runValidators: true } 
      )
      if (updatedPost) {
        res.send(updatedPost)
      } else {
        next(createHttpError(404, `Post with id ${req.params.postId} not found!`))
      }
  } catch (error) {
    next(error);
  }
});

postsRouter.delete("/:postId", async (req, res, next) => {
  try {
    const deletedPost = await PostsModel.findByIdAndDelete(req.params.postId)
    if (deletedPost) {
      res.status(204).send()
    } else {
      next(createHttpError(404, `Post with id ${req.params.postId} not found!`))
    }
  } catch (error) {
    next(error);
  }
});

export default postsRouter;