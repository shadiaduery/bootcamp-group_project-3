# bootcamp-group_project-3

## Population vs. Transportation Emissions

Group Team Members: Anna Rischitelli, Priya Arunachalam, Nataliia Sokolova, Vincent Durcan, and Shadia Duery

#### Question:
Does the population density of a city affect it's transportation CO2 emissions?

#### Hypothesis: 
A city with high population density would have a decrease in transportation emissions. 

#### Data Sources:
- Population data from the US Census
- Transportation emissions Distributed Archive Center for Biogeochemical Dynamics
- US land size city areas from Wikipedia

#### Project Description:

The city of Springfield is a fast-growing middle-sized city in the US. Currently is at a turning point; this year has reached a population size of 300k and is experiencing a high rate of migration. The Urban Planning and Sustainable Development Office (UPSDO) is in charge of crafting a 10-year plan to guide the city's growth path between increased density or urban sprawl. Springfield is a city that cares about air pollution and its contribution to global carbon emissions and bases its decisions informed by data analysis. The city has requested its data analytics team to determine if increasing population density increases or reduces transportation carbon emissions.

##### How to run the database
We used a SQLite database that was cleaned, built, and designed in Jupyter notebook.

##### How to run the included code to insert data into the database
The data was transferred from CSV to SQL (sqlite) database, then a json object was created in Flask application.

##### How to run the code to view the visualizations
From VSCode, when the project folder is open, navigate in the terminal window to the project folder. For example, a code line would read "cd desktop/bootcamp-group_project-3". Once inside the folder, the command "python app.py" will create a server and allow you to follow the link to the active webpage.

The visualization on the main html are interactive on load. There is another link to a page "Data" in the top nav bar that will take a viewer to our database json output, if interested.

