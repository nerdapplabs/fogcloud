const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = 6683;

var blockCounter = 0;
var totalSinceStart = 0;

var blockDiscarded = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Enabling CORS
app.use(cors());

app.listen(PORT, function () {
  console.info("Fog(Test)Cloud listening on port " + PORT + "!");
});

var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:6683)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to Fog(Test)Cloud! :]' });   
});

router.route('/sensor-reading')    
    // POST http://localhost:6683/sensor-reading
    // [ {"timestamp":"2017-01-02T01:02:03.23232Z-05:00","asset":"pump1","key":"80a43623-ebe5-40d6-8d80-3f892da9b3b4","readings":{"humidity":0,"temperature":-40}} ]
    .post(function(req, res) {
        var readingBlock =  req.body;
        isValid = validateReadingBlock(readingBlock);
        if (! isValid) {
            blockDiscarded ++;
            console.error("Invalid Block Payload", JSON.stringify(readingBlock))
            var obj = {"code": 400, "message": "Invalid Block Payload! Discarded block: " + blockDiscarded}   
            throw new Error(JSON.stringify(obj));
        }
        blockCounter++
        totalSinceStart += readingBlock.length;
        console.log("Valid Block payload", JSON.stringify(readingBlock))
        res.status(201).json({"message": "Recieved block: " + blockCounter + "; Total Recieved: " + totalSinceStart});
    });

// all of our routes will be prefixed with /ingress
app.use('', router);

function validateReadingBlock(readingBlockPayload) {
    isValid = (readingBlockPayload instanceof Array) ? true : false;
    if (! isValid) { return isValid}
    
    var readingPayload;
    for (i in readingBlockPayload)
    {
        readingPayload = readingBlockPayload[i];
        console.info("readingPayload: ", readingPayload);
    }
    return true;
}

app.use(function(err, req, res, next) {
    e = JSON.parse(err.message);
    // Your Error Status code and message here.
    res.status(e.code).json({"error": e.message});
});
