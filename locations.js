const express = require('express');

const router = express.Router();

const createRouter = (db) => {
    router.get('/', (req, res) => {
        db.query('SELECT * FROM locations', function (error, results) {
            if (error) throw error;

            res.send(results);
        });
    });

    router.post('/', (req, res) => {
        const location = req.body;

        db.query(
            'INSERT INTO locations (title, description) ' +
            'VALUES (?, ?)',
            [location.title, location.description],
            (error, results) => {
                if (error) throw error;

                location.id = results.insertId;
                res.send(location);
            }
        );
    });

    router.get('/:id', (req, res) => {
        db.query('SELECT * FROM locations WHERE id='+ req.params.id, function (error, results) {
            if(error) throw error;
        });
        res.send(db.getDataById(req.params.id));
    });

    router.delete('/:id', (req, res) => {
        db.query('SELECT * FROM locations WHERE id='+ req.params.id, function (error, results) {
            if(error) throw error;
        });
        res.send(db.getDataById(req.params.id));
    });

    return router;
};

module.exports = createRouter;