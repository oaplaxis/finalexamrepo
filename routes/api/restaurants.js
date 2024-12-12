const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurant')

router.get('/', async (req, res, next) => {
    let Restaurants = await Restaurant.find();
    res.status(200).json(Restaurants);
})

router.post('/', async (req, res, next) => {

        let newRestaurant = new Restaurant({
            name: req.body.name,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            emailAddress: req.body.emailAddress,
            rating: req.body.rating
        });
        // Save the new Restaurant to the database
        await newRestaurant.save();
        res.status(200).json(newRestaurant);
    }
);

// PUT /restaurants/:_id
router.put('/:_id', async (req, res, next) => {

        await Restaurant.findOneAndUpdate(
            { _id: req.params._id }, // filter query
            {
            name: req.body.name,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            emailAddress: req.body.emailAddress,
            rating: req.body.rating,
            status: req.body.status
            }
        );
        res.status(200).json({ 'success': 'true' });
    }
);

// DELETE /restaurants/:_id
router.delete('/:_id', async (req, res, next) => {
    await Restaurant.findByIdAndDelete(req.params._id);
    res.status(200).json({ 'success': 'true' });
});

module.exports = router;