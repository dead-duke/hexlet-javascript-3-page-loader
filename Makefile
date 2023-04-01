install:
	npm ci
	npm link

uninstall:
	npm uninstall -g @hexlet/code

publish:
	npm publish --dry-run

lint:
	npx eslint .

help:
	node bin/page-loader.js -h

test:
	npx jest

test-coverage:
	npx jest --coverage

test-debug-nock:
	DEBUG=nock.* npx jest

test-debug-axios:
	DEBUG=axios npx jest

test-debug-app:
	DEBUG=page-loader npx jest

run:
	node bin/page-loader.js https://ru.hexlet.io/courses