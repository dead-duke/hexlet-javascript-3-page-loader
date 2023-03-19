install:
	npm ci
	npm link

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