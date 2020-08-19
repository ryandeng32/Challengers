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
// @desc        Create a challenge
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
module.exports = router;
