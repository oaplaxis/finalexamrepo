// Import Mongoose
const mongoose = require('mongoose');
// Create schema definition object using mapping notation
const Restaurant = {
    // add each element and its properties
    name: {
        type: String,
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    emailAddress: {
        type: String
    },
    rating: {
        type: Number
    }
};
var RestaurantsSchema = new mongoose.Schema(Restaurant);
module.exports = mongoose.model('Restaurant', RestaurantsSchema);;