module.exports = (app) => {
    const category_controller = require('../controllers/category.controller');
    var router = require('express').Router();

    router.post('/add', category_controller.createCategory);
    router.get('/:id', category_controller.getCategoryById);
    router.get('/', category_controller.getAllCategorys);
    router.put('/:id', category_controller.updateCategory);
    router.delete('/:id', category_controller.deleteCategory);

    app.use('/api/category', router);
}