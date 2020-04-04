
## Getting Started

To run locally, first clone or fork this repo. Ideally you should set up a virtual environment with
Python 3 to run this in. You can find instructions for setting that up here: https://docs.python.org/3/tutorial/venv.html


### Prerequisites

The required packages are listed in requirements.txt. You can install them by running the following command (make sure your virtual environment is activate first if you are using one):

```
pip install -r requirements.txt
```

You will also need to have Docker installed and run `docker-compose up` to instantiate and populate the database.

### What this code does
This is a simple flask app that can retrieve an image of a property. There is one route (`/display/<property_id>`) and one model representing the `properties` table.

I've stubbed out a few other routes, but not implemented them.


### What is left to do
* Add an option to the existing endpoint to also overlay the parcel and/or buildings on the image.
* Implement the `'/find` endpoint to search properties within a geographical area.
* Implement the `/statistics/<property_id>/<distance>` route
* Further expansions
* Create a test suite

### How to run the app

The app can be run with the following terminal command:
```
python routes.py
```
When the app is running you can visit `http://127.0.0.1:5000/display/<property_id>` in your browser (you will have to supply a property id). When you visit this route it will download the image. This could be changed to directly display the image, but the instructions were to "return the image in a format suitable for display in a browser", so this returns a JPEG.
