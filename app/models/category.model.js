const sql = require('./db');

const Category = function(category){
    this.name = category.name;
}

Category.create = (newCategory, result) =>{
    sql.query('INSERT INTO category (name) VALUE (?)', [newCategory.name],
        (err,res)=>{
            if(err){
                console.log('Error: ', err);
                result(err, null)
                return;
            }
            result(null,{ id: res.insertId,...newCategory})
        }
    );
};

Category.findById = (categoryId, result)=>{
    sql.query(`SELECT * FROM category WHERE id = ${categoryId}`,(err, res)=>{
        if(err){
            console.log('Error', err);
            result(err, null);
            return;
        }
        if(res.length){
            result(null,res[0]);
            return;
        }
        result({ kind: 'not_found'}, null);
    });
};

Category.getAll = result =>{
    sql.query('SELECT * FROM category',(err, res)=>{
        if(err){
            console.log('Error', err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};


Category.deleteById = (id, result)=>{
    sql.query('DELETE FROM category WHERE id = ?', id, (err, res)=>{
        if(err){
            console.log('Error: ' + err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({ kind: 'nout_found'}, null)
            return;
        }
        console.log('Delete category with id: ' + id);
        result(null,res);
    });
};

Category.updateById = (id, updateCategory, result)=>{
    sql.query('UPDATE category SET name = ? WHERE id = ?',[updateCategory.name, id]
        ,(err, res)=> {
            if(err){
                console.log('Error' + err);
                result(err, null);
                return;
            }
            if(res.affectedRows == 0){
                result({ kind: 'not_found'}, null);
                return;
            }
            console.log('Update category with id: ' + id);
            result(null, {id: id,...updateCategory});
        }
    );
};

module.exports = Category;