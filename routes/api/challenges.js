const express = require("express");
// use mergeParams to get access to group_id from parent route
const router = express.Router({ mergeParams: true });
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
const Challenge = require("../../models/Challenge");
const Group = require("../../models/Group");
const User = require("../../models/User");

// @route       POST api/group/:group_id/challenges
// @desc        Create a challenge to group with group_id
// @access      Private
router.post(
  "/",
  [auth, check("name", "Name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const group_id = req.params.group_id;
      const group = await Group.findById(group_id);
      if (!group) {
        return res
          .status(400)
          .json({ msg: "There is no group with the given id" });
      }
      const newChallenge = new Challenge({
        group: group_id,
        name: req.body.name,
        description: req.body.description,
        members: [{ user: req.user.id }],
      });

      const challenge = await newChallenge.save();
      res.json(challenge);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       GET api/group/:group_id/challenges
// @desc        Get all challenges in a specific group with group_id
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const challenges = await Challenge.find({
      group: req.params.group_id,
    }).sort({ date: -1 });
    res.json(challenges);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/group/:group_id/challenges/:challenge_id
// @desc        Get challenge by challenge_id
// @access      Private
router.get(
  "/:challenge_id",
  [auth, checkObjectId("challenge_id")],
  async (req, res) => {
    try {
      const challenge = await Challenge.findById(req.params.challenge_id);
      if (!challenge) {
        return res.status(404).json({ msg: "Challenge not found" });
      }
      res.json(challenge);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       DELETE api/group/:group_id/challenges/:challenge_id
// @desc        Delete challenge by challenge_id
// @access      Private
router.delete(
  "/:challenge_id",
  [auth, checkObjectId("challenge_id")],
  async (req, res) => {
    try {
      await Challenge.findOneAndRemove({ _id: req.params.challenge_id });
      res.json({ msg: "Challenge removed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       PUT api/group/:group_id/challenges/:challenge_id
// @desc        Edit challenge by challenge_id
// @access      Private
router.put(
  "/:challenge_id",
  [
    auth,
    checkObjectId("challenge_id"),
    [check("name", "Name is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description } = req.body;
    const challenge_id = req.params.challenge_id;
    const challengeFields = {};
    if (name) challengeFields.name = name;
    if (description) challengeFields.description = description;
    try {
      let challenge = await Challenge.findOneAndUpdate(
        { _id: challenge_id },
        { $set: challengeFields },
        { new: true }
      );
      if (!challenge) {
        return res
          .status(400)
          .json({ msg: "There is no challenge with the given id" });
      }
      res.json(challenge);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.use("/:challenge_id/submissions", require("./submissions"));

module.exports = router;
