// === Backend: Express Server (server/index.js) ===
const express = require('express');
const cors = require('cors');
const reservationRoutes = require('./routers/reservations.js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use('/api/reservations', reservationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
