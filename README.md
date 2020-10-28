# nccu-advtch-docker-example

## Environment Setup(local)

### Prerequisite

1. node v11 or above
2. PostgreSQL

### How to set up a local environment

#### 1. clone the project

```bash
git clone git@github.com:capy-pl/nccu-advtch-docker-example.git
```

#### 2. cd into the project folder

```bash
cd nccu-advtch-docker-example
```

#### 3. install node dependencies

```bash
yarn
```

#### 4. set up PostgreSQL environment

```bash
# I use docker container to run PostgreSQL in my environment.
# You can type following command on command line to start a PostgreSQL container with default user and db created.
# It will start a PostgreSQL container and map the host port 5434 to container port 5432.
docker run \
-d \
-e POSTGRES_DB=todoapp \
-e POSTGRES_USER=test \
-e POSTGRES_PASSWORD=test \
-p 5434:5432 \
postgres
```

#### 5. create default table

```bash
# use psql to connect to db
psql -h 0.0.0.0 -p 5434 -d todoapp -U test

# you should see a prompt asking for password, just type "test" and hit enter.
# after connect to the db, run following sql query.
CREATE TABLE todos (
    ID SERIAL PRIMARY KEY,
    Title varchar(100) NOT NULL,
    Content varchar(500)
);

# exit psql
\q
```

#### 6. Start server

```bash
yarn start
```

#### 7. Open your browser and type `localhost:3000`

## Environment Setup Docker(docker)

### Prerequisite(docker)

1. Docker

2. Build the Dockerfile
    - db.Dockerfile
        ```sh
        docker build \
            -t todo-db:1.0.0 \
            -f ./db.Dockerfile \
            .
        ```
    - server.Dockerfile
        ```sh
        docker build \
            -t todo-server:1.0.0 \
            -f ./server.Dockerfile \
            .
        ```
    
3. Run containers
    - DB
        ```sh
        docker run -d \
            --name todo-db \
            -p 5433:5432 \
            todo-db:1.0.0
        ```
    - Server
        ```sh
        docker run -d \
            --name todo-server \
            -e PGHOST=todo-db \
            -p 3001:3000 \
            --link todo-db \
            todo-server:1.0.0
        ```
4. Open your browser and type `localhost:3001`