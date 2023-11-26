const Dashboard = require('../models/dashboard.model');

const createDashboard = (req, res) =>{
    if(!req.body){
        res.status(400).send({ message: 'Content cannot be empty.'});
        return;
    }

    const newDashboard = {
        recipe_id: req.body.recipe_id,
        timestamp: req.body.timestamp
    }

    Dashboard.create(newDashboard, (err, data) =>{
        if (err) {
            res.status(500).send({ message: err.message || 'Some error occurred while creating the dashboard.' });
        } else {
            res.send(data);
        }
    });
};

const getDashboardById = (req,res) =>{
    const dashboardId = req.params.id;

    Dashboard.findById(dashboardId, (err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({ message: `dashboard with id ${dashboardId} not found.` })
            }else{
                res.status(500).send({ message: `Error retrieving dashboard with id ${dashboardId}`});
            }
        }else{
            res.send(data);
        }
    });
};

const getAllDashboard = (req, res) =>{
    Dashboard.getAll((err, data)=>{
        if(err){
            res.status(500).send({ message: err.message || 'Some error occured while retrieving dashboard.'})
        }else{
            res.send(data);
        }
    });
};

// const updateDashboard = (req, res) =>{
//     const dashboardId = req.params.id;
//     if(!req.body){
//         res.status(400).send({ message: 'Content cannot be empty. '});
//     }

//     const updateDashboard = new Dashboard({
//         recipe_id: req.id,
//         timestamp: req.body.timestamp
//     });

//     Dashboard.updateById(dashboardId, updateDashboard, (err, data)=>{
//         if(err){
//             if(err.kind === 'not_found'){
//                 res.status(404).send({ message: `Dashboard with id ${dashboardId} not found`})
//             }else{
//                 res.status(500).send({ message: `Error updating dashboard with id ${dashboardId}`})
//             }
//         }else{
//             res.send(data);
//         }
//     });
// };

const updateDashboard = (req, res) => {
    const dashboardId = req.params.id;
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty. ' });
        return;
    }

    const updateDashboardData = {
        recipe_id: req.body.recipe_id,
        timestamp: req.body.timestamp
    };

    Dashboard.updateById(dashboardId, updateDashboardData, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({ message: `Dashboard with id ${dashboardId} not found` });
            } else {
                res.status(500).send({ message: `Error updating dashboard with id ${dashboardId}` });
            }
        } else {
            res.send(data);
        }
    });
};


const deleteDashboard = (req, res)=>{
    const dashboardId = req.params.id;

    Dashboard.deleteById(dashboardId, (err,data) =>{
        if(err){
            if(err.kind === 'not_found' ){
                res.status(404).send({ message: `dashboard with id ${dashboardId} not found.` });
            }else{
                res.status(500).send({ message: `Error deleting review with id ${dashboardId}` });
            }
        }else {
            res.send({ message: `dashboard with id ${dashboardId} was deleted successfully.` })
        }
    });
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//join

//getdashdetails
// const getDashboardDetails = async (req, res) => {
//     try {
//         const dashboardDetails = await Dashboard.getDashboardDetails();
//         res.status(200).json(dashboardDetails);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const getDashboardDetailsById = async (req, res) => {
    const dashboardId = req.params.id; // Assuming your route has a parameter named 'id'

    try {
        const dashboardDetails = await Dashboard.getDashboardDetailsById(dashboardId);
        if (!dashboardDetails) {
            return res.status(404).json({ message: `Dashboard with id ${dashboardId} not found.` });
        }

        res.status(200).json(dashboardDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createDashboard, getDashboardById, getAllDashboard, updateDashboard, deleteDashboard, getDashboardById,getDashboardDetailsById }