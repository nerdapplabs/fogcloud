const axios = require('axios')


function sendHttp(payload) {
   // Send a POST request
   axios({
    method: 'POST',
    url: 'http://localhost:3000/api/reading',
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
    url: 'http://localhost:3000/api/reading-block',
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
    
    // ASK and FIX ME:
    // reading or readings
    // and this will have one object only? or an array (obviously array can have 1 object too if timed-window allowed only 1)
    valid_1 = {"asset_code": "TI Sensor Tag/temperature", "reading": {"read_key": "f1cfff7a-3769-4f47-9ded-00f0975d66f5", "reading": {"temperature": 41, "humidity": 88}, "user_ts": "2017-10-11 15:10:51.927191906"}}
    
    invalid_1 = {"asset_cod": "TI Sensor Tag/temperature", "reading": {"read_key": "f1cfff7a-3769-4f47-9ded-00f0975d66f5", "reading": {"temperature": 41, "humidity": 88}, "user_ts": "2017-10-11 15:10:51.927191906"}}
    
    payloads = new Array(valid_1, invalid_1);

    return payloads;
}

function run() {
    payloads = preparePayloads();

    payloads.forEach(function(p) {
        sendHttp(p); 
    }, this);

    blockPayloads = prepareBlockPayloads();

    blockPayloads.forEach(function(p) {
        sendBlockHttp(p); 
    }, this);
       
}


run();
