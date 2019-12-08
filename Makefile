install:
	@npm install

uninstall:
	@rm -rf ./node_modules
	@echo './node_modules removed.'

all: test
	@echo 'all'

run:
	@mongod --config /usr/local/etc/mongod.conf &
	@sleep 3
	@node server.js &

clean:
	@echo 'cleared.'

.PHONY: clean all
