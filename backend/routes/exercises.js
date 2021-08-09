const router = require('express').Router();
const Exercise = require('../models/exercise.model');

const errorHandler = (res, err) => res.status(400).json(`Error: ${err}`);

router.route('/').get(async (req, res) => {
	try {
		const exercises = await Exercise.find();
		return res.json(exercises);
	} catch (error) {
		await errorHandler(res, error);
	}
});

router.route('/add').post(async (req, res) => {
	const { username, description, duration, date } = req.body;
	const newExercise = new Exercise({ username, description, duration, date });
	try {
		await newExercise.save();
		return res.json('Exercise added!');
	} catch (error) {
		await errorHandler(res, error);
	}
});

router.route('/:id').get(async (req, res) => {
	try {
		const exercise = await Exercise.findById(req.params.id);
		return res.json(exercise);
	} catch (error) {
		await errorHandler(res, error);
	}
});

router.route('/:id').delete(async (req, res) => {
	try {
		await Exercise.findByIdAndDelete(req.params.id);
		return res.json('Exercise deleted!');
	} catch (error) {
		await errorHandler(res, error);
	}
});

router.route('/update/:id').post(async (req, res) => {
	const { username, description, duration, date } = req.body;
	try {
		const exercise = await Exercise.findById(req.params.id);
		return new Promise(async () => {
			exercise.username = username;
			exercise.description = description;
			exercise.duration = Number(duration);
			exercise.date = Date.parse(date);
			try {
				await exercise.save();
				return res.json('Exercise updated!');
			} catch (error) {
				await errorHandler(res, error);
			}
		});
	} catch (error) {
		await errorHandler(res, error);
	}
});

module.exports = router;
