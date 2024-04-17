import json

with open('imdb.json', 'r') as file:
    movies = json.load(file)

movieEntered = input("Enter movie name: ")
movieEntered = movieEntered.lower()

genres = []
recommended_movies = []

for movie in movies:
    if movie['Title'].lower() == movieEntered:
        genres = json.loads(movie['Genres'].replace("'", "\""))

for movie in movies:
    movie_genres = json.loads(movie['Genres'].replace("'", "\""))
    if any(element in movie_genres for element in genres):
        recommended_movies.append([movie['Title'], len(set(genres) & set(movie_genres))])

best_movies = []
max_common = max([movie[1] for movie in recommended_movies])

for movie in recommended_movies:
    if movie[1] == max_common:
        best_movies.append(movie[0])

print(best_movies, max_common)