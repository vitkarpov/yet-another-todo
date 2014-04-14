var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

// ============
// Simple web server
// for noscript todo-app:
// 
// * can serve static
// * can handle models requests (/models/?_m=nameMolde)
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
        // update items
        mock.todos.forEach(function(item) {
            if (item.id === params.id) {
                item.done = params.done;
            }
        });
        // add new item
        if (params.id > mock.todos.length) {
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
        response.writeHead(200);

        var url = request.url.replace(/^\//, '');
        var streamPage = fs.createReadStream(path.resolve(process.cwd(), url || 'index.html'));

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

fs.writeFile('.pid', process.pid);