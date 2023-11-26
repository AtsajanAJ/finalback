module.exports = (app) => {
    const dashboard_controller = require('../controllers/dashboard.controller');
    var router = require('express').Router();

    router.post('/add', dashboard_controller.createDashboard);
    router.get('/:id', dashboard_controller.getDashboardById);
    router.get('/', dashboard_controller.getAllDashboard);
    router.put('/:id', dashboard_controller.updateDashboard);
    router.delete('/:id', dashboard_controller.deleteDashboard);

    ///////////////////////////////////////////////////////////////////////
    router.get('/dashdetail/:id', dashboard_controller.getDashboardDetailsById)

    app.use('/api/dashboard', router);
}