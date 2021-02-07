const express = require('express');

const router = express.Router();
const verify = require('../../middleware/verify');
const Profile = require('../../models/Profile');
const { validate, profileRules } = require('../../services/validationManager');
const ProfileManager = require('../../services/ProfileManager');

// // @route GET api/profile
// // @desc Route for the author profile
// // @access Private
// router.get('/profile', verify, async (req, res) => {
//   try {
//     const user = req.user.id;
//     const profile = await Profile.findOne({ user }).populate('user', [
//       'name',
//       'avatar'
//     ]);

//     if (!profile) {
//       return res.status(400).json({ errors: [{ msg: 'Unknown User!' }] });
//     }
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ errors: [{ msg: 'The server encoutered an Error!' }] });
//   }
// });

// @route POST api/profile
// @desc Route to create the author profile
// @access Private
router.post('/add', verify, profileRules, validate, async (req, res) => {
  try {
    const {
        company, websites, location, status,
        skills, bio, interest, projects, posts, profiltags, resume
    } = req.body;
      const { user } = req;
      const created = await ProfileManager.create({
        user,
        company,
        websites,
        location,
        status,
        skills,
        bio,
        interest,
        projects,
        posts,
        profiltags,
        resume
    });
      if (!created) {
        return res
          .status(500)
          .json({ errors: [{ msg: 'The server encoutered an Error!' }] });
      }
      res.status(201).json({ ressource: created });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ errors: [{ msg: 'The server encountered an Error!' }] });
  }
});

module.exports = router;
