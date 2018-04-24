const express = require('express');

const router = express.Router();

const createRouter = (db) => {
    router.get('/', (req, res) => {
        db.query('SELECT * FROM categories', function (error, results) {
            if (error) throw error;

            res.send(results);
        });
    });

    router.post('/', (req, res) => {
        const category = req.body;

        db.query(
            'INSERT INTO categories (title, description) ' +
            'VALUES (?, ?)',
            [category.title, category.description],
            (error, results) => {
                if (error) throw error;

                category.id = results.insertId;
                res.send(category);
            }
        );
    });

    router.get('/:id', (req, res) => {
        db.query('SELECT * FROM categories WHERE id='+ req.params.id, function (error, results) {
            if(error) throw error;
        });
        res.send(db.getDataById(req.params.id));
    });


    router.delete('/:id', (req, res) => {
        db.query('SELECT * FROM categories WHERE id='+ req.params.id, function (error, results) {
            if(error) throw error;
        });
        res.send(db.getDataById(req.params.id));
    });

    return router;
};

module.exports = createRouter;