const Recipe = require('../models/recipe.model');

// const createRecipe = (req, res) =>{
//     if(!req.body){
//         res.status(400).send({ message: 'content cannot be empty.' });
//     }
//     const newRecipe = new Recipe({
//         title: req.body.title,
//         description: req.body.description,
//         user_id: req.id,
//         category: req.id,
//         region: req.id
//     });
    
//     Recipe.create(newRecipe, (err, data)=>{
//         if(err){
//             res.status(500).send({ message: err.message || 'Some error occurred while creating the recipe.' })
//         }else{
//             res.send(data)
//         }
//     });
// };

const createRecipe = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty.' });
        return;
    }

    const newRecipe = {
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id, // Assuming req.id is the user's ID
        category_id: req.body.category_id, // Assuming the category_id is provided in the request body
        region_id: req.body.region_id, // Assuming the region_id is provided in the request body
        ingredient_id: req.body.ingredient_id
    };

    Recipe.create(newRecipe, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || 'Some error occurred while creating the recipe.' });
        } else {
            res.send(data);
        }
    });
};


const getRecipeById = (req,res) =>{
    const recipeId = req.params.id;

    Recipe.findByID(recipeId, (err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({ message: `Recipe with id ${recipeId} not found.` })
            }else{
                res.status(500).send({ message: `Error retrieving recipe with id ${recipeId}`});
            }
        }else{
            res.send(data);
        }
    });
};

const getAllRecipes = (req, res) =>{
    Recipe.getAll((err, data)=>{
        if(err){
            res.status(500).send({ message: err.message || 'Some error occured while retrieving recipes.'})
        }else{
            res.send(data);
        }
    });
};

const updateRecipe = (req, res) =>{
    const recipeId = req.params.id;
    if(!req.body){
        res.status(400).send({ message: 'Content cannot be empty. '});
    }

    const updateRecipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id,
        category_id: req.body.category_id,
        region_id: req.body.region_id,
        ingredient_id: req.body.ingredient_id
    });

    Recipe.updateById(recipeId, updateRecipe, (err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({ message: `Recipe with id ${recipeId} not found`})
            }else{
                res.status(500).send({ message: `Error updating recipe with id ${recipeId}`})
            }
        }else{
            res.send(data);
        }
    });
};

// const deleteRecipe = (req, res) =>{
//     const recipeId = req.params.id;

//     Recipe.deleteById(recipeId,(err, data)=>{
//         if(err){
//             if(err.kind === 'not_found'){
//                 res.status(404).send({ message: `Recipe with id ${recipeId} not found.` });
//             }else{
//                 res.status(500).send({ message: `Error deleting recipe with id ${recipeId}` });
//             }
//         }else{
//             res.send({ message: `Recipe with id ${recipeId} was deleted successfully.` })
//         }
//     });
// };
const deleteRecipe = (req, res) => {
    const recipeId = req.params.id;

    Recipe.deleteById(recipeId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({ message: `Recipe with id ${recipeId} not found.` });
            } else {
                res.status(500).send({ message: `Error deleting recipe with id ${recipeId}` });
            }
        } else {
            res.send({ message: `Recipe with id ${recipeId} was deleted successfully.` });
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//join

// recipeDetail
const recipeDetail = async (req, res)=>{
    const recipeId = req.params.id
    try{
        const recipeDetail = await Recipe.recipeDetail();
        if(!recipeDetail){
            return res.status(404).json({ message: `recipe with id ${recipeId} not found` })
        }
        res.status(200).json(recipeDetail)
    }catch (error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
};
// getletestReview
// const getLatestReview = async (req, res) => {
//     const recipeId = req.params.id;
//     try {
//         const latestReview = await Recipe.getLatestReview();
//         if(!latestReview){
//             return res.status(404).json({ message: `recipe with id ${recipeId} not found` })
//         }
//         res.status(200).json(latestReview);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
const getLatestReview = async (req, res)=>{
    await Recipe.getLatestReview(req.params.id)
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch((error)=>{
        return res.status(400).send({ error: error.name,sqlstate: error.sqlState,message: error.message})
    })
}


const getrecipewithAVG = async(req,res)=>{
    await Recipe.getrecipewithAVG()
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch((error)=>{
        return res.status(400).send({ error: error.name,sqlstate: error.sqlState,message: error.message})
    })
}

//rwu
const getAllRecipesWithUsers = async (req, res) => {
    try {
        const recipes = await Recipe.getAllRecipesWithUsers();
        res.status(200).json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// lastboard
const lastboardTimestamp = async (req, res) => {
    // const recipe_id = req.id
    try {
        const recipes = await Recipe.lastboardTimestamp();
        res.status(200).json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// getbyRegion
const getByRegion = (req, res) => {
    const regionId = req.params.regionId; // Assuming the route parameter is named regionId
  
    Recipe.getByRegion(regionId, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred.",
        });
      } else {
        res.send(data);
      }
    });
  };

const getRecipeWithUserAndReviewCount = (req, res) => {
    Recipe.getRecipeWithUserAndReviewCount((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred.",
        });
      } else {
        res.send(data);
      }
    });
  };

module.exports = { createRecipe, getRecipeById, getAllRecipes, updateRecipe, deleteRecipe, recipeDetail, getLatestReview,getAllRecipesWithUsers,getrecipewithAVG, lastboardTimestamp, getByRegion, getRecipeWithUserAndReviewCount };


