const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var counter = 0;
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
        // TODO: implement validateReading to validate 
        isValid = validateReading(read);
        if (! isValid) {
            console.log("Invalid Payload", read)
            res.json({"error": "Invalid Payload"});
            return;
        }
        counter++
        console.log("Recieved payload", read)
        res.json({"recieved": counter});
    });

// all of our routes will be prefixed with /api
app.use('/api', router);

function validateReading(reading_payload) {
    isValid = true;
    
    /*
        # reading_payload should be valid dict/json?

        asset = reading_payload['asset']
        # check String?
        
        timestamp = reading_payload['timestamp']
        # check a valid timestamp?

        key = reading_payload['key']
        # check UUID?

        readings = reading_payload['readings']
        # if not with key readings try sensor_values?
        readings = reading_payload['sensor_values')  # sensor_values is deprecated
        
        # readings should be valid dict/json?
    */

    return isValid;
}