# Sink data mysql to mongodb
Sink data mysql data to mongodb based on mysql binlog event 
## Requirements

* Node 12
* Git
* MySql 5.7 to 8.0.0
* MongoDB

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/tasmidur/sink-data-mysql-to-mongodb.git
cd sink-data-mysql-to-mongodb
```

```bash
npm install
```

## Project Setup Steps:

Step 1: Copy env.example to .env

Step 2: Edit Source Connector Config For Mysql
```
MYSQL_HOST="localhost"
MYSQL_PORT="3306"
MYSQL_USER="root"
MYSQL_PASSWORD="root"

```
Step 3: Edit Sink Connector Config For MongDB
```
MONGO_DB_URL="mongodb://localhost:27017"
MONGO_DB_COLLECTION_NAME="collection_name"
```

## Use Docker
You can also run this app as a Docker container:

Step 1: Go to docker directory and run

``` bash
cd docker
docker-compose up
```
