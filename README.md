# fogcloud

Developed and tested using:

```
$ node -v
v6.10.3

$ npm -v
4.6.1
```

To install and use:

* npm install

* npm start


### ping

http://localhost:3000/api

### Request:

`curl -X POST -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json"  http://localhost:3000/api/reading `

### Expect:

`{"recieved":{"key1":"value1","key2":"value2"}}`