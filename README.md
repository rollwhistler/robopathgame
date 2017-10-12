 CONTENTS OF THIS FILE
---------------------

 * [Introduction](#introduction)
 * [Requirements](#requirements)
 * [Quickstart](#quickstart)
 * [Useful Commands](#useful-commands)
 * [Helper Scripts](#helper-scripts)

INTRODUCTION
------------

KTM Time Tracker

REQUIREMENTS
------------

Before continuing you will need to ensure you have the following installed:

 * [Docker](https://www.docker.com)
 * [Docker Compose](https://docs.docker.com/compose)

QUICKSTART
----------

These instructions assume you have a local directory located at `~/Development`. If you choose to place this project in a different directory you will need to allow for that when following them.

From a terminal window

```bash
$ cd ~/Development                                                  # Change to the development directory
$ git clone git@gitlab.com:cnb-apps/pech-fruits.git                 # Clone the pech-fruits project
$ cd pech-fruits                                                    # Change to the project directory
$ bin/up.sh                                                         # Initialise the containers
```

After all containers have finished initialising you will be able to access the various components as follows:

* Admin         [http://localhost:4300](http://localhost:4300)
* Frontend      [http://localhost:4200](http://localhost:4200)
* API Explorer  [http://localhost:3000/explorer](http://localhost:3000/explorer)
* Adminer       [http://localhost:8080](http://localhost:8080)

You can access the admin section with the following credentials:

```text
email:      admin@example.com
password:   password
```

You can use Adminer to examine the database with the following credentials:

```text
host:       db
user:       ktm
password:   ktm
database:   ktm
```

CREATING DATABASE MIGRATIONS
----------------------------

To create a new migration run the following:

```bash
bin/npm-server.sh run migrate:create my_awesome_migration
```

This will create some files within the `migrations` folder, specifically:

* a timestamped javascript file for running the migration
* an up and a down sql file within the `migrations/sqls` folder

E2E TESTING
-----------

To run the e2e tests you must first run an additional migration to prime the database with test data:

 * `bin/npm-server.sh run migrate up:test`
 
The e2e tests are then run with the following:

 * `bin/e2e.sh`
 
To reset the database after a test run:

* `bin/npm-server.sh run migrate reset:test`
* `bin/npm-server.sh run migrate up:test`

To run a specific test:

* `bin/e2e.sh --specs e2e/auth.spec.ts`

USEFUL COMMANDS
--------------

The following must be executed from the root directory of the repository:

 * `docker-compose up -d` will build/re-build the docker containers and start them in background mode
 * `docker-compose down` will remove the docker containers
 * `docker-compose start` will start the docker containers
 * `docker-compose stop` will stop the docker containers
 * `docker-compose restart` will restart the docker containers
 * `docker-compose start <admin|frontend|api|db|adminer>` will start a specific docker container
 * `docker-compose stop <admin|frontend|api|db|adminer>` will stop a specific docker container
 * `docker-compose restart <admin|frontend|api|db|adminer>` will restart an individual component
 * `docker-compose logs -f` will display the docker logs for all containers
 * `docker-compose logs -f <admin|frontend|api|db|adminer>` will display the docker logs for the respective components
 * `docker-compose exec <admin|frontend|api> npm ...` will execute npm commands against the running containers
 * `docker-compose exec api npm run migrate:create -- foo ...` will create a database migration called foo.

HELPER SCRIPTS
--------------

There are some utility scripts in the bin directory for making it easier to call above commands:

 * `bin/up.sh` will build/re-build the docker containers and start them in background mode
 * `bin/down.sh` will remove the docker containers
 * `bin/start.sh` will start the docker containers
 * `bin/stop.sh` will stop the docker containers
 * `bin/restart.sh` will restart the docker containers
 * `bin/start.sh <admin|frontend|api|db|adminer>` will start a specific docker container
 * `bin/stop.sh <admin|frontend|api|db|adminer>` will stop a specific docker container
 * `bin/restart.sh <admin|frontend|api|db|adminer>` will restart an individual component
 * `bin/logs.sh` will display the docker logs for all containers
 * `bin/logs.sh <admin|frontend|api|db|adminer>` will display the docker logs for the respective components
 * `bin/npm-server.sh ...` will execute npm commands against the server container
 * `bin/npm-client.sh ...` will execute npm commands against the client container
 * `bin/npm-server.sh run migrate:create -- foo ...` will create a database migration called foo.
 * `bin/npm-server.sh run sdk` will re-generate the sdk within the `client` project
