const server = require('express')();
const dotenv = require('dotenv');
dotenv.config();
const port = parseInt(process.env.PORT || 5000);
const cors = require("cors");
const bodyParser = require('body-parser');
const middleCookies = require('universal-cookie-express')

server.use(cors());
server.use(middleCookies())
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
require('./data_accesss/connectDB');





server.use('/user', require('./api/user'));
server.use('/admin', require('./api/admin'));
server.use('/data', require('./api/data'));
server.use('/iot', require('./api/iot'));

server.listen(port, () => {
   console.log(`Server listen on ${port}`)
});

