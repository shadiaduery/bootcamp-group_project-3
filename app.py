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
engine = create_engine("sqlite:///data/pizza.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Counts = Base.classes.pizza_counts

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


@app.route("/pizzas")
def passengers():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all pizza data
    results = session.query(Counts.month, Counts.pizza).all()

    session.close()

    # Create a dictionary from row of data and append to a list of dictionaries
    pizzas_eaten = []
    for month, pizza in results:
        pizza_dict = {}
        pizza_dict["month"] = month
        pizza_dict["pizza"] = str(pizza)
        pizzas_eaten.append(pizza_dict)

    # turn the list of dicts into an array of objects
    return jsonify(pizzas_eaten)


if __name__ == '__main__':
    app.run(debug=True)
