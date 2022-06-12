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
## Project Config
Event Config file configuration

Step 1: Go to config directory and edit eventConfig.js File

```
const eventConfig = {
    /**
     * Default: false
     * Pass true to only emit binlog events that occur after ZongJi's instantiation.
     * Must be used in start() method for effect.
     */
    startAtEnd: false,
    /**
     * Databases and tables to include (Only for row events).
     * Use database names as the key and pass an array of table names or true (for the entire database)
     * Example: { 'my_database': ['allow_table', 'another_table'], 'another_db': true }
     */
    includeSchema: {
        cdc: true
    },
    /**
     * Object describing which databases and tables to exclude (Same format as includeSchema)
     * Example: { 'other_db': ['disallowed_table'], 'ex_db': true }
     */
    excludeSchema: {
        mysql: true,
        sys: true
    }
}
```

## Use Docker
You can also run this app as a Docker container:

Step 1: Go to docker directory and run

``` bash
cd docker
docker-compose up
```
## Run Project

``` bash
npm run start
```
