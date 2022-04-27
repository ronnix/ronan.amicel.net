install:
	npm install

dev:
	node_modules/.bin/gatsby develop

build:
	node_modules/.bin/gatsby build

serve: build
	node_modules/.bin/gatsby serve

deploy:
	npm run deploy

.PHONY: install dev build serve deploy
