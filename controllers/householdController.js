const Household = require('../models/Household');

exports.getAllHouseholds = async (req, res) => {
  try {
    const households = await Household.find();
    res.json(households);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHouseholdById = async (req, res) => {
  try {
    const household = await Household.findById(req.params.id);
    if (!household) return res.status(404).json({ message: 'Not found' });
    res.json(household);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateHousehold = async (req, res) => {
  try {
    const updated = await Household.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteHousehold = async (req, res) => {
  try {
    await Household.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
