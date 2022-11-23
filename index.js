const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

require('dotenv').config();
require('colors');

const sequelize = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

// app.get('/', (req, res) => {
//     res.status(200).json({message: 'Working!'});
// });

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await sequelize.authenticate().then(console.log('Connect to DB successfull!'.bgMagenta)); 
        // await sequelize.sync();
        app.listen(PORT, () => console.log(`Server has started on port ${PORT}`.bgCyan));
    } catch (err) {
        console.log(err);
    }    
};

start();