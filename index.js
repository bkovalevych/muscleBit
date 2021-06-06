const server = require('express')();
const serverHttp = require('http').createServer(server);
const dotenv = require('dotenv');
dotenv.config();
const port = parseInt(process.env.PORT || 5000);
const cors = require("cors");
const bodyParser = require('body-parser');
const middleCookies = require('universal-cookie-express')
const io = require('socket.io')(serverHttp);
io.on('connection', client => {
   console.log(`connected ${client.id}` );
   client.on('arm', (data) => {
       if (typeof data === typeof "") {
           data = JSON.parse(data);
       }
       io.emit('arm', data);
   })
})

io.on('disconnection', () => {
   console.log('disconnection dis')
})

server.use(cors());
server.use(middleCookies())
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
require('./data_accesss/connectDB');




server.get('/play/:id', (req, res) => {
    let id = req.params['id'];
    const Data = require('./models/data');
    Data.findOne({_id: id}).then(result => {
       if (result == null || result.data == null) {
          res.status(400).json({errors: 'not found'});
       } else {
          result.data.map((move, index) =>
             setTimeout(() => {
                console.log(move.join(' '))
                io.emit('arm', move);
             }, 200 * index)
          )
          res.status(200).send('ok');
       }
    })

})
server.get('/set_value', (req, res) => {
    if (!io) {
        res.send("Io is not ok")
        console.error("[set value][io error]")
    } else if (!req.query) {
        res.send("Query is not ok")
        console.error('[set value][query]')
    } else {
        let raw_values = res.query["data"].split("_");
        let result = []
        for (let raw_val of raw_values) {
            let val = parseInt(raw_val);
            if (!isNaN(val)) {
                result.push(val)
            }
        }
        if (result.length > 0) {
            io.emit("arm", result)
            console.log(`[data set] ${result}`);
            res.send(`[data set] ${result}`);
        } else {
            res.send(`[error query] ${result}`);
        }
    }
})
server.use('/user', require('./api/user'));
server.use('/admin', require('./api/admin'));
server.use('/data', require('./api/data'));
server.use('/iot', require('./api/iot'));
server.use("/", (req, res) => res.send("Alive"))
serverHttp.listen(port, () => {
   console.log(`Server listen on ${port}`)
});

module.exports = server;
