module.exports = (app) => {
    const review_controller = require('../controllers/review.controller');
    var router = require('express').Router();
    
    // Create a new review
    router.post('/add', review_controller.createReview);
    
    // Retrieve all reviews
    router.get('/', review_controller.getAllReviews);
    
    // Update a review by ID
    router.put('/:id', review_controller.updateReview);
    
    // Delete a review by ID
    router.delete('/:id', review_controller.deleteReview);

//////////////////////////////////////////////////////////////////////////////
    router.get('/red', review_controller.reviewDetails);
    router.get('/reviewrating', review_controller.reviewRating);
    router.get('/rev', review_controller.reviews);
    router.get("/:recipeId", review_controller.getReviewsWithUser);


    app.use('/api/reviews', router);
};
