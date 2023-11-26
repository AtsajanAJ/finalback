const authJwt = require('../middleware/auth.jwt')
module.exports = (app) => {
    const recipe_controller = require('../controllers/recipe.controller');
    var router = require('express').Router();
    // Create a new recipe
    router.post('/add', recipe_controller.createRecipe);
    // Get a single recipe by ID
    router.get('/:id', recipe_controller.getRecipeById);
    // Get all recipes
    router.get('/', recipe_controller.getAllRecipes);
    // Update a recipe by ID
    router.put('/:id', recipe_controller.updateRecipe);
    // Delete a recipe by ID
    router.delete('/:id', recipe_controller.deleteRecipe);
    
    /////////////////////////////////////////////////////////////
    router.get('/recipedetail/:id', recipe_controller.recipeDetail)
    router.get('/letestreview/:id', recipe_controller.getLatestReview)
    router.get('/avg/:id', recipe_controller.getrecipewithAVG)
    router.get('/rwu/:id', recipe_controller.getAllRecipesWithUsers)
    router.get('/lastboard/:id', recipe_controller.lastboardTimestamp)
    router.get('/byregion/:regionId', recipe_controller.getByRegion)
    router.get('/reviewcount/:id', recipe_controller.getRecipeWithUserAndReviewCount);
    



    app.use('/api/recipes', router);

};
