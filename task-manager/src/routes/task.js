const express = require('express');

const Task = require('../models/Task');

const router = new express.Router();

router.post('/', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();

    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();

    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isAllowed = updates.every(update => allowedUpdates.includes(update));

  if (!isAllowed) {
    return res.status(400).send({ erorr: 'Invalid updates' });
  }

  try {
    const task = await Task.findById(req.params.id);

    updates.forEach(update => (task[update] = req.body[update]));

    await task.save();

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

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
