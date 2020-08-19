# Spicy.ai

## Assignment

This project is a fork of the Zesty.ai engineering test (back-end).
The original assignment instructions can be found in [assignment.md](assignment.md).

## Setup

You can start Spicy.ai using either of these three methods:

#### 1. Build and run locally (with Docker)

This project requires Docker and docker-compose to be installed.

From the project root directory:

```bash
PORT=3031 docker-compose up
```

#### 2. Build and run locally (without Docker)

This project requires Node 12, Yarn 1, PostgreSQL 9 and PostGIS 2 to be installed.

Once the database has been initialized and is running, start the API from the project root directory:

```bash
export PORT=3031
export DATABASE_URL=postgres://postgres@localhost:5432/zesty
yarn
cd backend/ && yarn start
```

#### 3. Run a pre-built Docker image

TODO

## Usage

Once the API and database are running, you'll be able to access Spicy.ai from your host machine on the port defined
above:

```bash
curl http://localhost:3031
# -> "Spicy.AI API"
```
