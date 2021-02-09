import numpy as np
import os
import pandas as pd
from flask import render_template
from flask import Flask, render_template,json,current_app as app
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/emission_population.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table "emission_population"
Counts = Base.classes.emission_population
print(Counts)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

@app.route("/scatter")
def scatter_pop():

    # df= pd.read_csv("data/scatter_pop_emi.csv", encoding="utf-8")
    # SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    # filename= os.path.join(app.static_folder,'static','test_json.json')
    # json_url= os.path.join(SITE_ROOT, "static", "test_json.json")
    with open("static/emission_population.json") as f:
        data=json.load(f)
    # data=json.load(open(json_url))
    # return render_template(json.load(open(json_url)))
    return data

@app.route("/emission")
def emission_pop():
    session = Session(engine)

    # Query all pizza data
    results = session.query(Counts.City_State,Counts.City,Counts.State,Counts.population2010,Counts.population2011,Counts.population2012,Counts.population2013,Counts.population2014,
    Counts.population2015,Counts.population2016,Counts.population2017,Counts.emissions2010,Counts.emissions2011,Counts.emissions2012,Counts.emissions2013,Counts.emissions2014,Counts.emissions2015,
    Counts.emissions2016,Counts.emissions2017,Counts.lat,Counts.lng).all()

    

    emission_population_list=[]

    for i in results:
        emission_pop_dic={}
        emission_pop_dic["City_State"]=i.City_State
        emission_pop_dic["City"]=i.City
        emission_pop_dic["State"]=i.State
        emission_pop_dic["Population2010"]=i.population2010
        emission_pop_dic["Population2011"]=i.population2011
        emission_pop_dic["Population2012"]=i.population2012
        emission_pop_dic["Population2013"]=i.population2013
        emission_pop_dic["Population2014"]=i.population2014
        emission_pop_dic["Population2015"]=i.population2015
        emission_pop_dic["Population2016"]=i.population2016
        emission_pop_dic["Population2017"]=i.population2017
        emission_pop_dic["emissions2010"]=i.emissions2010
        emission_pop_dic["emissions2011"]=i.emissions2011
        emission_pop_dic["emissions2012"]=i.emissions2012
        emission_pop_dic["emissions2013"]=i.emissions2013
        emission_pop_dic["emissions2014"]=i.emissions2014
        emission_pop_dic["emissions2015"]=i.emissions2015
        emission_pop_dic["emissions2016"]=i.emissions2016
        emission_pop_dic["emissions2017"]=i.emissions2017
        emission_pop_dic["Lat"]=str(i.lat)
        emission_pop_dic["Lng"]=str(i.lng)
        emission_population_list.append(emission_pop_dic)

    session.close()

    return jsonify(emission_population_list)

if __name__=="__main__":
    app.run(debug=True)



