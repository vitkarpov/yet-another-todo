Yet Another TODO app built with noscript
=============

Simple TODO app build on top of the [Noscript](https://github.com/yandex-ui/noscript)

## Getting start

Clone the repo and run all tasks using main one:

```
make all
```

It will take care of all the stuff:

* install all dependencies (using `npm`)
* run grunt tasks
* run server

To stop the server execute `make stop`

## File structure

There're models and views declarations each inside it's folder. Views also have yate templates and css file (each view is an independent block).

Layouts and routes live inside their separate folders.

## Custom web server

It use simple custom web server to handle models' request with mocks, be sure to check out `server.js` script.