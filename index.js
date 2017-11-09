const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enabling CORS
app.use(cors());

// App listening.
app.listen(3000, function () {
  console.log("FogCloud listening on port 3000!");
});

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our FogCloud!' });   
});

router.route('/reading')
    
    // create a reading (accessed at POST http://localhost:3000/api/reading)
    .post(function(req, res) {
        var read = {};
        read =  req.body;
        res.json({"recieved": req.body});
    });

// all of our routes will be prefixed with /api
app.use('/api', router);
