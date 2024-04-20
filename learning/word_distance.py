import json
from Levenshtein import distance as lev_distance

with open('imdb.json', 'r') as file:
    movies = json.load(file)

movieNames = [x["Title"] for x in movies]

def word_distance(a, b):
    if(len(a)==0):
        return len(b)
    elif(len(b)==0):
        return len(a)
    elif(a[0]==b[0]):
        return word_distance(a[1:], b[1:])
    else:
        return 1 + min([word_distance(a[1:],b), word_distance(a,b[1:]), word_distance(a[1:],b[1:])])
    
inputWord = input("Movie: ")
distance = {}
for movie in movieNames:
    distance[movie] = lev_distance(movie, inputWord)

sorted_distance = sorted(distance.items(), key=lambda x: int(x[1]))
print(sorted_distance[:5])