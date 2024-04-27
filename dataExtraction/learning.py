import json
from selenium import webdriver
from scrapy.selector import Selector
from selenium.webdriver.common.by import By

with open('imdb.json', 'r') as file:
    movies = json.load(file)

raters = set()

for movie in movies:
    movie["Other_Ratings"] = json.loads(movie["Other_Ratings"].replace("'", "\""))
    for x in movie["Other_Ratings"][1]:
        raters.add(x)

print(raters)
images = dict()

driver = webdriver.Chrome()

for rater in raters:
    search_url = f'https://www.google.com/search?q={rater}'
    driver.get(search_url)
    try:
        img_webElement = driver.find_elements(By.CSS_SELECTOR, 'img.XNo5Ab')[0]
        img_url = img_webElement.get_attribute('src')
        images[rater] = img_url
    except Exception as e:
        print(f'Couldn\'t find image for {rater}')

driver.quit()
json.dump(images , open('images.json', 'w'))
