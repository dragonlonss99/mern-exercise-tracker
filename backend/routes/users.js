const router = require('express').Router();
const User = require('../models/user.model');

const errorHandler = (res, err) => res.status(400).json(`Error: ${err}`);

router.route('/').get(async (req, res) => {
	try {
		const users = await User.find();
		return res.json(users);
	} catch (err) {
		await errorHandler(res, err);
	}
});

router.route('/add').post(async (req, res) => {
	const { username } = req.body;
	const newUser = new User({ username });
	try {
		await newUser.save();
		return res.json('User added!');
	} catch (err) {
		await errorHandler(res, err);
	}
});

module.exports = router;
