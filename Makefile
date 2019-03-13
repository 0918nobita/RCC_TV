init:
	yarn install

clean:
	rm -rf ./node_modules
	rm -rf ./workspaces/backend-mock/node_modules
	rm -rf ./workspaces/client/node_modules
