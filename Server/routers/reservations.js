const express = require('express');
const router = express.Router();
const charges = require('../data/product_charges.json');
const assignments = require('../data/product_assignment.json');


// Endpoint to get the summary of reservations that includes:
// - How many active products there are
// - TThe total amount of active charges
// - Whether there are any canceled products
// - end all of this as JSON to the client
router.get('/', (req, res) => {
  const summary = {};

  assignments.forEach(({ id, reservation_uuid, name }) => {
    const charge = charges.find(c => c.special_product_assignment_id === id);

    const status = !charge
      ? 'offered only'
      : charge.active
        ? 'active'
        : 'cancelled';

    if (!summary[reservation_uuid]) {
      summary[reservation_uuid] = {
        count: 0,
        total: 0,
        items: [],
        hasCancelled: false,
      };
    }

    summary[reservation_uuid].items.push({
      name,
      status,
      charge: charge ? charge.amount : 0
    });

    if (status === 'active') {
      summary[reservation_uuid].count++;
      summary[reservation_uuid].total += charge.amount;
    }

    if (status === 'cancelled') {
      summary[reservation_uuid].hasCancelled = true;
    }
  });

  res.json(summary);
});

module.exports = router;