const express = require('express');
const router = express.Router();
const charges = require('../data/product_charges.json');
const assignments = require('../data/product_assignment.json');


// Endpoint to get the summary of reservations that includes:
// - How many active products there are for each reservation
// - The total amount of active charges for each reservation
// - How many canceled products for each reservation
// - The name of the product for each reservation
// - The status of the product for each reservation (active, cancelled, offered only)
router.get('/', (req, res) => {
  const summary = {};

  assignments.forEach(({ id, reservation_uuid, name }) => {
    const charge = charges.find(c => c.special_product_assignment_id === id); // Filter out the assignments that are offered only, i.e. not active nor cancelled

    // If the charge is not found, it means the product is offered only
    // If the charge is found, check if it is active or cancelled
    const status = !charge
      ? 'offered only'
      : charge.active
        ? 'active'
        : 'cancelled';

    // If the reservation_uuid is not found, create a new entry in the summary
    // Because there can be multiple products with the same reservation_uuid
    if (!summary[reservation_uuid]) {
      summary[reservation_uuid] = {
        count: 0,
        total: 0,
        items: [],
        hasCancelled: false,
      };
    }

    // If the reservation_uuid already exists, update the existing entry with the new product
    // Add the product to the items array of that reservation_uuid
    summary[reservation_uuid].items.push({
      name,
      status,
      charge: charge ? charge.amount : 0
    });

    if (status === 'active') {
      summary[reservation_uuid].count++; // new field to count active products for the reservation
      summary[reservation_uuid].total += charge.amount; // new field to sum up the total amount of active charges for the reservation
    }

    if (status === 'cancelled') {
      summary[reservation_uuid].hasCancelled = true; // new field to check if there are any cancelled products for the reservation
    }

    // we added these 3 fields above (count, total, hasCancelled) to the summary object
    // to later send them to the client.
  });

  res.json(summary);
});

module.exports = router;