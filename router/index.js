const pf     = require('pathfinding');
const fs     = require('fs');
const router = require('express').Router();

exports.init = (app) => {
    app.get('/matrix', (req, res, next) => {
        fs.readFile('matrix.json', 'utf8', (err, data) => {
            if (err){
                console.error(err);
                return
            }
            const { matrix, start, end } = JSON.parse(data);
            res.status(200).json({ matrix, start, end });
        });
    });

    app.get('/findPath', (req, res, next) => {
        fs.readFile('matrix.json', 'utf8', (err, data) => {
            if (err){
                console.error(err);
                return
            }
            const { matrix, start, end } = JSON.parse(data);
            const grid = new pf.Grid(matrix.nodes);

            grid.nodes.forEach((el, i) => {
                el.forEach((subEl, j) => {
                    grid.setWalkableAt(j, i, matrix.nodes[i][j].walkable)
                })
            });
            const finder = new pf.AStarFinder();
            const path   = finder.findPath(start.x, start.y, end.x, end.y, grid);
            res.status(200).json({ path });
        });
    });

    app.post('/newMatrix', (req, res, next) => {
        const {row,column} = req.body;
        const matrix = new pf.Grid(column, row);
        const json = JSON.stringify({
            start: { x: null, y: null },
            end: { x: null, y: null },
            matrix,
            dronePositions: [],
        });

        fs.writeFile('matrix.json', json, 'utf8', () => {
            res.status(201).json({
                message: 'La grille a été créé',
                matrix
            });
        });
        // grid.setWalkableAt(0, 1, false);
        // const matrixBackup = matrix.clone();
        // const finder = new pf.AStarFinder();
        // const path   = finder.findPath(4, 1, 1, 4, grid);
        // console.log('path', path);
    });

    app.post('/setItem', (req, res, next) => {
        const { position, type } = req.body;
        const { x, y } = position;

        fs.readFile('matrix.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            let { matrix, start, end } = JSON.parse(data);
            console.log(x, y);
            const grid = new pf.Grid(matrix.nodes);

            grid.nodes.forEach((el, i) => {
                el.forEach((subEl, j) => {
                    grid.setWalkableAt(j, i, matrix.nodes[i][j].walkable)
                })
            });

            switch (type) {
                case 'block':
                    grid.setWalkableAt(x, y, !matrix.nodes[y][x].walkable);
                    break;
                case 'start':
                    start = position;
                    break;
                case 'end':
                    end = position;
                    break;
            }
            const json = {
                matrix: grid,
                start,
                end,
            };

            fs.writeFile('matrix.json', JSON.stringify(json), 'utf8', () => {
                res.status(201).json({
                    message: 'La grille a été mise à jour',
                    ...json
                });
            });
        });
    });

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
