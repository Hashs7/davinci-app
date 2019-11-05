const pf     = require('pathfinding');
const router = require('express').Router();

exports.init = (app) => {
    app.post('/newMatrix', (req, res, next) => {
        const { size } = req.body;
        const matrix = new pf.Grid(size, size);
        const matrixBackup = matrix.clone();
        res.status(201).json({
            message: 'La grille a été créé',
            matrix,
        });
        // grid.setWalkableAt(0, 1, false);

        // const finder = new pf.AStarFinder();
        // const path   = finder.findPath(4, 1, 1, 4, grid);
        // console.log('path', path);
        console.log('gridBackup', matrixBackup.nodes);
    })
    // All invalid routes
    app.use((error, req, res, next) => {
        console.log(error);
        const status  = 500;
        // const status  = error.statusCode || 500;
        const message = error.message;
        const data    = error.data;
        res.status(status).json({message: message, data: data});
    });
};
