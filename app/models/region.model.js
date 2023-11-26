const sql = require('./db');

const Region = function(region){
    this.name = region.name
};

Region.create = (newRegion, result) =>{
    sql.query('INSERT INTO region (name) VALUES (?)',[newRegion.name],(err, res)=>{
        if(err){
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId,...newRegion });
    });
};

Region.findByID = (regionId, result)=>{
    sql.query(`SELECT * FROM region WHERE id = ${regionId}`,(err, res)=>{
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

Region.getAll = result => {
    sql.query('SELECT * FROM region', (err, res)=>{
        if(err){
            console.log('Error', err);
            result(null, err);
            return;
        }
        result(null, res)
    });
};

Region.deleteById = (id, result)=>{
    sql.query('DELETE FROM region WHERE id = ?', id, (err, res)=>{
        if(err){
            console.log('Error: ' + err);
            result(err, null)
            return;
        }
        if(res.affectedRows == 0){
            result({ kind: 'not_found'}, null);
            return;
        }
        console.log('Delete region with id: ' + id);
        result(null, res);
    });
};

Region.updateById = (id, updateRegion, result)=>{
    sql.query('UPDATE region SET name = ? WHERE id = ?',[updateRegion.name, id], (err, res)=>{
        if(err) {
            console.log('Error: ' + err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0 ){
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('Update region with id: ' + id);
        result(null, { id: id, ...updateRegion });
    });
};

module.exports = Region