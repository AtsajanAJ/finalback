const sql = require('./db');

const Review = function(review){
    this.recipe_id = review.recipe_id;
    this.user_id = review.user_id;
    this.comment = review.comment;
    this.rating = review.rating;
}

Review.create = (newReview, result) => {
    sql.query(
        'INSERT INTO review (recipe_id, user_id, comment, rating) VALUES (?, ?, ?, ?)',
        [newReview.recipe_id, newReview.user_id, newReview.comment, newReview.rating],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
                return;
            }
            
            result(null, { id: res.insertId, ...newReview });
        }
    );
};

Review.getAll = (result) => {
    sql.query('SELECT * FROM review', (err, res)=>{
        if(err){
            console.log('Error:', err);
            result(err, null);
            return;
        }
        result(null,res);
    })
}

Review.updateById = (id, data, result)=>{
    sql.query('UPDATE review SET recipe_id = ?, user_id = ?, comment = ?, rating = ? WHERE id = ?', [data.recipe_id, data.user_id, data.comment, data.rating, id], (err, res) => {
        if(err){
            console.log('Error', err);
            result(err, null)
            return;
        }
        if(res.affectedRows === 0){
            result({ kind: 'not_found' },null)
            return;
        }
        console.log('Update review: ' + {id: id,...data});
        result(null, {id: id,...data})
    });
};

Review.deleteById = (id, result) => {
    sql.query('DELETE FROM review WHERE id=?', [id], (err, res)=>{
        if(err){
            console.log('Error:', err);
            result(err, null);
            return;
        }
        if(res.affectedRows === 0){
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('Deleted review id: ' + id);
        result(null, {id: id});
    });
};

///////////////////////////////////////////////////////////////////////////////////
//join

// review with recipe and user routes => red (reviewdetail)
Review.reviewDetail = ()=>{
    return new Promise((resolve, reject)=>{
        sql.query(`
        SELECT Review.*, users.fullname as user_name, Recipe.title as recipe_title
        FROM Review
        JOIN users ON Review.user_id = users.id
        JOIN Recipe ON Review.recipe_id = Recipe.recipe_id;
        `,(err,data)=>{
            if(err) return reject(err)
            else return resolve(data)
        })
    })
}

// review rating <= 4.5
Review.reviewRating = ()=>{
    return new Promise((resolve, reject)=>{
        sql.query(`
        SELECT Review.*, users.fullname as user_name, Recipe.title as recipe_title
        FROM Review
        JOIN users ON Review.user_id = users.id
        JOIN Recipe ON Review.recipe_id = Recipe.recipe_id
        WHERE Review.rating >= 4.5;
        `,(err,data)=>{
            if(err) return reject(err)
            else return resolve(data)
        })
    })
}

Review.reviews = () => {
    return new Promise((resolve, reject) => {
        sql.query(
            `
            SELECT Review.*, users.fullname as user_name, Recipe.title as recipe_title
            FROM Review
            JOIN users ON Review.user_id = users.id
            JOIN Recipe ON Review.recipe_id = Recipe.recipe_id
            ORDER BY Review.recipe_id DESC;
            `,
            (err, data) => {
                if (err) return reject(err);
                else return resolve(data);
            }
        );
    });
};

//Select Reviews and Users for a Specific Recipe
Review.getReviewsWithUser = (recipeId, result) => {
    sql.query(
      `
      SELECT Review.*, users.fullname as user_name
      FROM Review
      JOIN users ON Review.user_id = users.id
      WHERE Review.recipe_id = ?;
      `,
      [recipeId],
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


module.exports = Review;