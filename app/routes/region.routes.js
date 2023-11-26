module.exports = (app) => {
    const region_controller = require ('../controllers/region.controller')
    var router = require('express').Router();

    router.post('/add', region_controller.createRegion);
    router.get('/:id', region_controller.getRegionById);
    router.get('/', region_controller.getAllRegion);
    router.put('/:id', region_controller.updateRegion);
    router.delete('/:id', region_controller.deleteRegion);
    
    app.use('/api/region', router)
}