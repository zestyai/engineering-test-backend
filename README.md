# Zesty.ai Back-End Engineering Test

- [Background](#background)
- [Assignment](#assignment)
- [Feature List](#feature-list)
- [Setup](#setup)
- [API Specification](#api-specification)
- [Submission Instructions](#submission-instructions)
- [FAQ](#faq)

## Background
At Zesty.ai, Back-end engineers:
- design high-performance, reliable, cloud-native distributed systems
- work with many kinds of data and imagery, and
- build and extend Zesty.ai’s platform, services, and internal tools. 

This test serves as an opportunity to demonstrate comfort and skills with developing back-end services 
as well as addressing difficult unknown problems.
The content of this test is designed to cover challenges that are similar to ones 
one would encounter working at zesty.ai.
This test should be challenging, but also fun. It's meant to also help candidates evaluate if they would enjoy
the kind of problems one might face working on our stack.

## Assignment
The goal is to create a RESTful API (see [API Specification](#api-specification)) written in 
Python that can locate and manipulate images and geographical data. You'll use property 
data stored in an SQL database and images stored in cloud storage (See [Feature List](#feature-list)). 
The API should be packaged as a containerized service. A test property database and images are provided 
for you (see [Setup](#setup)).

Note that some features are more difficult than others, and you will be evaluated on more than 
just the number of features completed. Quality is preferred over quantity. Design, organize, and 
comment your code as you would a typical production project. Be prepared to explain any decisions you made.

## Feature list
* **Display:** API endpoint to display an image by property ID. Given a *propertyId* as input, 
  find the image URL from the database, download it from Google Cloud Storage and return a JPEG image. 
  
* **Find:** API endpoint to search properties within a geographical area. 
  Take a [GeoJSON](https://geojson.org/) object *geoJson* and a search radius *distance* 
  (in meters) as inputs. Return all property IDs that are within *distance* meters of *geoJson*. 
  Use the `geocode_geo` field of the `property` table for the query. 
  
* **Display Plus:** An alternative version of the first API endpoint (**Display**) to also 
  overlay the geocode (as a marker - such as a small circle or triangle), parcel, 
  and/or building (`geocode_geo`, `parcel_geo`, and `building_geo` fields in the database, respectively)
  on the image. Optionally, add parameters for the color of each overlay, or use a default for each. 
  
* **Statistics:** API endpoint to calculate geographic data about all properties within a given 
  distance from a reference property. Take *propertyId* and *distance* (in meters) as inputs. 
  The API should return the following:
  * parcel area (meters squared)
  * building area (meters squared)
  * building distance to center (meters). Distance to center is the distance from the 
    building to the `geocode_geo` field in the property table
  * zone density (percentage). Create a "zone" geography, which is a buffer of *distance* 
    meters around the `geocode_geo` point. Then, calculate the percentage of that zone geography 
    which has buildings in it. 
  
* **Freestyle:**  Based on the other features, you should have a feel for the kind  
  of features this API implements. If you have other cool ideas of things to add that aren't listed here, 
  we'd love to see them.

## Setup

### Development environment requirements

Install docker to run the example database.

The deliverable should be in Python 3.x and be made available as a Docker image.

### Database startup
From the repo root folder, run `docker compose up -d` to start the PostgreSQL database needed 
for this example. The database server will be exposed on port **5555**. If this port is not available, 
feel free to change the port in the `docker-compose.yml` file.

In the test database, there is a single table called `properties` (with 5 sample rows), where each row 
represents a property or address. There are three *geography* fields and one field with an image URL 
pointing to an image on [Google Cloud Storage](https://cloud.google.com/storage/).

*If you are not familiar with [PostgreSQL](https://www.postgresql.org/) or [PostGIS](https://postgis.net/), 
you may need to read up beforehand.*

## API Specification
The API must adhere to the following API specification.

Note that this includes the specification for all endpoints. 
Ignore the ones for features that are not implemented in the submission.

***

### GET /display/:id

*Fetches and displays property image (as JPEG) by ID* 

`example: GET localhost:1235/display/f853874999424ad2a5b6f37af6b56610`

##### Request Parameters
- `id` | description: Property ID | type: string | required: true 

##### Response
JPEG image

***

### POST /find
*Finds properties within X meters away from provided geojson point.*

`example: POST localhost:1235/find`

##### Request Body
JSON object with the following properties

- `location` | geojson object representing point to search from | required: true | validation: geojson | type: object
- `distance` | distance, in meters, to search from `location` | required: true | validation: greater than 0, less than some reasonable number | type: float

```
example:

{
  "location": {
    "type": "Point",
    "coordinates": [-80.0782213, 26.8849731]
  },
  "distance": 500
}
```

##### Response
JSON array with objects containing at least the following fields (you may include more if you think they would be helpful)
- `property_id` | ID of property object
- `distance_m` | actual distance from input `distance`

***

### GET /display/:id/overlays(?parcel_color&building_color)
*Fetches and displays property image (as JPEG) by ID, with feature overlays drawn on image*

`example: GET localhost:1235/display/f853874999424ad2a5b6f37af6b56610/overlays?building=green&parcel=orange`

##### Request Parameters
- `id` | description: Property ID | type: string | required: true
- `geocode_color` | description: color to use for geocode overlay. empty to use default color (default should be different from other feature defaults) | type: string | required: false | validation: enum (ex. "red", "green", "orange") or hex string (ex: "FF0040")
- `parcel_color` | description: color to use for parcel overlay. empty to use default color (default should be different from other feature defaults) | type: string | required: false | validation: enum (ex. "red", "green", "orange") or hex string (ex: "FF0040")
- `building_color` | description: color building overlay. empty to use default color (default should be different from other feature defaults) | type: string | required: false | validation: enum() ex. "red", "green", "orange"

##### Response
JPEG image

***

### GET /statistics/:id?zone_size_m
*Returns various statistics for parcels and buildings found X meters around the requested property*

`example: GET localhost:1235/statistics/f853874999424ad2a5b6f37af6b56610?zone_size_m=10`

##### Request Parameters
- `id` | description: Property ID | type: string | required: true | validation: length greater than 0
- `zone_size_m` | description: Buffer distance used for calculating zones | type: integer | required: true | validation: greater than 0

##### Response
JSON object including following fields
- `parcel_area_sqm` | description: total area of the property's parcel, in square meters | type: float
- `building_area_sqm` | description: total area of building, in square meters | type: float
- `building_distance_m` | description: distance from the centroid of the property, to the centroid of building, in meters | type: float
- `zone_density` | description: density (%) of building's area to zone area (the zone is the `geocode_geo` with a buffer/circle with the radius of `zone_size_m` input) |
 type: float

***

## Submission instructions

Send us your completed application's code by email, or create and give us access to a new private GitHub repository.

Include instructions on how to run your app, and a list of what features you implemented. Add any comments or things you
want the reviewer to consider when looking at your submission. You don't need to be too detailed, as there will likely
be a review done with you where you can explain what you've done.

## Scoring

Your submission will be scored out of 100 using the following scorecard:

|      **Feature**      | **Max score** |
|:---------------------:|:-------------:|
|  List all properties  |      15       |
|  Property detail page |      15       |
| Search by coordinates |      20       |
|     Image overlays    |      20       |
|    Containerization   |      10       |
|         Extras        |      20       |
|       **Total**       |    **100**    |

Note that the points attributed to each feature are not all-or-nothing. Partial points will be attributed for incomplete
features. If you can't complete a feature, you're still encouraged to submit code that shows signs of your progress.
It's possible to get a passing grade without implementing all features, as quality is preferred over quantity. Extra
points will be given for going above expectations quality-wise.

## FAQ

#### How long to spend on this test?
There is intentionally no time limit set on this test. Spend as much time as you feel
you need to create a deliverable you are proud of, but like in a real project make sure to balance value and effort.

#### I don't understand something or I am stuck. Can I ask questions?
Yes. Knowing when to ask for help is a skill that is equally important as being able to solve things yourself.

#### I have some cool personal projects I have done. Can I submit that instead of the test?
Sure. As long as the projects adequately demonstrate your technical prowess. We will evaluate such
submissions and let you know if we still need anything further.

#### I would like to know more about zesty before committing to working on such a test
We think Zesty.ai has a lot to offer. We do exciting work and use cutting-edge technologies.
We would be happy to schedule time to talk to one of our engineers to give you more details and let you ask
questions before you start the test.
