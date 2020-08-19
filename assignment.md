# Zesty.ai engineering test (back-end)

## Assignment

Your goal is to create a RESTful API in Python that can find and manipulate images and geographical data, using property data stored in a SQL database, and images stored in cloud storage.  The API should be packaged as a containerized service (Docker image).  A test property database and images are provided for you.

There are several different options for features you can implement in the API.  You can pick whichever ones you think you can do best.  The goal is to do as many as you can complete in **4 hours**. 

Note that some features are more difficult than others, and you will be evaluated on more than just the number of features completed.  Quality is preferred over quantity.  Design, organize, and comment your code as you would a typical production project.  Be prepared to explain any decisions you made.  

## Setup
### Development environment requirements

You will need to install [Docker](https://www.docker.com/products/docker-desktop) and [`docker-compose`](https://docs.docker.com/compose/install/) to run the example database.

Your code should be in Python 3.x.  If you want to run/test your project locally, you of course can, but ultimately, your API should be made available as a Docker image.

### Database startup
From the repo root folder, run `docker-compose up -d` to start the PostgreSQL database needed for this example.  The database server will be exposed on port **5555**.  If this port is not available on your computer, feel free to change the port in the `docker-compose.yml` file.

In the test database, there is a single table called `properties` (with 5 sample rows), where each row represents a property or address.  There are three geography* fields and one field with an image URL pointing to an image on [Google Cloud Storage](https://cloud.google.com/storage/).

* *If you are not familiar with [PostgreSQL](https://www.postgresql.org/) or [PostGIS](https://postgis.net/), you may need to read up beforehand.*

### Feature list
(Note:  Not all of these must be implemented - select the ones you think you can do in **4 hours**)

* **Display:** API endpoint to display an image by property ID.  Given a *propertyId* as input, find the image URL from the database, download it from Google Cloud Storage and return the binary image as output in a format suitable for browser display.
* **Find:** API endpoint to search properties within a geographical area.  Take a [GeoJSON](https://geojson.org/) object *geoJson* and a search radius *distance* (in meters) as inputs. Return all property IDs that are within *distance* meters of *geoJson*. Use the `geocode_geo` field of the `property` table for your query.
* **Display Plus:** Add an option to the first API endpoint (**Display**) to also overlay the parcel and/or buildings (`parcel_geo` and `buildings_geo` fields in the database) on the image.  You can optionally add parameters for the color of each overlay, or use a default for each.
* **Statistics:** API endpoint to calculate geographic data about all properties within a given distance from a reference property. Take *propertyId* and *distance* (in meters) as inputs. The API should return the following:
  * parcel area (meters squared)
  * buildings areas (array, meters squared) 
  * buildings distances to center (array, meters squared).  Distance to center is the distance from the building to the `geocode_geo` field in the property table
  * zone density (percentage).  Create a "zone" geography, which is a buffer of *distance* meters around the `geocode_geo` point.  Then, calculate the percentage of that zone geography which has buildings in it.
* **Freestyle:**  Based on the other features, you should have a feel for the kind of features this API implements.  If you have other cool ideas of things to add that aren't listed here, we'd love to see them.

## Submission instructions

Create a Docker image for your API and push it to a public image repository. Send instructions for how to run it.

ZIP all of your code and email it to us, or create a fork of this git repo and share.
 
Also, somewhere include a list of what features you implemented, or if you did the freestyle, describe the features you came up with.  Add any comments or things you want the reviewer to consider when looking at your submission.  You don't need to be too detailed, as there will likely be a review done with you where you can explain what you've done.
