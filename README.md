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

http://localhost:3000/api

## Request:

`curl -X POST -H "Content-Type: application/json" http://localhost:3000/api/reading -d <payload>`

### Valid Payloads

`'{"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}}'`

`'{"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "sensor_values": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}}'`


### Invalid Payloads

`'{"timestam": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}}'`

`'{"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asse": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}}'`

`'{"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "ke": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}}'`

`'{"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "reading": {"velocity": "500", "temperature": {"value": "32", "unit": "kelvin"}}}'`


This one?

`'{"timestamp": "2017-01-02T01:02:03.23232Z-05:00", "asset": "pump1", "key": "80a43623-ebe5-40d6-8d80-3f892da9b3b4", "readings": "x"}'`

## Expected Response:

### For Valid Payload
`{"recieved": "Valid Payload: <counter_top_index>"}`

### For Invalid Payload

`{"error": "Invalid Payload: <counter_top_index>"}`