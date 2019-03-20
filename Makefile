BACKEND_MOCK := $(CURDIR)/workspaces/backend-mock
CLIENT := $(CURDIR)/workspaces/client

init:
	yarn install
	docker-compose build

build-backend:
	$(MAKE) build -C $(BACKEND_MOCK)

docker-compose-up:
	$(MAKE) dev-server -C $(CLIENT) & \
	($(MAKE) build-backend; docker-compose up)

clean:
	rm -rf $(CURDIR)/node_modules
	rm -rf $(CURDIR)/workspaces/backend-mock/node_modules
	rm -rf $(CURDIR)/workspaces/client/node_modules
