require('dotenv').config();
const mongoose = require('mongoose');
const Household = require('./models/Household');

const dummyData = [
  { householdId: 'TBD001', ownerName: 'Juan Dela Cruz', mobile: '09171234567' },
  { householdId: 'TBD002', ownerName: 'Maria Santos', mobile: '09281234567' },
  { householdId: 'TBD003', ownerName: 'Pedro Reyes', mobile: '09391234567' },
  { householdId: 'TBD004', ownerName: 'Ana Lopez', mobile: '09491234567' },
  { householdId: 'TBD005', ownerName: 'Josefa Garcia', mobile: '09551234567' },
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Household.deleteMany(); // Optional: Clear old data
    await Household.insertMany(dummyData);
    console.log('Dummy households inserted');
    console.log("Connecting to:", process.env.MONGODB_URI);
    process.exit();
  })
  .catch(err => {
    console.error('DB error:', err);
    process.exit(1);
  });
