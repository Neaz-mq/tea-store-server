const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

// MIDDLEWARE

app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Tea making server is running')
})

app.listen(port, () => {
    console.log(`Tea Server is running on port: ${port}`);
})