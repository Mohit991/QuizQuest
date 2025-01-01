const Level = require('../models/Level');

const createLevel = async (req, res) => {
  try {
    const level = new Level(req.body);
    await level.save();
    res.status(201).send(level);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getLevels = async (req, res) => {
  try {
    const levels = await Level.findAll()
    res.status(200).send(levels);
  } catch (error) {
    res.status(500).send(error);
  }
};


const updateLevel = async (req, res) => {
  try {
    const level = await Level.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!level) {
      return res.status(404).send();
    }
    res.status(200).send(level);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteLevel = async (req, res) => {
  try {
    const level = await Level.findByIdAndDelete(req.params.id);
    if (!level) {
      return res.status(404).send();
    }
    res.status(200).send(level);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createLevel,
  getLevels,
  updateLevel,
  deleteLevel
};
