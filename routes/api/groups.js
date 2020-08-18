const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
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
      return res.status(400).json({ msg: "There is no group for this user" });
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
    if (name) groupFields.name = name;
    if (description) groupFields.description = description;

    try {
      let group = await Group.findOne({ name });
      if (group) {
        // Update
        group = await Group.findOneAndUpdate(
          { name },
          { $set: groupFields },
          { new: true }
        );
        return res.json(group);
      }

      // Create new group
      groupFields.members = [{ user: req.user.id }];
      group = new Group(groupFields);
      await group.save();

      res.json(group);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       GET api/groups/
// @desc        get all groups
// @access      Public
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/groups/:group_id
// @desc        get group by group ID
// @access      Public
router.get("/:group_id", checkObjectId("group_id"), async (req, res) => {
  try {
    const group = await Group.findOne({ _id: req.params.group_id });
    if (!group) {
      return res
        .status(400)
        .json({ msg: "There is no group with the given id" });
    }
    res.json(group);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
