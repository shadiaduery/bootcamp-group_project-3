import pandas as pd
import json

df= pd.read_csv("../data/emission_population_coordinates.csv")

# print(df)

# print(df.City)
data2010=[]
data2011=[]
data2012=[]
data2013=[]
data2014=[]
data2015=[]
data2016=[]
data2017=[]


total_rows=len(df)
# print(total_rows)

for i in range(0,total_rows):
    case0={'City':df.loc[i]["City"],'State':df.loc[i]["State"], 'Population':df.loc[i]["population2010"],'Emission':df.loc[i]["emissions2010"]}
    data2010.append(case0)
    case1={'City':df.loc[i]["City"], 'State':df.loc[i]["State"],'Population':df.loc[i]["population2011"],'Emission':df.loc[i]["emissions2011"]}
    data2011.append(case1)
    case2={'City':df.loc[i]["City"], 'State':df.loc[i]["State"],'Population':df.loc[i]["population2012"],'Emission':df.loc[i]["emissions2012"]}
    data2012.append(case2)
    case3={'City':df.loc[i]["City"], 'State':df.loc[i]["State"],'Population':df.loc[i]["population2013"],'Emission':df.loc[i]["emissions2013"]}
    data2013.append(case3)
    case4={'City':df.loc[i]["City"], 'State':df.loc[i]["State"],'Population':df.loc[i]["population2014"],'Emission':df.loc[i]["emissions2014"]}
    data2014.append(case4)
    case5={'City':df.loc[i]["City"],'State':df.loc[i]["State"], 'Population':df.loc[i]["population2015"],'Emission':df.loc[i]["emissions2015"]}
    data2015.append(case5)
    case6={'City':df.loc[i]["City"],'State':df.loc[i]["State"], 'Population':df.loc[i]["population2016"],'Emission':df.loc[i]["emissions2016"]}
    data2016.append(case6)
    case7={'City':df.loc[i]["City"], 'State':df.loc[i]["State"],'Population':df.loc[i]["population2017"],'Emission':df.loc[i]["emissions2017"]}
    data2017.append(case7)


year=[2010,2011,2012,2013,2014,2015,2016,2017]
final_df=pd.DataFrame({"Year":year,
                "Values":[data2010,data2011,data2012,data2013,data2014,data2015,data2016,data2017]},
                index=year)
print(final_df)

# df.to_csv("../data/scatter_pop_emi.csv", encoding="utf-8", index=False)
result= final_df.to_json(orient="index")
parsed= json.loads(result)
data_json=json.dumps(parsed,indent=4)
print(data_json)
with open('emission_population.json', 'w') as json_file:
    json.dump(data_json, json_file)



    
