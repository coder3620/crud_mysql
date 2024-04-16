const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes');
const db = require('./database');
const app = express();
const PORT = 3001;

app.use((req, res, next) => {
  const now = new Date();
  console.log(`${now.toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ status: 200, statusText: 'OK' });
});

app.use('/api/users', userRoutes);

async function startServer() {
  try {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Database connection failed', err);
    process.exit(1);
  }
}

startServer();
