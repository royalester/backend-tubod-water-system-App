require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cron = require('node-cron');

const app = express();
const port = process.env.PORT || 3001;
const { generateBill } = require('./controllers/billingController');

// Middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use('/billing', require('./routes/billingRoutes'));
app.use('/households', require('./routes/householdRoutes'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Run at 9 AM every 1st of the month
cron.schedule('0 9 1 * *', async () => {
  console.log('📆 Monthly billing triggered...');
  await generateBill({ cronJob: true }, { status: () => ({ json: () => {} }) });
});
