// read-service/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Railway');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5009;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected for read service');
}).catch(err => console.log(err));

app.get('/railways', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Read service is running on port: ${port}`);
});