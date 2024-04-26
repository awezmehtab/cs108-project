import json
import scrapy.selector as Selector # Selector
from selenium.webdriver.common.by import By # By.CSS_SELECTOR is used to make a webElement using it's css
from selenium.webdriver.chrome.options import Options # to run in headless mode
from selenium import webdriver # driver
import time # to let the page lead

with open('output.json', 'r') as f:
    reviews = json.load(f)

with open('imdb.json', 'r') as f:
    movieData = json.load(f)

for movieReviewed in reviews:
    if not movieReviewed['RottenTomatoes']:
        directors = []
        for movie in movieData:
            if(movie['Title'] == movieReviewed['Title']):
                print(movie['Title'].strip())
                directors = json.loads(movie['Directors'].replace("\"", "\'"))
                break
        search_str = f'{movie["Title"]} {directors[0]}'.strip().replace(' ', '%20').replace(':', '%3A').replace(',', '%2C').replace("'", '%27')
        search_url = f'https://www.rottentomatoes.com/search?search={search_str}'
        print(search_url)