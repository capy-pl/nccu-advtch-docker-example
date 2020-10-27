build-server:
	docker build \
		-t todo-server:1.0.0 \
		-f ./server.Dockerfile \
		.

build-db:
	docker build \
		-t todo-db:1.0.0 \
		-f ./db.Dockerfile \
		.

run-server:
	docker run -d \
		--name todo-server \
		-e PGHOST=todo-db \
		-p 3001:3000 \
		--link todo-db \
		todo-server:1.0.0

run-db:
	docker run -d \
		--name todo-db \
		-p 5433:5432 \
		todo-db:1.0.0

stop-server:
	docker stop $(shell docker ps -aqf "name=todo-server") && \
		docker rm $(shell docker ps -aqf "name=todo-server")

stop-db:
	docker stop $(shell docker ps -aqf "name=todo-db") && \
		docker rm $(shell docker ps -aqf "name=todo-db")

stop:
	make stop-server && make stop-db