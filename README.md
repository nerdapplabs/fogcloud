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

`curl -X POST -H "Content-Type: application/json" http://localhost:8118/ingress/messages -d <payload>`

### Valid Block Payloads

see test.js

### Invalid Block Payloads

see test.js


Not sure about this one?

`'{"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": ["x"]}'`

## Expected Response:

### For Valid Block Payload
`{"recieved": "Valid Block Payload: <counter_top_index>"}`

### For Invalid Block Payload

`{"error": "Invalid Block Payload: <counter_top_index>"}`

## Request:

`curl -X POST -H "Content-Type: application/json" http://localhost:8118/ingress/message -d <payload>`

### Valid Payloads

see test.js



### Invalid Payloads

see test.js



This one?

`'{"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": "x"}'`

## Expected Response:

### For Valid Payload
`{"recieved": "Valid Payload: <counter_top_index>"}`

### For Invalid Payload

`{"error": "Invalid Payload: <counter_top_index>"}`