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

run:
	node bin/page-loader.js https://ru.hexlet.io/courses