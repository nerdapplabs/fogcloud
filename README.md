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

* npm run test 

## ping

http://localhost:8118

## Request:

* `curl -X POST -H "Content-Type: application/json" http://localhost:8118/ingress/messages -d <payload>`

* `curl -X POST -H "Content-Type: application/json" http://localhost:8118/ingress/messages -d @payload.json`

### Valid/Invalid Block Payloads

* see test.js

* see payload.json

## Expected Response:

### For Valid Block Payload
`{"received": "Valid Block Payload: <counter_top_index>"}`

### For Invalid Block Payload

`{"error": "Invalid Block Payload: <counter_top_index>"}`

## Request:

`curl -X POST -H "Content-Type: application/json" http://localhost:8118/ingress/message -d <payload>`

### Valid/Invalid Payloads

see test.js

## Expected Response:

### For Valid Payload
`{"received": "Valid Payload: <counter_top_index>"}`

### For Invalid Payload

`{"error": "Invalid Payload: <counter_top_index>"}`