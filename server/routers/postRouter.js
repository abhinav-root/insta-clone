const router = require("express").Router();
const Post = require("../models/postModel");
const multer = require("multer");
const User = require("../models/userModel");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/posts");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + ".png");
  },
});

const upload = multer({ storage: fileStorageEngine });

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.json({ posts: posts });
  } catch (err) {
    console.log(err);
  }
});

// add new post
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    const newPost = new Post({
      author: req.body.name,
      postTitle: req.body.title,
      postImageSrc: req.file.originalname + ".png",
    });
    newPost.save();
    await User.findOneAndUpdate(
      { _id: req.body.id },
      {
        $inc: {
          posts: 1,
        },
      },
      { useFindAndModify: false }
    );
    console.log(req.body);

    return res.send("file upload successfull");
  } catch (err) {
    console.log(err);
  }
});

// update likes
router.post("/updatelikes", async (req, res) => {
  const { pressedLike, postId } = req.body;
  const savedPost = await Post.findOne({ _id: postId });
  const savedLikes = savedPost.likes;
  const newLikes = pressedLike
    ? savedLikes + 1
    : savedLikes != 0
    ? savedLikes - 1
    : savedLikes;
  Post.updateOne(
    { _id: postId },
    {
      $set: {
        likes: newLikes,
      },
    },
    { useFindAndModify: false }
  ).then((res) => console.log(res));
  res.end();
});

// update comments
router.post("/updatecomments", async (req, res) => {
  const { comment, postId } = req.body;
  console.log(req.body);
  const result = await Post.findOneAndUpdate(
    {
      _id: postId,
    },
    {
      $push: {
        comments: comment,
      },
    },
    { useFindAndModify: false }
  );
  console.log(result);
  return res.end();
});

router.post("/updateviews", async (req, res) => {
  const posts = req.body.posts;
  await posts.map(async (post) => {
    const res = await Post.findOneAndUpdate(
      { _id: post._id },
      {
        $inc: {
          views: 1,
        },
      },
      { useFindAndModify: false }
    );
    // console.log(res);
  });
});

module.exports = router;
