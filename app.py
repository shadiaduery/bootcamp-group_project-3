import numpy as np
from flask import render_template
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

@app.route("/emission")
def emission_pop():
    session = Session(engine)

    # Query all pizza data
    results = session.query(Counts.City_State,Counts.City,Counts.State,Counts.population2010,Counts.population2011,Counts.population2012,Counts.population2013,Counts.population2014,
    Counts.population2015,Counts.population2016,Counts.population2017,Counts.emissions2010,Counts.emissions2011,Counts.emissions2012,Counts.emissions2013,Counts.emissions2014,Counts.emissions2015,
    Counts.emissions2016,Counts.emissions2017 ).all()

    session.close()

    emission_population_list=[]

    for i in results:
        emission_pop_dic={}
        emission_pop_dic["City_State"]=i.City_State
        emission_pop_dic["City"]=i.City
        emission_pop_dic["State"]=i.State
        emission_pop_dic["Population2010"]=i.population2010
        emission_population_list.append(emission_pop_dic)

    return jsonify(emission_population_list)





