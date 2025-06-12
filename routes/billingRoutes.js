// const express = require('express');
// const router = express.Router();
// const { saveBilling } = require('../controllers/billingController');

// router.post('/', saveBilling);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { generateBill, getBillingHistory } = require('../controllers/billingController');

router.post('/generate', generateBill);
router.get('/history/:householdId', getBillingHistory);

module.exports = router;
