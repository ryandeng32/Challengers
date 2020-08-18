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
      members: { $elemMatch: { id: req.user.id } },
    });

    if (group.length === 0) {
      return res.status(400).json({ msg: "There are no groups for this user" });
    }
    console.log(group);
    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       POST api/group/
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
  }
);
module.exports = router;
