const sql = require('./db');

const Ingredients = function(ingredients){
    this.text = ingredients.text
}

// Ingredients.create = (newIngredeint, result)=>{
//     sql.query('INSERT INTO (text) VALUES (?)',[newIngredeint.ingredeint],(err, res)=>{
//         if(err){
//             console.log('Error: ', err);
//             result(err, null);
//             return;
//         }
//         result(null,{id: res.insertId,...newIngredeint})
//     });
// };

Ingredients.create = (newIngredient, result) => {
    sql.query('INSERT INTO ingredients (text) VALUES (?)', [newIngredient.text], (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newIngredient });
    });
};


Ingredients.findById = (ingredientId, result)=>{
    sql.query(`SELECT * FROM ingredients WHERE id = ${ingredientId}`, (err, res)=>{
        if(err){
            console.log('Error', err);
            result(err, null)
            return;
        }
        if(res.length){
            result(null, res[0]);
            return;
        }
        result({ kind: 'not_found'}, null)
    });
};

Ingredients.getAll = result => {
    sql.query('SELECT * FROM ingredients', (err, res)=>{
        if(err){
            console.log('Error', err);
            result(null,err);
            return;
        }
        result(null, res);
    })
}

Ingredients.deleteById = (id, result)=>{
    sql.query('DELETE FROM ingredients WHERE id = ?', id, (err, res)=>{
        if(err){
            console.log('Error: ' + err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({ kind: 'not_found'}, null)
            return;
        }
        console.log('Delete ingredient with id: ' + id);
        result(null,res);
    });
};

Ingredients.updateById = (id, updateIngredient, result) => {
    sql.query('UPDATE ingredients SET text = ? WHERE id = ?', [updateIngredient.text, id], (err, res) => {
        if (err) {
            console.log('Error: ' + err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('Update ingredients with id: ' + id);
        result(null, { id: id, ...updateIngredient });
    });
};


module.exports = Ingredients