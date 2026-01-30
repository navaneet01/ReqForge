const path = require('path');

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');



const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);
const exportRoutes = require('./routes/exportRoutes');
app.use('/api/export', exportRoutes);

app.get('/', (req, res) => {
    res.send('ReqForge API Running');
});

module.exports = app;