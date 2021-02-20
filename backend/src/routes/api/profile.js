const express = require('express');

const router = express.Router();
const verify = require('../../middleware/verify');
const Profile = require('../../models/Profile');
const { validate, profileRules } = require('../../services/validationManager');
const ProfileManager = require('../../services/ProfileManager');

// @route GET api/profile
// @desc Route for the author profile
// @access Private
router.get('/', verify, async (req, res) => {
    try {
        const { limit, offset, sort } = req.query;
        const { user } = req;

        const all = await ProfileManager.get(user, sort, limit, offset);

        if (!all) {
            return res
                .status(500)
                .json({ errors: [{ msg: 'The server encoutered an Error!' }] });
        }

        res.status(200).json({
            ...all,
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ errors: [{ msg: 'The server encoutered an Error!' }] });
    }
});

// @route POST api/profile/add
// @desc Route to create the author profile
// @access Private
router.post('/add', verify, profileRules, validate, async (req, res) => {
    try {
        const {
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
            resume,
            education,
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
            resume,
            education,
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

// @route PATCH api/profile/update
// @desc Route to create the author profile
// @access Private
router.patch('/update', validate, verify, async (req, res) => {
    try {
        const {
            id,
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
            resume,
            education,
        } = req.body;
        const { user } = req;

        const updated = await ProfileManager.update({
            user,
            id,
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
            resume,
            education,
        });
        if (!updated) {
            return res
                .status(422)
                .json({ errors: [{ msg: 'Unprocessable Entity' }] });
        }
        res.status(201).json({ ressource: updated });
    } catch (err) {
        return res
            .status(500)
            .json({ errors: [{ msg: 'The server encountered an Error!' }] });
    }
});

// @route DELETE api/post/remove
// @desc Route to create the author profile
// @access Private
router.delete('/remove', verify, async (req, res) => {
    try {
        const { id } = req.body;
        const removed = await ProfileManager.remove({ id });
        if (!removed) {
            return res
                .status(422)
                .json({ errors: [{ msg: 'Unprocessable Entity' }] });
        }
        res.status(200).json({ ressource: removed });
    } catch (err) {
        return res
            .status(500)
            .json({ errors: [{ msg: 'The server encountered an Error!' }] });
    }
});

module.exports = router;
