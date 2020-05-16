const express = require('express');
const query = require('../crossFunction/query');
const definer = require('../crossFunction/userDefiner')

module.exports = (management, setCollection) => {
    let router = express.Router();
    router.route('/')
        .get(definer,
            setCollection,
            query)
        .post(definer,
            setCollection,
            management.addOperation
        );

    router.route('/:id')
        .get(definer,
            setCollection,
            management.getById,
            (req, res) => {
                res.json(req.findObject)
            })
        .put(definer,
            setCollection,
            management.getById,
            management.changeOperation
        )
        .delete(definer,
            setCollection,
            management.deleteOperation
        );
    return router;
};

