BACKEND_MOCK := $(CURDIR)/workspaces/backend-mock

init:
	yarn install

docker-compose-up:
	$(MAKE) build -C $(BACKEND_MOCK)
	docker-compose up

clean:
	rm -rf $(CURDIR)/node_modules
	rm -rf $(CURDIR)/workspaces/backend-mock/node_modules
	rm -rf $(CURDIR)/workspaces/client/node_modules
