install:
	npm install

dev:
	npx astro dev

build:
	npx astro build

preview: build
	npx astro preview

deploy:
	npm run deploy

.PHONY: install dev build preview deploy
