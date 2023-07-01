const mongoose = require('mongoose');
require('dotenv/config');

/**
 * Function to connect database
 */
module.exports = async function connection() {

    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(process.env.DB_URL, connectionParams);
        console.log('Connected to DB!!');
    } catch (err) {
        console.log(err.message);
    }
}