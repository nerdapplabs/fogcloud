const axios = require('axios')

function sendBlockHttp(payload) {
   // Send a POST request
   axios({
    method: 'POST',
    url: 'http://localhost:8118/ingress/messages',
    data: payload
  })
  .then(function (response) {
    console.log(response.status, response.statusText);
    console.log(response.data);
  })
  .catch(function (error) {
    errResponse = error.response
    console.log(errResponse.status, errResponse.statusText);
    console.log(errResponse.data);
  });
}

function prepareBlockPayloads() {  
    valid_1 = [{ "asset_code": "TI Sensor Tag/temperature",
    "readings": [
        {
            "read_key": "f1cfff7a-3769-4f47-9ded-00f0975d66f5",
            "reading": {
                "temperature": 23,
                "humidity": 6
               },
            "user_ts": "2017-10-11 15:10:51.927191906"
           },
           {
               "read_key": "78f73c9f-bc11-4b8d-a246-58863adf66b5",
               "reading": {
                   "temperature": 41,
                   "humidity": 88
               },
               "user_ts": "2017-10-11 15:10:51.930077316"
           }
       ]
   },
   { "asset_code": "TI Sensor Tag/blah",
   "readings": [
       {
           "read_key": "f1cfff7a-3769-4f47-9ded-00f0975d6665",
           "reading": {
               "blah1": 23
              },
            "user_ts": "2017-10-11 15:10:51.927191907"
          },
          {
              "read_key": "78f73c9f-bc11-4b8d-a246-58863adf66a5",
              "reading": {
                  "temperature": 41,
                  "humidity": 88
              },
              "user_ts": "2017-10-11 15:10:51.930077318"
          }
      ]}
    ]
    // asset_code key
    invalid_1 = [{"asset_cod": "TI Sensor Tag/temperature", "readings": [{"read_key": "f1cfff7a-3769-4f47-9ded-00f0975d66f5", "reading": {"temperature": 41, "humidity": 88}, "user_ts": "2017-10-11 15:10:51.927191906"}]}]
    
    // readings array key
    invalid_2 = [{"asset_code": "TI Sensor Tag/temperature", "readingx": [{"read_key": "f1cfff7a-3769-4f47-9ded-00f0975d66f5", "reading": {"temperature": 41, "humidity": 88}, "user_ts": "2017-10-11 15:10:51.927191906"}]}]

    // user_ts vs timestamp
    invalid_3 = [{"asset_code": "TI Sensor Tag/temperature", "readings": [{"read_key": "f1cfff7a-3769-4f47-9ded-00f0975d66f5", "reading": {"temperature": 41, "humidity": 88}, "timestamp": "2017-10-11 15:10:51.927191906"}]}]
    
    // readings not an array
    invalid_4 = [{"asset_code": "TI Sensor Tag/temperature", "readings": {"read_key": "f1cfff7a-3769-4f47-9ded-00f0975d66f5", "reading": {"temperature": 41, "humidity": 88}, "user_ts": "2017-10-11 15:10:51.927191906"}}]

     // readings array has 1 invalid read object
    invalid_5 = [{ "asset_code": "TI Sensor Tag/temperature",
     "readings": [
         {
             "read_key": "f1cfff7a-3769-4f47-9ded-00f0975d66f5",
             "reading": {
                 "temperature": 23,
                 "humidity": 6
                },
                "user_ts": "2017-10-11 15:10:51.927191906"
            },
            {
                "read_key": "78f73c9f-bc11-4b8d-a246-58863adf66b5",
                "reading": {
                    "temperature": 41,
                    "humidity": 88
                },
                "timestamp": "2017-10-11 15:10:51.930077316"
            }
        ]
    }]
    invalid_6 = {"readings": [{"read_key": "f1cfff7a-3769-4f47-9ded-00f0975d66f5", "reading": {"temperature": 41, "humidity": 88},}]}
    
    // not an array 
    invalid_7 = valid_1[0]
    
    payloads = new Array(valid_1, invalid_1, invalid_2, invalid_3, invalid_4, invalid_5, invalid_6, invalid_7);
    return payloads;
}

function run() {
    blockPayloads = prepareBlockPayloads();

    blockPayloads.forEach(function(p) {
        sendBlockHttp(p); 
    }, this);
       
}

run();