const sql = require('./db');

const Recipe = function(recipe){
    this.title = recipe.title;
    this.description = recipe.description;
    this.user_id = recipe.user_id;
    this.category_id = recipe.category_id;
    this.region_id = recipe.region_id;
    this.ingredient_id = recipe.ingredient_id;
}

// Recipe.create = (newRecipe, result)=>{
//     sql.query('INSERT INTO recipe SET ?', newRecipe,(err, res)=>{
//         if(err){
//             console.log('error',err);
//             result(err,null);
//             return;
//         }
//         result(null, {id: res.insertId,...newRecipe});
//     });
// };

Recipe.create = (newRecipe, result) => {
    sql.query(
        'INSERT INTO recipe (title, description, user_id, category_id, region_id, ingredient_id) VALUES (?, ?, ?, ?, ?, ?)',
        [newRecipe.title, newRecipe.description, newRecipe.user_id, newRecipe.category_id, newRecipe.region_id, newRecipe.ingredient_id],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
                return;
            }
            
            result(null, { id: res.insertId, ...newRecipe });
        }
    );
};


Recipe.findByID = (recipeId, result)=>{
    sql.query(`SELECT * FROM recipe WHERE recipe_id = ${recipeId}`, (err, res)=>{
        if(err){
            console.log('Error',err);
            result(err,null);
            return;
        }
        if(res.length){
            result(null, res[0]);
            return;
        }
        result({ kind: 'not_found'},null);
    });
};

Recipe.getAll = result =>{
    sql.query('SELECT * FROM recipe', (err, res)=>{
        if(err){
            console.log('Error: ',err);
            result(null,err);
            return;
        }
        result(null, res);
    });
};


Recipe.deleteById = (id, result) => {
    sql.query('DELETE FROM recipe WHERE recipe_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error: ' + err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('Deleted recipe with id:' +  id);
        result(null, res);
    });
};


Recipe.updateById = (id, updateRecipe, result) => {
    sql.query(
        'UPDATE recipe SET title = ?, description = ?, user_id = ?, category_id = ?, region_id = ? , ingredient_id = ? WHERE recipe_id = ?',
        [updateRecipe.title, updateRecipe.description, updateRecipe.user_id, updateRecipe.category_id, updateRecipe.region_id, updateRecipe.ingredient_id, id],
        (err,res) => {
            if(err){
                console.log('Error: ' + err);
                result(err, null);
                return;
            }
            if(res.affectedRows == 0){
                result({ kind: 'not_found' },null);
                return;
            }
            console.log('Update recipe with id: ' + id);
            result(null, { id: id,...updateRecipe});
        }
    );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Join

// recipeDetail
Recipe.recipeDetail = (recipeId)=>{
    return new Promise((resolve, reject)=>{
        sql.query(`
        SELECT Recipe.*, users.fullname as user_name, category.name as category_name,
        (SELECT COUNT(*) FROM Review WHERE Review.recipe_id = Recipe.recipe_id) as review_count
        FROM Recipe
        JOIN users ON Recipe.user_id = users.id
        JOIN category ON Recipe.category_id = category.id;
        `,[recipeId] ,(err,data)=>{
            if(err) return reject(err)
            else return resolve(data)
        })
    })
}

// letestReview
Recipe.getLatestReview = (recipeId) => {
    return new Promise((resolve, reject) => {
        sql.query(
            `
            SELECT Recipe.*, Review.comment as latest_review_comment, Review.rating as latest_review_rating
            FROM Recipe
            LEFT JOIN Review ON Recipe.recipe_id = Review.recipe_id
            WHERE Review.id = (SELECT MAX(id) FROM Review WHERE Review.recipe_id = Recipe.recipe_id);
            `,[recipeId],
            (err, data) => {
                if (err) return reject(err);
                else return resolve(data);
            }
        );
    });
};

// AVGrecipe rating
Recipe.getrecipewithAVG = () => {
    return new Promise((resolve, reject) => {
        sql.query(
            `
            SELECT Recipe.*, AVG(Review.rating) as average_rating
            FROM Recipe
            LEFT JOIN Review ON Recipe.recipe_id = Review.recipe_id
            GROUP BY Recipe.recipe_id
            ORDER BY average_rating DESC;
            `,
            (err, data) => {
                if (err) return reject(err);
                else return resolve(data);
            }
        );
    });
};

//recipewithuser
Recipe.getAllRecipesWithUsers = () => {
    return new Promise((resolve, reject) => {
        sql.query(`
            SELECT Recipe.*, users.fullname as user_name
            FROM Recipe
            JOIN users ON Recipe.user_id = users.id;
        `, (err, data) => {
            if (err) return reject(err);
            else return resolve(data);
        });
    });
};

//getbyRegion
Recipe.getByRegion = (regionId, result) => {
    sql.query(
      `
      SELECT Recipe.*, region.name as region_name
      FROM Recipe
      JOIN region ON Recipe.region_id = region.id
      WHERE region.id = ?;
      `,
      [regionId],
      (err, res) => {
        if (err) {
          console.log("Error: " + err);
          result(err, null);
          return;
        }
        result(null, res);
      }
    );
  };

//reviewcount
Recipe.getRecipeWithUserAndReviewCount = (result) => {
    sql.query(
      `
      SELECT Recipe.*, users.fullname as user_name, COUNT(Review.recipe_id) as review_count
      FROM Recipe
      JOIN users ON Recipe.user_id = users.id
      LEFT JOIN Review ON Recipe.recipe_id = Review.recipe_id
      GROUP BY Recipe.recipe_id, users.id;
      `,
      (err, res) => {
        if (err) {
          console.log("Error: " + err);
          result(err, null);
          return;
        }
        result(null, res);
      }
    );
  };



module.exports = Recipe;