const express = require("express");
const path = require("path");
const session = require('express-session');
require('dotenv').config();
const port = process.env.PORT;
const db = require('./database/db');
// Mengimpor middleware
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middlewares/middleware.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware untuk mengatur folder public
app.use(express.static(path.join(__dirname, "public")));

// Mengatur view engine menjadi EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Konfigurasi express-session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Gunakan secret key yang aman
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set ke true jika menggunakan HTTPS
}));

app.use('/', authRoutes);

app.get('/', isAuthenticated,(req, res) => {
  res.render('home')
});

  
// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
