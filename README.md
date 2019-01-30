# zesty.ai engineering test

## setup
### dev requirements

You will need to install docker and docker-compose to run database for the example.

Your code should be in python 3.x.  If you want to run/test your project locally, you may need to install this.  But ultimately, your release should be in docker.  So it it is not required.

### database startup
From the repo root folder, run `docker-compose up -d` to start the postgres database need for this example.  The database server will be exposed on port 5559.  If this is not available on your computer, feel free to change the port in the docker-compose.yml file.

In the test database, there is one table called `properties` (with 5 sample rows), where each row represents a property or address.  There are three geography* fields and one field with an image url on google cloud storage.

*If you are not familiar with PostGIS, you may need to read up beforehand.   

## assignment

Your goal is to create an API in python that can find and manipulate images and/or geographical data.

There are several different options for what exact features you want to implement in the API.  You can pick whichever ones you think you can do best.  The goal is to do as many as you can complete in **2 hours**. 

Note, that some features are more difficult than others, and your "score" is not just a product of number of features completed.  Quality is preferred over quantity.  Comment your code well and be prepared to defend any decisions you made.  

### feature list
(not all of these must be implemented - select the ones you think you can do in **2 hours**)

* API endpoint to display image by id.  Take an id as input, find the image url from the database, download from google cloud storage and return binary image as output
* API endpoint to search properties by geographical area.  Take geojson, and distance (in meters) as inputs. Return all property ids that have are with in the input distance of the input geojson. Use the `geocode_geo` field of the property table for your query.
* Add option to first API endpoint (display image by id) to also overlay the parcel and/or buildings (`parcel_geo` and `buildings_geo` fields in the database) on the image.  You can also optionally add parameters for color of each overlay, or just use a default for each.
* API endpoint to calculate geographic data. Take an id as input and "zone size" (in meters). The API should return the following:
  * parcel area (meters squared)
  * buildings areas (array, meters squared) 
  * buildings distances to center (array, meters squared).  distance to center is the distance from the building to `geocode_geo` field
  * zone density (percentage).  Create a zone shape, which is a buffer that is the "zone size" (input) meters around the `geocode_geo` point.  Then calculate the percentage of that zone shape that has any buildings in it.
* Freestyle.  Based on the other features, you should be getting a feel for the kind of things this API is doing.  If you have other cool ideas of things to add that aren't listed here, that would also be accepted. 

## submission instructions

Create a docker file for your API and push it to a public image repository.  Send instructions for how to run it.

Zip all of your code and email it to us, or create a fork of this git repo and share.
 
Also, somewhere include a list of what features you implemented, or if you did the freestyle, describe the features you came up with.  Add any comments or things you want the reviewer to consider when looking at your submission.  You don't need to be too detailed, as there will likely be a review done with you, where you can explain what you've done.