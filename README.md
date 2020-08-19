# Spicy.ai

## Assignment

This project is a fork of the Zesty.ai engineering test (back-end).
The original assignment instructions can be found in [assignment.md](assignment.md).

## Implemented features

- Display:

  - `GET /property/622088210a6f43fca2a1824e8610df03/image`

- Display Plus (WIP):

  - `GET /property/622088210a6f43fca2a1824e8610df03/image?parcelOverlay=true&buildingOverlay=true`

- Find:

  - `GET /property?geoJson={"type":"Point","coordinates":[-80.0782213,26.8849731]}&distance=120000`

- Freestyle:

  - Bonus endpoint: Get property (JSON)
    - `GET /property/622088210a6f43fca2a1824e8610df03`
  - Bonus endpoint: Find all properties (JSON)
    - `GET /property`
  - Bonus Display param: alternate image file type (jpg|png)
    - `GET /property/622088210a6f43fca2a1824e8610df03/image?fileType=png`
  - Bonus Display param: resolution (px)
    - `GET /property/622088210a6f43fca2a1824e8610df03/image?resolution=240`

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

A prebuilt Docker image of the Spicy.ai API is available in this repo's
[GitHub Packages](https://github.com/pascal-giguere/spicy.ai/packages).

```bash
docker pull docker.pkg.github.com/pascal-giguere/spicy.ai/spicy-ai-backend:1.0.0
```

Two environment variables must be set prior to running the API:

```bash
export DATABASE_URL=postgres://postgres@localhost:5432/zesty
export PORT=3030
```

Once the database has been initialized and is running with the config specified in the env var above, start the API's
Docker image:

```bash
docker run -e DATABASE_URL -e PORT -p 3031:3030 docker.pkg.github.com/pascal-giguere/spicy.ai/spicy-ai-backend:1.0.0
```

## Usage

Once the API and database are running, you'll be able to access Spicy.ai from your host machine on the port defined
above:

```bash
curl http://localhost:3031
# -> "Spicy.AI API"
```
