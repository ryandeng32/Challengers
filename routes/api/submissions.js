const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router({ mergeParams: true });
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");

const User = require("../../models/User");
const Submission = require("../../models/Submission");
// @route       POST /submissions/
// @desc        Create submission
// @access      Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("detail", "Detail is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newSubmission = new Submission({
        title: req.body.title,
        name: user.name,
        detail: req.body.detail,
        user: req.user.id,
        challenge: req.params.challenge_id,
      });

      const submission = await newSubmission.save();
      res.json(submission);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       GET /submissions/
// @desc        Get all submissions in challenge
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const submissions = await Submission.find({
      challenge: req.params.challenge_id,
    }).sort({ date: -1 });
    res.json(submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET /submissions/:sub_id
// @desc        Get submission by sub_id
// @access      Private
router.get("/:sub_id", [auth, checkObjectId("sub_id")], async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.sub_id);
    if (!submission) {
      return res
        .status(400)
        .json({ msg: "There is no submission with the given id" });
    }
    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       DELETE /submissions/:sub_id
// @desc        delete submission by sub_id
// @access      Private
router.delete("/:sub_id", [auth, checkObjectId("sub_id")], async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.sub_id);
    if (!submission) {
      return res
        .status(400)
        .json({ msg: "There is no submission with the given id" });
    }
    if (submission.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await submission.remove();
    res.json({ msg: "Submission deleted Successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       PUT /submissions/like/:sub_id
// @desc        Like a submission
// @access      Private
router.put(
  "/like/:sub_id",
  [auth, checkObjectId("sub_id")],
  async (req, res) => {
    try {
      const submission = await Submission.findById(req.params.sub_id);
      if (!submission) {
        return res
          .status(400)
          .json({ msg: "There is no submission with the given id" });
      }
      // Unlike if it's liked by current user already
      if (submission.likes.some((el) => el.user.toString() === req.user.id)) {
        submission.likes = submission.likes.filter(
          (like) => like.user.toString() !== req.user.id
        );
      } else {
        submission.likes.unshift({ user: req.user.id });
      }
      await submission.save();
      res.json(submission.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       POST submissions/comment/:sub_id
// @desc        Comment on a submission
// @access      Private
router.post(
  "/comment/:sub_id",
  [
    auth,
    checkObjectId("sub_id"),
    check("text", "Text is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const submission = await Submission.findById(req.params.sub_id);
      if (!submission) {
        return res
          .status(400)
          .json({ msg: "There is no submission with the given id" });
      }
      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };
      submission.comments.unshift(newComment);
      await submission.save();
      res.json(submission.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       DELETE submissions/:sub_id/comment/:comment_id
// @desc        Delete a comment
// @access      Private
router.delete(
  "/:sub_id/comment/:comment_id",
  [auth, checkObjectId("sub_id"), checkObjectId("comment_id")],
  async (req, res) => {
    try {
      const submission = await Submission.findById(req.params.sub_id);
      if (!submission) {
        return res
          .status(400)
          .json({ msg: "There is no submission with the given id" });
      }
      const comment = submission.comments.filter(
        (item) => item._id.toString() === req.params.comment_id
      )[0];
      if (comment.length === 0) {
        return res.status(400).json({ msg: "Comment does not exist!" });
      }
      // Check if user created the comment
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
      submission.comments = submission.comments.filter(
        (item) => item._id !== comment._id
      );
      await submission.save();
      res.json(submission.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
