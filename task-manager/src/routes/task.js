const express = require('express');

const Task = require('../models/Task');
const auth = require('../middlewares/auth');

const router = new express.Router();

router.post('/', auth, async (req, res) => {
  const task = new Task({ ...req.body, author: req.user._id });

  try {
    await task.save();

    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ author: req.user._id });

    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      author: req.user._id
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.patch('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isAllowed = updates.every(update => allowedUpdates.includes(update));

  if (!isAllowed) {
    return res.status(400).send({ erorr: 'Invalid updates' });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      author: req.user._id
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;
