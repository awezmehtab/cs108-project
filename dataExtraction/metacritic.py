import json

with open('output.json') as f:
    movieReviews = json.load(f)

unratedMovies = []
for movie in movieReviews:
    if movie["RottenTomatoes"] == []:
        unratedMovies.append(movie["Title"])

print(unratedMovies)