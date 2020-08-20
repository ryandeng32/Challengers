const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router({ mergeParams: true });
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");

const Challenge = require("../../models/Challenge");
const User = require("../../models/User");
const Group = require("../../models/Group");
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
      const user = await (await User.findById(req.user.id)).isSelected(
        "-password"
      );
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

module.exports = router;
