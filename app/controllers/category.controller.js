const Category = require('../models/category.model');

const createCategory = (req, res)=>{
    if(!req.body){
        res.status(400).send({ message: 'Content cannot be empty.' });
        return;
    }

    const newCategory = {
        name: req.body.name
    }

    Category.create(newCategory, (err, data) =>{
        if(err){
            res.status(500).send({ message: err.message || 'Some error occurred while creating the category.' })
        }else{
            res.send(data)
        }
    });
};

const getCategoryById = (req, res) =>{
    const categoryId = req.params.id;

    Category.findById(categoryId, (err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({ message: `Recipe with id ${categoryId} not found.` })
            }else{
                res.status(500).send({ message: `Error retrieving recipe with id ${categoryId}`});
            }
        }else{
            res.send(data);
        }
    });
};

const getAllCategorys = (req, res) =>{
    Category.getAll((err, data)=>{
        if(err){
            res.status(500).send({ message: err.message || 'Some error occured while retrieving categorys.'})
        }else{
            res.send(data);
        }
    });
};

const updateCategory = (req, res) => {
    const categoryId = req.params.id;
    if(!req.body){
        res.status(400).send({ message: 'content cannot be empty. '});
    }
    const updateCategory = new Category({
        name: req.body.name
    });

    Category.updateById(categoryId, updateCategory, (err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({ message: `Category with id ${categoryId} not found`})
            }else{
                res.status(500).send({ message: `Error updating recipe with id ${categoryId}`})
            }
        }else{
            res.send(data);
        }
    });
};

const deleteCategory = (req, res) =>{
    const categoryId = req.params.id;

    Category.deleteById(categoryId, (err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({ message: `Recipe with id ${categoryId} not found.` });
            }else{
                res.status(500).send({ message: `Error deleting recipe with id ${categoryId}` });
            }
        }else{
            res.send({ message: `Recipe with id ${categoryId} was deleted successfully.`})
        }
    });
};

module.exports = { createCategory, getCategoryById, getAllCategorys, updateCategory, deleteCategory}