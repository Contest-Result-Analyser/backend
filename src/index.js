require('dotenv').config();

const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const contestRoutes = require('./routes/contestRoutes');
const callsignRoutes = require('./routes/callsignRoutes');
const cabrilloRoutes = require('./routes/cabrilloRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/contest', contestRoutes);
app.use('/api/callsign', callsignRoutes);
app.use('/api/cabrillo', cabrilloRoutes);
app.use('/api/category', categoryRoutes);

const PORT = process.env.PORT || 3000;

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
