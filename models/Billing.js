const mongoose = require('mongoose');

// const BillingSchema = new mongoose.Schema({
//   household: { type: mongoose.Schema.Types.ObjectId, ref: 'Household' },
//   previous: Number,
//   current: Number,
//   usage: Number,
//   date: { type: Date, default: Date.now },
// });


const BillingSchema = new mongoose.Schema({
  householdId: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  consumption: {
    type: Number,
    required: true,
  },
  billAmount: {
    type: Number,
    required: true,
  },
  dateGenerated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Billing', BillingSchema);
