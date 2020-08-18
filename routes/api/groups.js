const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// Mongoose Model
const Group = require("../../models/Group");
const User = require("../../models/User");

// @route       GET api/groups/me
// @desc        Get current user's joined groups
// @access      Private
router.get("/me", auth, async (req, res) => {
  try {
    const group = await Group.find({
      members: { $elemMatch: { user: req.user.id } },
    });

    if (group.length === 0) {
      return res.status(400).json({ msg: "There are no groups for this user" });
    }
    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       POST api/groups/
// @desc        Create or update group
// @access      Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description } = req.body;
    // Build group object
    const groupFields = {};
    groupFields.members = [{ user: req.user.id }];
    if (name) groupFields.name = name;
    if (description) groupFields.description = description;

    try {
      let group = await Group.findOne({ name });
      if (group) {
        // Update
        // @TODO take care of groupField.members with there are multiple
        group = await Group.findOneAndUpdate(
          { name },
          { $set: groupFields },
          { new: true }
        );
        return res.json(group);
      }

      // Create new group
      group = new Group(groupFields);
      await group.save();

      res.json(group);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
