// const Billing = require('../models/Billing');
// const Household = require('../models/Household');
// const sendSMS = require('../services/smsService');

// exports.saveBilling = async (req, res) => {
//   try {
//     const { householdId, previous, current } = req.body;

//     const household = await Household.findOne({ householdId });
//     if (!household) return res.status(404).json({ error: 'Household not found' });

//     const usage = current - previous;

//     const billing = await Billing.create({
//       household: household._id,
//       previous,
//       current,
//       usage,
//     });

//     // Send SMS
//     const message = `Hi ${household.ownerName}, your water usage this month is ${usage} units. Thank you!`;
//     await sendSMS(household.mobile, message);

//     res.status(201).json({ message: 'Billing saved and SMS sent', billing });
//   } catch (err) {
//     console.error('Billing error:', err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const Household = require('../models/Household');
const Billing = require('../models/Billing');
const sendSMS = require('../utils/smsSender');

const generateBill = async (req, res) => {
  try {
    const households = await Household.find();
    if (!households.length) return res.status(404).json({ message: 'No households found' });

    const billings = [];

    for (const household of households) {
      const consumption = Math.floor(Math.random() * 100) + 1; // dummy consumption
      const billAmount = consumption * 10;

      const bill = new Billing({
        householdId: household.householdId,
        ownerName: household.ownerName,
        mobile: household.mobile,
        consumption,
        billAmount,
      });

      await bill.save();
      billings.push(bill);

      // Format number
      const rawMobile = household.mobile || '';
      const formattedNumber = rawMobile.startsWith('0')
        ? '+63' + rawMobile.slice(1)
        : rawMobile;

      if (!formattedNumber.match(/^\+63\d{10}$/)) {
        console.warn(`⚠️ Skipping SMS: Invalid number for ${household.ownerName}`);
        continue;
      }

      // Define message AFTER billAmount is known
      const message = `Hello ${household.ownerName}, your water bill is ₱${billAmount} for ${consumption} m³. Please pay before the due date.`;

      // Send SMS
      await sendSMS(formattedNumber, message);
    }

    return res.status(201).json({ message: 'Bills generated and SMS sent.', billings });
  } catch (err) {
    console.error('Error generating billing:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getBillingHistory = async (req, res) => {
  try {
    const { householdId } = req.params;
    const bills = await Billing.find({ householdId }).sort({ createdAt: -1 });

    if (!bills.length) {
      return res.status(404).json({ message: 'No billing records found for this household.' });
    }

    return res.json(bills);
  } catch (err) {
    console.error('Error fetching billing history:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { generateBill, getBillingHistory };



