const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
console.log("Current directory:", process.cwd());
console.log("Email User loaded:", process.env.EMAIL_USER ? "YES" : "NO");
console.log("Email Pass loaded:", process.env.EMAIL_PASS ? "YES" : "NO");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/contact', require('./routes/contactRoutes'));

app.get('/', (req, res) => {
    res.send('Shaadi API is running');
});

// Sync Database and Start Server
sequelize.sync().then(() => {
    console.log('Database connected and synced');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Database connection failed:', err);
});
