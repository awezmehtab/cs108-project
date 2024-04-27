import numpy as np # for NaN values
from scrapy.selector import Selector # selector
from selenium import webdriver # driver
from selenium.webdriver.common.by import By # By.CSS_SELECTOR is used to make a webElement using it's css
from selenium.webdriver.chrome.options import Options # to run in headless mode
import time # to let the page lead
import json # to load data from imdb.json
import sys # let's take some command line arguments

options = Options()
options.add_argument('--headless')

def getByCSS(driver, cssWeb, cssSel):
    try:
        element = driver.find_element(By.CSS_SELECTOR, cssWeb)
        sel = Selector(text=element.get_attribute('innerHTML'))
        return sel.css(cssSel).get()
    except Exception as e:
        print(e, file=open('errors.txt', 'a'))
        return None

# Load all the movie data from imdb.json
with open('imdb.json', 'r') as f:
    movieData = json.load(f)

# initializing the array which we want our final data to be in
movieReviews = [{"Title": movie['Title'], "Metacritic": np.NaN, "RottenTomatoes": []} for movie in movieData]

driver = webdriver.Chrome()
i=1
for movie in movieReviews:
    try:
        r_string = movie["Title"].strip().lower().replace(" ", "_").replace(",", "").replace(":", "").replace("'","")
        url_r = f'https://www.rottentomatoes.com/m/{r_string}/reviews?type=top_critics'

        driver.get(url_r)
        movie["RottenTomatoes"] = []

        reviews = driver.find_elements(By.CSS_SELECTOR, 'div.review-row')
        print("mil gaye itne reviews: ", len(reviews))
        for review in reviews:
            reviewSel = Selector(text=review.get_attribute('innerHTML'))
            personName = reviewSel.css('a.display-name::text').get()
            personLink = reviewSel.css('a.display-name::attr(href)').get()
            reviewText = reviewSel.css('p.review-text::text').get()
            movie["RottenTomatoes"].append([personName.strip(), f'https://rottentomatoes.com/{personLink.strip()}', reviewText])

    except Exception as e:
        print("andar galti hui", e, file=open('errors.txt', 'w'))  

driver.quit()
with open('output.json', 'w') as f:
    json.dump(movieReviews, f)
