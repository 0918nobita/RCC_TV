BACKEND := $(CURDIR)/workspaces/backend
CLIENT := $(CURDIR)/workspaces/client

init:
	yarn install
	docker-compose build

build:
	$(MAKE) build-client
	$(MAKE) build-backend

build-client:
	$(MAKE) build -C $(CLIENT)

build-backend:
	$(MAKE) build -C $(BACKEND)

docker-compose-up:
	docker-compose up

clean:
	rm -rf $(CURDIR)/node_modules
	rm -rf $(BACKEND)/node_modules
	rm -rf $(CLIENT)/node_modules

lint:
	$(MAKE) lint -C $(BACKEND)
	$(MAKE) lint -C $(CLIENT)

test:
	$(MAKE) test -C $(BACKEND)
	$(MAKE) test -C $(CLIENT)
