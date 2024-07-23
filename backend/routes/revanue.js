const express = require('express');
const Revenue = require('../models/revenue');

const router = express.Router();

// Route to fetch revenue data
router.get('/revenue', async (req, res) => {
  try {
    // Assuming you want revenue data for today
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    const revenueData = await Revenue.aggregate([
      {
        $match: {
          date: { $gte: startOfToday, $lte: endOfToday }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" }
        }
      }
    ]);

    res.json(revenueData[0] || { totalRevenue: 0 }); // Return total revenue or 0 if no data found
  } catch (error) {
    console.error('Error fetching revenue:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
