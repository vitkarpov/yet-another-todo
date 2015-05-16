var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

// ============
// Simple web server
// for noscript todo-app:
// 
// * can serve static
// * can handle models requests (/models/?_m=model)
// ============

/**
 * Data's mock (fake database)
 */
var mock = {
    todos: [
        {
            id: 1,
            title: 'Greet the world!',
            done: 'false'
        },
        {
            id: 2,
            title: 'Get drunk like never before',
            done: 'true'
        }
    ]
};

/**
 * Models' controllers
 */
var controllers = {
    listTodo: function() {
        return JSON.stringify({
            models: [
                {
                    data: mock
                }
            ]
        });
    },
    'do-todo': function(params) {
        var id = params.id;

        // update items
        mock.todos.forEach(function(item) {
            if (item.id == id) {
                item.done = params.done;
            }
        });
        // add new item
        if (id > mock.todos.length) {
            mock.todos.push(params);
        }
        return JSON.stringify({
            models: [
                {
                    data: {
                        status: 'ok'
                    }
                }
            ]
        });
    }
};

var handlers = {

    /**
     * Handle static files
     */
    GET: function(request, response) {
        var url = request.url.replace(/^\//, '');
        var pathName = path.resolve(process.cwd(), url || 'index.html');
        var streamPage = fs.createReadStream(pathName);

        var ext = /(.*)\.(.*)/.exec(pathName)[2];

        if (ext === 'js') {
            type = 'application/x-javascript; charset=utf-8';
        }
        if (ext === 'css') {
            type = 'text/css; charset=utf-8';
        }
        if (ext === 'html') {
            type = 'text/html; charset=utf-8';
        }

        response.writeHead(200, { 'Content-Type': type });

        streamPage.on('end', function() {
            response.end();
        });
        streamPage.pipe(response);
    },

    /**
     * Handle models
     */
    POST: function(request, response) {
        var model = url.parse(request.url, true).query['_m'];
        var params = {};

        request.on('data', function(buffer) {
            buffer.toString().split('&').forEach(function(item) {
                var parsed = item.split('.0=');
                params[parsed[0]] = parsed[1];
            });
        });

        request.on('end', function() {
            response.write(controllers[params._model](params));
            response.end();
        });
    }
};

http.createServer(function(request, response) {
    handlers[request.method](request, response);
}).listen(8000);
console.log('Server listening at 8000 port');