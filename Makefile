.PHONY: usage run build publish


# Colors
NC=\x1b[0m
L_GREEN=\x1b[32;01m

## usage: print useful commands
usage:
	@echo "$(L_GREEN)Choose a command: $(PWD) $(NC)"
	@bash -c "sed -ne 's/^##//p' ./Makefile | column -t -s ':' |  sed -e 's/^/ /'"

## run: starts web server and db using docker-compose up
run:
	yarn run serve

## build: builds app
build:
	yarn build

## publish
publish:
	bash ./scripts/publish.sh

release: build publish
