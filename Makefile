install:
	npm install

dev:
	npx astro dev

build:
	npx astro build

preview: build
	npx astro preview

deploy:
	npx astro build
	GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.hooksPath GIT_CONFIG_VALUE_0=/dev/null npx gh-pages -d dist --dotfiles

.PHONY: install dev build preview deploy
