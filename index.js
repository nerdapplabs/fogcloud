const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var counter = 0;
var discarded = 0;

var blockCounter = 0;
var blockDiscarded = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enabling CORS
app.use(cors());

// App listening.
app.listen(3000, function () {
  console.log("Fog(Test)Cloud listening on port 3000!");
});

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to Fog(Test)Cloud! :]' });   
});

router.route('/reading')
    
    // create a reading (accessed at POST http://localhost:3000/api/reading)
    .post(function(req, res) {
        var read = {};
        read =  req.body;
        // TODO: implement validateReading to validate 
        isValid = validateReading(read);
        if (! isValid) {
            discarded ++
            console.log("Invalid Payload", read)
            res.json({"error": "Invalid Payload: " + discarded});
            return;
        }
        counter++
        console.log("Valid payload", read)
        res.json({"recieved": "Valid Payload: " + counter});
    });

router.route('/reading-block')
    
    // create a reading (accessed at POST http://localhost:3000/api/reading-block)
    .post(function(req, res) {
        var readingBlock =  req.body;
        // TODO: implement validateReading to validate 
        isValid = validateReadingBlock(readingBlock);
        if (! isValid) {
            blockDiscarded ++
            console.log("Invalid Block Payload", readingBlock)
            res.json({"error": "Invalid Block Payload: " + blockDiscarded});
            return;
        }
        blockCounter++
        console.log("Valid Block payload", readingBlock)
        res.json({"recieved": "Valid Block Payload: " + blockCounter});
    });

// all of our routes will be prefixed with /api
app.use('/api', router);

function validateReading(readingPayload) {    
    isValid = readingPayload.asset === undefined ? false : true;
    // console.log("asset", isValid);
    if (! isValid) { return isValid}

    isValid = readingPayload.timestamp === undefined ? false : true;
    // console.log("timestamp", isValid);
    if (! isValid) { return isValid}

    isValid = readingPayload.key === undefined ? false : true;
    // console.log("key", isValid);
    if (! isValid) { return isValid}
    
    readings = readingPayload.readings === undefined ? false : true;
    // console.log("readings", readings);
    sensor_values = readingPayload.sensor_values === undefined ? false : true;
    // console.log("sensor_values", sensor_values);
    isValid = readings || sensor_values
    // console.log("readings || sensor_values", isValid);
    if (! isValid) { return isValid}

    /*
        # check a valid timestamp?
        # check key is UUID?  
        # readings should be valid dict/json?
    */
    return true
}

function validateReadingBlock(readingPayload) {

    isValid = readingPayload.asset_code === undefined ? false : true;
    if (! isValid) { return isValid}

    isValid = readingPayload.reading === undefined ? false : true;
    if (! isValid) { return isValid}

    read = readingPayload.reading

    isValid = read.read_key === undefined ? false : true;
    if (! isValid) { return isValid}

    isValid = read.reading === undefined ? false : true;
    if (! isValid) { return isValid}

    isValid = read.user_ts === undefined ? false : true;
    if (! isValid) { return isValid}

    return true
}
