install:
	npm ci

test:
	npm test

test-coverage:
	npm run test:coverage

lint:
	npm run lint

.PHONY: install test test-coverage lint