const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');

const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

const createRouter = (db) => {
    router.get('/', (req, res) => {
        db.query('SELECT `id`, `title` FROM Subject matter', function (error, results) {
            if (error) throw error;

            res.send(results);
        });
    });

    router.post('/', upload.single('image'), (req, res) => {
        const item = req.body;


        if (req.file) {
            item.image = req.file.filename;
        } else {
            item.image = null;
        }
        console.log(req.body)

        db.query(
            'INSERT INTO `Subject matter` (title, location_id, description, image, category_id, `date' +
            ' registration`) ' +
            'VALUES (?, ?, ?, ?, ?, ?)',
            [item.title, item.location_id, item.description, item.image, item.category_id, new Date()],
            (error, results) => {
                if (error) throw error;

                item.id = results.insertId;
                res.send(item);
            }
        );
    });

    router.get('/:id', (req, res) => {
        db.query('SELECT * FROM Subject matter WHERE id='+ req.params.id, function (error, results) {
            if(error) throw error;
        });
        res.send(db.getDataById(req.params.id));
    });

    router.delete('/:id', (req, res) => {
        db.query('SELECT * FROM Subject matter WHERE id='+ req.params.id, function (error, results) {
            if(error) throw error;
        });
        res.send(db.getDataById(req.params.id));
    });

    return router;
};

module.exports = createRouter;