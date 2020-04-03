from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# TODO: Get url components from config
DB_URL = 'postgresql+psycopg2://{user}:{pw}@{host}:{port}/{db}'.format(user='postgres',pw='engineTest888',host='localhost', port='5555',db='zesty')

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # silence the deprecation warning

db = SQLAlchemy(app)


@app.route('/')
def landing():
	return ""

@app.route('/display/<string:property_id>', methods=['GET'])
def display(property_id):
	"""
	Display an image by property ID.
	"""
	# Part 1: Given a propertyId as input, find the image URL from the database,
	# download it from Google Cloud Storage and return the binary image
	# as output in a format suitable for browser display.

	# Part 2: Add an option to also overlay the parcel and/or buildings
	# (parcel_geo and buildings_geo fields in the database) on the image.
	# You can optionally add parameters for the color of each overlay, or use a default for each.

	return str(property_id)

@app.route('/find', methods=['GET'])
def find():
	"""
	Search properties within a geographical area.
	"""
	# Take a GeoJSON object geoJson and a search radius distance (in meters) as inputs.
	# Return all property IDs that are within distance meters of geoJson.
	# Use the geocode_geo field of the property table for your query.
	pass

@app.route('/statistics/<string:property_id>/<int:distance>', methods=['GET'])
def statistics(property_id, distance):
	"""
	Calculate geographic data about all properties within a given distance from a reference property.

	Return the following statistics:
		- parcel area (meters squared)
		- buildings areas (array, meters squared)
		- buildings distances to center (array, meters squared).
		  Distance to center is the distance from the building to
		  the geocode_geo field in the property table
		- zone density (percentage).
		  Create a "zone" geography, which is a buffer of distance meters
		  around the geocode_geo point. Then, calculate the percentage of
		  that zone geography which has buildings in it.
	"""
	# take propertyId and distance (in meters) as inputs.
	pass


if __name__ == '__main__':
	app.run(debug=True)
