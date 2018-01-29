const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

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

router.route('/messages')    
    // create a reading (accessed at POST http://localhost:8118/ingress/messages)
    .post(function(req, res, err) {
        var readingBlock =  req.body;
        isValid = validateReadingBlock(readingBlock);
        if (! isValid) {
            blockDiscarded ++
            console.log("Invalid Block Payload", JSON.stringify(readingBlock))
            var obj = {"code": 400, "reason": "Invalid Block Payload: " + blockDiscarded}   
            throw new Error(JSON.stringify(obj));
        }
        blockCounter++
        console.log("Valid Block payload", JSON.stringify(readingBlock))
        res.json({"received": "Valid Block Payload: " + blockCounter});
    });

// all of our routes will be prefixed with /api
app.use('/ingress', router);

function validateReadingBlock(readingBlockPayload) {

    isValid = (readingBlockPayload instanceof Array) ? true : false;
    if (! isValid) { return isValid}
    
    var readingPayload;
    for (i in readingBlockPayload)
    {
        readingPayload = readingBlockPayload[i];

        isValid = readingPayload.asset_code === undefined ? false : true;
        if (! isValid) { return isValid}

        isValid = readingPayload.readings === undefined ? false : true;
        if (! isValid) { return isValid}

        reads = readingPayload.readings

        isValid = (reads instanceof Array) ? true : false;
        if (! isValid) { return isValid}

        var r;
        for (j in reads) {
            r = reads[j]

            isValid = r.read_key === undefined ? false : true;
            if (! isValid) { return isValid};

            isValid = r.reading === undefined ? false : true;
            if (! isValid) { return isValid};

            // isValid = r.timestamp === undefined ? false : true;
            isValid = r.user_ts === undefined ? false : true;
            if (! isValid) { return isValid};
        }
    }
    return true;
}

app.use(function(err, req, res, next) {
    e = JSON.parse(err.message);
    // Your Error Status code and message here.
    res.status(e.code).send(e.reason);
});
