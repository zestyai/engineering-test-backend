from models import Property
from shared_resources import app

from flask import send_file
import io
import requests


@app.route('/display/<string:property_id>', methods=['GET'])
def display(property_id):
    """
    Display an image by property ID.

    Args: property_id (string)

    Returns: jpeg file
    """
    prop = Property.query.get(property_id)
    image_url = prop.image_url
    url_resp = requests.get(image_url, stream=True)

    return send_file(
        io.BytesIO(url_resp.content),
        mimetype='image/jpeg',
        as_attachment=True,
        attachment_filename='%s.jpg' % property_id)

@app.route('/find', methods=['GET'])
def find():
    """
    Search properties within a geographical area.
    """
    return ''

@app.route('/statistics/<string:property_id>/<int:distance>', methods=['GET'])
def statistics(property_id, distance):
    """
    Calculate geographic data about all properties within a given distance
    (in meters) from a reference property.

    Returns the following statistics:
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
    return ''


if __name__ == '__main__':
    app.run(debug=True)
