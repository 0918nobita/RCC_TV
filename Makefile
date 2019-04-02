BACKEND_MOCK := $(CURDIR)/workspaces/backend-mock
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
	$(MAKE) build -C $(BACKEND_MOCK)

docker-compose-up:
	docker-compose up

clean:
	rm -rf $(CURDIR)/node_modules
	rm -rf $(CURDIR)/workspaces/backend-mock/node_modules
	rm -rf $(CURDIR)/workspaces/client/node_modules

lint:
	$(MAKE) lint -C $(BACKEND_MOCK)
	$(MAKE) lint -C $(CLIENT)

test:
	$(MAKE) test -C $(BACKEND_MOCK)
	$(MAKE) test -C $(CLIENT)
