// require express and mongoose
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Built in Express function that parses incoming requests to JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.use(require('./routes'));

// Creates a connection to a mongoose instance and returns the reference to the database in MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    // useFindAndModify: false,
    // Sets connection string parser and Server Discover and Monitoring engine to true and avoids warning
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// log mongoose queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`*** API Server running on port: ${PORT} ***`));
