const Ingredients = require('../models/ingredients.model');

const createIngredients = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: 'Content cannot be empty.' });
        return;
    }

    const newIngredeint = {
        text: req.body.text
    };

    Ingredients.create(newIngredeint,(err, data)=>{
        if(err){
            res.status(500).send({ message: err.message || 'Some error occurred while creating the ingredeint.' });
        }else{
            res.send(data)
        }
    });
};

const getIngredeintById = (req, res)=>{
    const ingredeintId = req.params.id;

    Ingredients.findById(ingredeintId,(err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({ message: `ingredeint with id ${ingredeintId} not found.` })
            }else{
                res.status(500).send({ message: `Error retrieving ingredeint with id ${ingredeintId}`});
            }
        }else{
            res.send(data);
        }
    });
};

const getAllIngredients = (req, res)=>{
    Ingredients.getAll((err, data)=>{
        if(err){
            res.status(500).send({ message: err.message || 'Some error occured while retrieving ingredients.'})
        }else{
            res.send(data);
        }
    });
};

const updateIngredeint = (req, res)=>{
    const ingredeintId = req.params.id;
    if(!req.body){
        res.status(400).send({ message: 'Content cannot be empty. '});
    }

    const updateIngredeint = new Ingredients({
        text: req.body.text
    });

    Ingredients.updateById(ingredeintId, updateIngredeint, (err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({ message: `ingredeint with id ${ingredeintId} not found`})
            }else{
                res.status(500).send({ message: `Error updating ingredeint with id ${ingredeintId}`})
            }
        }else{
            res.send(data);
        }
    });
};

const deleteIngredeint = (req,res) =>{
    const ingredeintId = req.params.id;

    Ingredients.deleteById(ingredeintId,(err,data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({ message: `ingredeint with id ${ingredeintId} not found.` });
            }else{
                res.status(500).send({ message: `Error deleting ingredeint with id ${ingredeintId}` });
            }
        }else{
            res.send({ message: `ingredeint with id ${ingredeintId} was deleted successfully.` })
        }
    });
};

module.exports = { createIngredients, getIngredeintById, getAllIngredients, updateIngredeint, deleteIngredeint}