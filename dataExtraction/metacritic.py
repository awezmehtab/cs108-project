import json
from scrapy.selector import Selector
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time

MAX_WAIT_UNTIL_BUTTON_LOADS = 3

def click(driver, webElement):
    global MAX_WAIT_UNTIL_BUTTON_LOADS
    try:
        wait = WebDriverWait(driver, MAX_WAIT_UNTIL_BUTTON_LOADS)
        button = wait.until(EC.element_to_be_clickable(webElement))
        button.click()
    except:
        try:
            button = webElement
            driver.execute_script("arguments[0].scrollIntoView(false);", button)  # Scroll to the element
            button.click()
        except Exception as e:
            print(e, file=open('errors.txt', 'a'))

with open('output.json') as f:
    movieReviews = json.load(f)

with open('imdb.json') as f:
    movieData = json.load(f)

# chrome driver
driver = webdriver.Chrome()

for movie in movieReviews:
    if movie["Metacritic"] == []:
        directors = []
        casts = []
        for movieInfo in movieData:
            if movieInfo["Title"] == movie["Title"]:
                directors = movieInfo["Directors"]
                casts = movieInfo["Casts"]
                break

        search_str = f'{movie["Title"]}'.lower().strip().replace(' ', '%20').replace('.', "").replace(':', '').replace(',', '').replace("'", '')
        movie_str = f'{movie["Title"]}'.lower().strip().replace(' ', '-').replace('.', "").replace(':', '').replace(',', '').replace("'", '')
        search_url = f'https://www.metacritic.com/movie/{search_str}/'
        movie_url = f'https://www.metacritic.com/movie/{movie_str}/'

        driver.get(movie_url)

        try:
            # get webelement for clicking "positive reviews"
            positive_reviews = driver.find_elements(By.CSS_SELECTOR, 'div[data-cy=critic-reviews] div div.c-globalHeader ul li.c-globalHeader_menu_item.g-inner-spacing-top-medium.g-inner-spacing-bottom-xsmall.g-color-gray50')[1]
            click(driver, positive_reviews)
            print("clicked successfully, now waiting")
            time.sleep(5)
        except Exception as e:
            print(f'Couldn\'t find positive reviews button for {movie["Title"]}')
            print(e)
