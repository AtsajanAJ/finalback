const sql = require('./db');

const Dashboard = function(dashboard){
    this.recipe_id = dashboard.recipe_id;
    this.timestmap = dashboard.timestmap;
}

Dashboard.create = (newDashboard, result)=>{
    sql.query('INSERT INTO dashboard (recipe_id, timestamp) VALUE (?, ?)',
    [newDashboard.recipe_id, newDashboard.timestmap],
        (err, res)=>{
            if(err){
                console.log('Error: ', err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId,...newDashboard});
        }
    );
};

Dashboard.findById = (dashboardId, result)=>{
    sql.query(`SELECT * FROM dashboard WHERE id = ${dashboardId}`, (err,res)=>{
        if(err){
            console.log('Error: ', err);
            result(err,null);
            return;
        }
        if(res.length){
            result(null, res[0]);
            return;
        }
        result({ kind: 'nout_found'}, null)
    });
};

Dashboard.getAll = result =>{
    sql.query('SELECT * FROM dashboard', (err, res)=>{
        if(err){
            console.log('Error: ', err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Dashboard.deleteById = (id, result)=>{
    sql.query('DELETE FROM dashboard WHERE id = ?', id, (err, res)=>{
        if(err){
            console.log('Error: ' + err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({ kind: 'not_found'}, null)
            return;
        }
        console.log('Deleted dashboard with id:' +  id);
        result(null, res);
    });
};

Dashboard.updateById = (id, updateDashboard, result) =>{
    sql.query('UPDATE dashboard SET recipe_id = ?, timestamp = ? WHERE id = ?',
    [updateDashboard.recipe_id, updateDashboard.timestmap, id],
        (err, res)=>{
            if(err){
                console.log('Error: ' + err);
                result(err, null);
                return;
            }
            if(res.affectedRows == 0){
                result({ kind: 'not_found' },null);
                return;
            }
            console.log('Update dashboard with id: ' + id);
            result(null, { id: id,...updateDashboard }); 
        }
    );
};

//////////////////////////////////////////////////////////////////////////////////
//join

//getdashdetails
// Dashboard.getDashboardDetails = () => {
//     return new Promise((resolve, reject) => {
//         sql.query(
//             `
//             SELECT Dashboard.*, Recipe.title as recipe_title, users.fullname as user_name
//             FROM Dashboard
//             JOIN Recipe ON Dashboard.recipe_id = Recipe.recipe_id
//             JOIN users ON Recipe.user_id = users.id;
//             `,
//             (err, data) => {
//                 if (err) return reject(err);
//                 else return resolve(data);
//             }
//         );
//     });
// };

Dashboard.getDashboardDetailsById = (dashboardId) => {
    return new Promise((resolve, reject) => {
        sql.query(
            `
            SELECT Dashboard.*, Recipe.title as recipe_title, users.fullname as user_name
            FROM Dashboard
            JOIN Recipe ON Dashboard.recipe_id = Recipe.recipe_id
            JOIN users ON Recipe.user_id = users.id
            WHERE Dashboard.id = ?;
            `,
            [dashboardId],
            (err, data) => {
                if (err) return reject(err);
                else return resolve(data);
            }
        );
    });
};



module.exports = Dashboard;