import express from "express";
const app = express();
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "code-test",
  password: "postgres",
  port: 54321,
});
const port = 3000;
const posts = [];
app.post("/addPost", async (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
    rate: 5,
    userId: req.body.userId,
  };
  await pool.query(
    "INSERT INTO posts (title, content,rate,user_id) VALUES ($1, $2,$3,$4)",
    [post.title, post.content, post.rate, post.userId]
  );
});
app.get("/posts/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const posts = await pool.query(
      `select * from posts WHERE user_id=${userId} ORDER BY id LIMIT ${pageSize} OFFSET ${offset};`
    );
    res.json({
      page: page,
      pageSize: pageSize,
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/posts", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const posts = await pool.query(
      `select * from posts ORDER BY id LIMIT ${pageSize} OFFSET ${offset};`
    );
    res.json({
      page: page,
      pageSize: pageSize,
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/review/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const rate = req.body.rate;
    const post = await pool.query(
      `UPDATE posts SET rate = ${rate} WHERE id=${postId}`
    );
    res.json({
      page: page,
      pageSize: pageSize,
      posts: post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
