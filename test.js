const axios = require('axios')


function sendHttp(payload) {
   // Send a POST request
   axios({
    method: 'post',
    url: 'http://localhost:3000/api/reading',
    data:payload
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error.data);
  });
}

function prepare_payloads() {
    
    valid_1 = {"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}};

    valid_2 = {"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "sensor_values": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}};

    invalid_1 = {"timestam": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}};

    invalid_2 = {"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asse": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}};

    invalid_3 = {"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "ke": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}};

    invalid_4 = {"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "reading": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}};
    
    payloads = new Array(valid_1, valid_2, invalid_1, invalid_2, invalid_3, invalid_4);

    return payloads;
}


function run() {
    payloads = prepare_payloads();

    payloads.forEach(function(p) {
        sendHttp(p); 
    }, this);
       
}


run();
