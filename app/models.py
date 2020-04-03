import flask_sqlalchemy
from routes import db
from geoalchemy2 import Geography

class Property(db.Model):
	__tablename__ = 'properties'

	id = db.Column(db.String(100), primary_key=True)
	geocode_geo = db.Column(Geography(geometry_type='POINT', srid=4326))
	parcel_geo = db.Column(Geography(geometry_type='POINT', srid=4326))
	building_geo = db.Column(Geography(geometry_type='POINT', srid=4326))
	image_bounds = db.Column(db.Float())
	image_url = db.Column(db.Text())
