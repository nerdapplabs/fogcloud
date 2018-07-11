const axios = require("axios");
const assert = require("assert");

describe("HTTP north sender ingress tests", function() {

  validPayload = [
    {
      timestamp: "2017-01-02T01:02:03.23232Z-05:00",
      asset: "pump1",
      key: "80a43623-ebe5-40d6-8d80-3f892da9b3b4",
      readings: { humidity: 0, temperature: -40 }
    }
  ];

  invalidPayload = {};

  it("should make a successful POST request with validPayload", () => {
    return axios({
      method: "POST",
      url: "http://localhost:6683/sensor-reading",
      data: validPayload
    }).then(
      res => {
        assert.equal(res.status, 201);
      },
      err => {}
    );
  });

  it("should get bad request for invalidPayload", () => {
    return axios({
      method: "POST",
      url: "http://localhost:6683/sensor-reading",
      data: invalidPayload
    }).then(
      res => {},
      err => {
        errResponse = err.response;
        assert.equal(errResponse.status, 400);
      }
    );
  });
});
