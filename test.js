const axios = require('axios')


function sendHttp(payload) {
   // Send a POST request
   axios({
    method: 'POST',
    url: 'http://localhost:8118/ingress/message',
    data: payload
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error.data);
  });
}

function sendBlockHttp(payload) {
   // Send a POST request
   axios({
    method: 'POST',
    url: 'http://localhost:8118/ingress/messages',
    data: payload
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error.data);
  });
}

function preparePayloads() {
    
    valid_1 = {"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}};

    valid_2 = {"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "sensor_values": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}};

    invalid_1 = {"timestam": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}};

    invalid_2 = {"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asse": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}};

    invalid_3 = {"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "ke": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}};

    invalid_4 = {"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "reading": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}};
    
    payloads = new Array(valid_1, valid_2, invalid_1, invalid_2, invalid_3, invalid_4);

    return payloads;
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
               "timestamp": "2017-10-11 15:10:51.930077316"
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
              "timestamp": "2017-10-11 15:10:51.930077318"
          }
      ]
  },]
    invalid_1 = {"asset_cod": "TI Sensor Tag/temperature", "readings": [{"read_key": "f1cfff7a-3769-4f47-9ded-00f0975d66f5", "reading": {"temperature": 41, "humidity": 88}, "timestamp": "2017-10-11 15:10:51.927191906"}]}
    invalid_2 = {"asset_code": "TI Sensor Tag/temperature", "reading": [{"read_key": "f1cfff7a-3769-4f47-9ded-00f0975d66f5", "reading": {"temperature": 41, "humidity": 88}, "timestamp": "2017-10-11 15:10:51.927191906"}]}
    invalid_3 = {"asset_code": "TI Sensor Tag/temperature", "readings": {"read_key": "f1cfff7a-3769-4f47-9ded-00f0975d66f5", "reading": {"temperature": 41, "humidity": 88}, "timestamp": "2017-10-11 15:10:51.927191906"}}


    invalid_4 = { "asset_code": "TI Sensor Tag/temperature",
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
    }
    invalid_5 = {"readings": [{"read_key": "f1cfff7a-3769-4f47-9ded-00f0975d66f5", "reading": {"temperature": 41, "humidity": 88},}]}
    payloads = new Array(valid_1, invalid_1, invalid_2, invalid_3, invalid_4, invalid_5);

    return payloads;
}

function run() {
    // payloads = preparePayloads();

    // payloads.forEach(function(p) {
    //     sendHttp(p); 
    // }, this);

    blockPayloads = prepareBlockPayloads();

    blockPayloads.forEach(function(p) {
        sendBlockHttp(p); 
    }, this);
       
}


run();
