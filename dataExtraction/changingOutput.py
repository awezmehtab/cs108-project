import json

with open('output.json', 'r') as f:
    reviews = json.load(f)

notReviewed = []
for review in reviews:
    if not review['RottenTomatoes']:
        notReviewed.append(review['Title'])

print(notReviewed)