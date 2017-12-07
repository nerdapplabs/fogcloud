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
app.listen(8118, function () {
  console.log("Fog(Test)Cloud listening on port 8118!");
});

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8118/ingress)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to Fog(Test)Cloud! :]' });   
});

router.route('/message')
    
    // create a reading (accessed at POST http://localhost:8118/ingress/message)
    .post(function(req, res) {
        var read = {};
        read =  req.body;
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

router.route('/messages')
    
    // create a reading (accessed at POST http://localhost:8118/ingress/messages)
    .post(function(req, res) {
        var readingBlock =  req.body;
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
app.use('/ingress', router);

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

function validateReadingBlock(readingBlockPayload) {

    isValid = (readingBlockPayload instanceof Array) ? true : false;
    if (! isValid) { return isValid}

    
    readingBlockPayload.forEach(function(readingPayload) {
        isValid = readingPayload.asset_code === undefined ? false : true;
        if (! isValid) { return isValid}

        isValid = readingPayload.readings === undefined ? false : true;
        if (! isValid) { return isValid}

        reads = readingPayload.readings

        isValid = (reads instanceof Array) ? true : false;
        if (! isValid) { return isValid}

        reads.forEach(function(r) {
            isValid = r.read_key === undefined ? false : true;
            if (! isValid) { return isValid}

            isValid = r.reading === undefined ? false : true;
            if (! isValid) { return isValid}

            isValid = r.timestamp === undefined ? false : true;
            if (! isValid) { return isValid}

        }, this);
    }, this); 

    
    return true
}
