# fogcloud

Developed and tested using:

```
$ node -v
v6.10.3

$ npm -v
4.6.1
```

## To install, Use:

* npm install

* npm start

## To run tests:

* `npm  test` (run in different session as these are integration test not the unit tests)

## Ping

http://localhost:6683

## Request:

* `curl -X POST -H "Content-Type: application/json" http://localhost:6683/sensor-reading -d <payload>`

* `curl -X POST -H "Content-Type: application/json" http://localhost:6683/sensor-reading -d @payload.json`

