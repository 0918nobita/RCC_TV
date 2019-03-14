BACKEND_MOCK := $(CURDIR)/workspaces/backend-mock
CLIENT := $(CURDIR)/workspaces/client

init:
	yarn install
	docker-compose build

docker-compose-up:
	$(MAKE) dev-server -C $(CLIENT) & \
	($(MAKE) build -C $(BACKEND_MOCK); docker-compose up)

clean:
	rm -rf $(CURDIR)/node_modules
	rm -rf $(CURDIR)/workspaces/backend-mock/node_modules
	rm -rf $(CURDIR)/workspaces/client/node_modules
