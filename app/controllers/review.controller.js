const Review = require('../models/Review.model')

const createReview = (req, res)=>{
    if(!req.body){
        res.status(400).send({ message: 'Content cannot be empty.' });
    }

    const newReview = new Review({
        recipe_id: req.body.recipe_id,
        user_id: req.body.user_id,
        comment: req.body.comment,
        rating: req.body.rating
    })

    Review.create(newReview, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || 'Some error occurred while creating the review.' });
        } else {
            res.send(data);
        }
    });
};

const getAllReviews = (req, res) => {
    Review.getAll((err, data)=>{
        if(err){
            res.status(500).send({ message: err.message || 'Some error occurred while retrieving reviews.' })
        } else {
            res.send(data);
        }
    });
};

const updateReview = (req, res)=>{
    const reviewId = req.params.id;

    if(!req.body){
        res.status(400).send({ message: 'Content cannot be empty.' });
    }

    const updatedReview = new Review({
        recipe_id: req.body.recipe_id,
        user_id: req.body.user_id,
        comment: req.body.comment,
        rating: req.body.rating,
    });

    Review.updateById(reviewId, updatedReview, (err,data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({ message: `Review with id ${reviewId} not found.` });
            }else {
                res.status(500).send({ message: `Error updating review with id ${reviewId}` });
            }
        }else {
            res.send(data);
        }
    });
};

const deleteReview = (req, res)=>{
    const reviewId = req.params.id;

    Review.deleteById(reviewId, (err,data) =>{
        if(err){
            if(err.kind === 'not_found' ){
                res.status(404).send({ message: `Review with id ${reviewId} not found.` });
            }else{
                res.status(500).send({ message: `Error deleting review with id ${reviewId}` });
            }
        }else {
            res.send({ message: `Review with id ${reviewId} was deleted successfully.` })
        }
    });
};


/////////////////////////////////////////////////////////////////////////////////////////////////
//Join

// red (reviewDetail)
const reviewDetails = async (req, res) => {
    try {
        const reviewDetails = await Review.reviewDetail();
        res.status(200).json(reviewDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// reviewRating
const reviewRating = async (req, res)=>{
    try {
        const reviewRating = await Review.reviewRating();
        res.status(200).json(reviewRating)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//getreviewwithdetail
const reviews = async (req, res) => {
    try {
        const reviews = await Review.reviews();
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Select Reviews and Users for a Specific Recipe
const getReviewsWithUser = (req, res) => {
    const recipeId = req.params.recipeId; // Assuming the recipe_id is a route parameter
    Review.getReviewsWithUser(recipeId, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred.",
        });
      } else {
        res.send(data);
      }
    });
  };


module.exports = {createReview, getAllReviews, updateReview, deleteReview ,reviewDetails, reviewRating, reviews, getReviewsWithUser}