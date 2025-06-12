const mongoose = require('mongoose');

const HouseholdSchema = new mongoose.Schema({
  householdId: String,
  ownerName: String,
  mobile: String, // e.g., 09171234567
});

module.exports = mongoose.model('Household', HouseholdSchema);
