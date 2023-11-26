module.exports = (app) => {
    const ingredient_controller = require('../controllers/ingredient.controller');
    var router = require('express').Router();

    router.post('/add',ingredient_controller.createIngredients);
    router.get('/:id', ingredient_controller.getIngredeintById);
    router.get('/', ingredient_controller.getAllIngredients);
    router.put('/:id', ingredient_controller.updateIngredeint);
    router.delete('/:id', ingredient_controller.deleteIngredeint);

    app.use('/api/ingredient',router);
}