import json

# Open the JSON file
with open('imdb.json', 'r') as file:
    # Load the JSON data
    movies = json.load(file)

genres = []

for movie in movies:
    genre = json.loads(movie['Genres'].replace("'", "\""))
    for g in genre:
        if g not in genres:
            genres.append(g)

print(genres)