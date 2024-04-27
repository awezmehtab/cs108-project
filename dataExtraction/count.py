import json

with open('imdb.json', 'r') as file:
    movies = json.load(file)

parameter = "Other_Ratings"

for movie in movies:
    movie[parameter] = json.loads(movie[parameter].replace("'", "\""))

print(min([len(movie[parameter][0]) for movie in movies]))