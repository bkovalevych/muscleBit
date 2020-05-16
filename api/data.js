const dataManagement = require('../businessLayer/user/management');
const Router = require('./router')
const Data = require('../models/data')
const setCollection = (req, res, next) => {
    req.collectionName = 'data';
    req.collection = Data;
    next()
};



let router = Router(dataManagement, setCollection)


module.exports = router;
