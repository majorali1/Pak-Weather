
#lessons to web development using flask framework but the point is not the frame i am using its the concepts the pattern of web development
"""
1. the backend is simply the ENDPOINT of web it means alot different then i thought

let me explain now remember later,

endpoint = the end no further so backends job is to wait and i used to thing backend needs to do something first but nooooo
its all from the front end specifically javascripts fetch method. i know fetch means taking but forget that cause this is web development
fetch means to send and receive so one example is when a user sends a like the front javascript give the endpoint url a message with fetch
to save and update and then return true as a result and backend obliges and frontends fetch takes result and give to user so remember backend
as a merchent like a merchant unless you pay request no response and 



also learn things to make development easier


JSon
javascript
design and structure 
calm down 
no chatgpt bozo check docs sometimes ok if REALLY stuck then chatgpt no code copy crtl c , v



"""
from flask import Flask,jsonify, render_template,request
from dotenv import load_dotenv
from flask_cors import CORS
import os
import requests



app = Flask(__name__)
CORS(app, resources={r"/*":{"origins":""}})
load_dotenv()

locationurl = os.getenv('LOCATIONSEARCH')
my_key = os.getenv('my_api_key')
weatherurl = os.getenv('WEATHERURL')

@app.route("/")
def home():
    return render_template('home.html')

@app.route('/location', methods=['POST'])
def get_weather():
    data = request.get_json()
    location = data.get('location')
    
    if not location:
        return jsonify({"error": "error"}),404


    location_response = requests.get(f"{locationurl}?key={my_key}&q={location}&format=json")
    if location_response.status_code != 200:
        return jsonify({'error':'location search was invalid'}),404
    locationdata = location_response.json()

    latitude = locationdata[0]['lat']
    longitude = locationdata[0]['lon']

    location_to_weather = requests.get(f"{weatherurl}?latitude={latitude}&longitude={longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,wind_speed_10m,wind_direction_10m")
    location_to_weather.raise_for_status()
    weather_data = location_to_weather.json()


    feel_temperature = weather_data['current']['apparent_temperature']
    is_day = weather_data['current']['is_day']
    rain = weather_data['current']['rain']
    humidity = weather_data['current']['relative_humidity_2m']
    temperature = weather_data['current']['temperature_2m']
    wind_direction = weather_data['current']['wind_direction_10m']
    wind_speed = weather_data['current']['wind_speed_10m']



    formatted_weather_data = {"feel_temperature": feel_temperature,
                              "humidity" : humidity,
                              "is_day": is_day,
                              "rain": rain,
                              "temperature":temperature,
                              "wind_direction":wind_direction,
                              "wind_speed":wind_speed,
                              "locationname" : location
                              }



    return jsonify(formatted_weather_data)




if __name__== "__main__":
    app.run(debug=True)