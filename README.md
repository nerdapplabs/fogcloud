# fogcloud

Developed and tested using:

```
$ node -v
v6.10.3

$ npm -v
4.6.1
```

## To install, Use or Test:

* npm install

* npm start

# How to run tests?
* npm run test (run in different session as these are integration not unit tests)

## ping

http://localhost:8118

## Request:

* `curl -X POST -H "Content-Type: application/json" http://localhost:8118/ingress/messages -d <payload>`

* `curl -X POST -H "Content-Type: application/json" http://localhost:8118/ingress/messages -d @payload.json`

### Valid/Invalid Block Payloads

* see [test.js](test.js)

* see valid [payload.json](payload.json)

## Expected Response:

### For Valid Block Payload
`{"received": "Valid Block Payload: <counter_top_index>"}`

### For Invalid Block Payload

`{"error": "Invalid Block Payload: <counter_top_index>"}`