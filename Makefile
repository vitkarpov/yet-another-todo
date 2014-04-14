GRUNT=node_modules/.bin/grunt

# install dependencies
deps:
	npm i

# run grunt tasks: concat resources, compile templates and watch files' changes
grunt:
	$(GRUNT)

# start server
server:
	echo '' > .pid
	node server.js &> /dev/null &

# stop server
stop:
	cat .pid | xargs kill

# make it all!
all: deps grunt server

