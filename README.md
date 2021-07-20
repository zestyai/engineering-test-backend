# Zesty.ai engineering test (back-end)

## Background
Back-end engineers at Zesty.ai design high-performance, reliable, cloud-native distributed systems, work with many kinds of data and imagery, and build/extend Zesty.ai’s platform, services, and internal tools. 

This test is an opportunity for you to demonstrate your comfort with developing back-end services, similar to a day-to-day project you might encounter working on our team.

## Assignment
Your goal is to create a RESTful API  that can find and manipulate images and geographical data, using property data stored in a SQL database, and images stored in cloud storage. Your API should be packaged as a containerized service (Docker image). A test property database and images are provided for you.

There are several different options for features you can implement in the API. You can pick whichever ones you think you can do best in the time frame allotted.

Note that some features are more difficult than others, and you will be evaluated on more than just the number of features completed. Quality is preferred over quantity. Design, organize, and comment your code as you would a typical production project. Be prepared to explain any decisions you made.

## Feature list
* **Display:** API endpoint to display an image by property ID.  Given a *propertyId* as input, find the image URL from the database, download it from Google Cloud Storage and return the binary image as output in a format suitable for browser display.
* **Find:** API endpoint to search properties within a geographical area.  Take a [GeoJSON](https://geojson.org/) object *geoJson* and a search radius *distance* (in meters) as inputs. Return all property IDs that are within *distance* meters of *geoJson*. Use the `geocode_geo` field of the `property` table for your query.
* **Display Plus:** Add an option to the first API endpoint (**Display**) to also overlay the parcel and/or buildings (`parcel_geo` and `buildings_geo` fields in the database) on the image.  You can optionally add parameters for the color of each overlay, or use a default for each.
* **Statistics:** API endpoint to calculate geographic data about all properties within a given distance from a reference property. Take *propertyId* and *distance* (in meters) as inputs. The API should return the following:
  * parcel area (meters squared)
  * buildings areas (array, meters squared)
  * buildings distances to center (array, meters).  Distance to center is the distance from the building to the `geocode_geo` field in the property table
  * zone density (percentage).  Create a "zone" geography, which is a buffer of *distance* meters around the `geocode_geo` point.  Then, calculate the percentage of that zone geography which has buildings in it.
* **Freestyle:**  Based on the other features, you should have a feel for the kind of features this API implements.  If you have other cool ideas of things to add that aren't listed here, we'd love to see them.

## Setup
### Development environment requirements

You will need to install [Docker](https://www.docker.com/products/docker-desktop) and [`docker-compose`](https://docs.docker.com/compose/install/) to run the example database.

Your code should be in Python 3.x.  If you want to run/test your project locally, you of course can, but ultimately, your API should be made available as a Docker image.

### Database startup
From the repo root folder, run `docker-compose up -d` to start the PostgreSQL database needed for this example.  The database server will be exposed on port **5555**.  If this port is not available on your computer, feel free to change the port in the `docker-compose.yml` file.

In the test database, there is a single table called `properties` (with 5 sample rows), where each row represents a property or address.  There are three geography* fields and one field with an image URL pointing to an image on [Google Cloud Storage](https://cloud.google.com/storage/).

* *If you are not familiar with [PostgreSQL](https://www.postgresql.org/) or [PostGIS](https://postgis.net/), you may need to read up beforehand.*

## API Specification
The API you will be implementing for this project must follow the following API specification:

*** 

### GET /display/:id?(overlay=yes(&parcel=:parcelColor)(&building=:buildingColor))

*Fetches and displays property tile by ID. Optionally overlays parcel and building geometries on tile.*
`example: GET localhost:1235/display/f853874999424ad2a5b6f37af6b56610?overlay=yes&building=green&parcel=orange`
##### Request Parameters
- "id" | description: Property ID | type: string | required: true | validation: length greater than 0

- "overlay" | description: Overlays parcel and building geometries on tile | type: string | required: false | validation: enum("yes")

- "parcel" | description: Indicated building overlay color | type: string | required: false | validation: enum() ex. "red", "green", "orange"

- "building" | description: Indicates building overlay color | type: string | required: false | validation: enum() ex. "red", "green", "orange"

##### Response
JPEG image

***
### POST /find
*Finds properties within X meters away from provided geojson point.*

`example: POST localhost:1235/find`

##### Request Body
- geojson object with x-distance property

```
example:

{
  "type": "Feature",
  "geometry": {
  "type": "Point",
  "coordinates": [-80.0782213, 26.8849731]
  },
  "x-distance": 1755000
}
```

##### Response
JSON array of property IDs

***
### GET /statistics/:id?distance=:distance

*Returns various statistics for parcels and buildings found X meters around the requested property*

`example: GET localhost:1235/statistics/f853874999424ad2a5b6f37af6b56610?distance=1755000`

##### Request Parameters

- "id" | description: Property ID | type: string | required: true | validation: length greater than 0

- "distance" | description: Buffer distance | type: integer | required: true | validation: greater than 0

##### Response
JSON array including
- "parcel_area_sqm" | description: Total area of the property's parcel, in square meters | type: float

- "building_area_sqm" | description: Total area of buildings inside the property's parcel, in square meters | type: float

- "building_distances_m" | description: Array of [distance, from the centroid of the property, to the centroid of each building, in meters] | type: List[float]

- "zone_density" | description: Array of [density of each building's area as a ratio to parcel area, dimensionless] | type: List[float]
***
## Submission instructions

Send us your completed application's code by email, or create and give us access to a new private GitHub repository.

Include instructions on how to run your app, and a list of what features you implemented. Add any comments or things you want the reviewer to consider when looking at your submission. You don't need to be too detailed, as there will likely be a review done with you where you can explain what you've done.

