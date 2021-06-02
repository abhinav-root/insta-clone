const router = require("express").Router();
const User = require("../models/userModel");

router.post("/info", async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  res.json(user);
});

router.post("/updatesaved", async (req, res) => {
  try {
    const { postId, user_id } = req.body;
    console.log(req.body);
    const result = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $push: {
          posts: postId,
        },
      }
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
