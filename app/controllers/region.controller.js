const Recipe = require('../models/recipe.model');
const Region = require('../models/region.model');

const createRegion = (req, res) => {
    if(!req.body) {
        res.status(400).send({ message: 'Content cannot be empty.' });
        return;
    }
    const newRegion = {
        name: req.body.name
    };

    Region.create(newRegion, (err, data)=> {
        if(err){
            res.status(500).send({ message: err.message || 'Some error occurred while creating the region.' });
        }else {
            res.send(data);
        }
    });
};

const getRegionById = (req,res)=> {
    const regionId = req.params.id;

    Region.findByID(regionId, (err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({ message: `Region with id ${regionId} not found.`})
            }else{
                res.status(500).send({ message: `Error retrieving region with id ${regionId}`});
            }
        }else{
            res.send(data);
        }
    });
};

const getAllRegion = (req, res) => {
    Region.getAll((err, data)=>{
        if(err){
            res.status(500).send({ message: err.message || 'Some error occured while retrieving region.'})
        }else{
            res.send(data);
        }
    });
};

const updateRegion = (req, res) => {
    const regionId = req.params.id;
    if(!req.body){
        res.status(400).send({ message: 'Content cannot be empty. '});
    }

    const updateRegion = new Region({
        name: req.body.name
    });

    Region.updateById(regionId, updateRegion, (err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({ message: `Region with id ${regionId} not found`})
            }else{
                res.status(500).send({ message: `Error updating region with id ${regionId}`})
            }
        }else{
            res.send(data);
        }
    });
};

const deleteRegion = (req, res)=>{
    const regionId = req.params.id;

    Region.deleteById(regionId, (err,data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({ message: `region with id ${regionId} not found.`})
            }else{
                res.status(500).send({ message: `Error deleting region with id ${regionId}`})
            }
        }else{
            res.send({ message: ` region with id ${regionId} was deleted successfully.`})
        }
    });
};

module.exports = { createRegion, getRegionById, getAllRegion, updateRegion, deleteRegion}