import json
from scrapy.selector import Selector # Selector
from selenium.webdriver.common.by import By # By.CSS_SELECTOR is used to make a webElement using it's css
from selenium.webdriver.support.ui import WebDriverWait # to wait until the button loads
from selenium.webdriver.support import expected_conditions as EC # to wait until the button loads
from selenium.webdriver.chrome.options import Options # to run in headless mode
from selenium import webdriver # driver
import time # to let the page lead

with open('output.json', 'r') as f:
    reviews = json.load(f)

with open('imdb.json', 'r') as f:
    movieData = json.load(f)

# Clearing the contents of errors.txt
with open('errors.txt', 'w') as f:
    f.write('')

driver = webdriver.Chrome()
MAX_WAIT_UNTIL_BUTTON_LOADS = 3

# tries to click a webElement either directly or by scrolling
def click(driver, webElement):
    global MAX_WAIT_UNTIL_BUTTON_LOADS
    try:
        # we'll create a WebDriverWait() class instance which would let us wait until the button loads
        wait = WebDriverWait(driver, MAX_WAIT_UNTIL_BUTTON_LOADS)
        button = wait.until(EC.element_to_be_clickable(webElement))
        button.click()
        return
    except:
        try:
            # let's try to scroll and check
            button = webElement
            driver.execute_script("arguments[0].scrollIntoView(false);", button)
            button.click()
        except Exception as e:
            print(e, file=open('errors.txt', 'a'))
        return

for movieReviewed in reviews:
    if not movieReviewed['RottenTomatoes']:
        directors = []
        for movie in movieData:
            if(movie['Title'] == movieReviewed['Title']):
                try:
                    import ast
                    directors = ast.literal_eval(movie['Directors'])
                    casts = ast.literal_eval(movie['Casts'])
                    break
                except Exception as e:
                    print(movie['Directors'], type(movie['Directors']))
                    print(e)
                break
        directors_str = " ".join(directors)
        casts_str = " ".join(casts)
        search_str = f'{movie["Title"]} {directors_str} {casts_str}'.strip().replace(' ', '%20').replace(':', '%3A').replace(',', '%2C').replace("'", '%27')
        search_url = f'https://www.rottentomatoes.com/search?search={search_str}'

        try:
            # let's use driver to get info now
            driver.get(search_url)

            # list of webelements which contain the clickable movie name (link)
            import re
            searchedMovie = driver.find_elements(By.CSS_SELECTOR, 'a[data-qa="info-name"]')[1] if re.match("^Star", movieReviewed['Title']) else driver.find_elements(By.CSS_SELECTOR, 'a[data-qa="info-name"]')[0]

            # let's click it using our click() function
            click(driver, searchedMovie)

            # so we're into the MOVIE INFORMATION PAGE now

            # our task is to click the critcs reviews link, we'll try to get the corresponding WebElement first
            reviewsButton = driver.find_element(By.CSS_SELECTOR, 'div#critics-consensus a')
            click(driver, reviewsButton)

            topCriticsButton = driver.find_element(By.CSS_SELECTOR, 'a.tabs__link.js-tab-link[data-type="top-critics"]')
            click(driver, topCriticsButton)

            movieReviewed["RottenTomatoes"] = []

            reviewsWebElements = driver.find_elements(By.CSS_SELECTOR, 'div.review-row')
            print(f'{movieReviewed["Title"]} ke itne reviews:', len(reviews))
            for review in reviewsWebElements:
                reviewSel = Selector(text=review.get_attribute('innerHTML'))
                personName = reviewSel.css('a.display-name::text').get()
                personLink = reviewSel.css('a.display-name::attr(href)').get()
                reviewText = reviewSel.css('p.review-text::text').get()
                try:
                    movieReviewed["RottenTomatoes"].append([personName.strip(), f'https://rottentomatoes.com/{personLink.strip()}', reviewText])
                except Exception as e:
                    movieReviewed["RottenTomatoes"].append(["", "", reviewText])
                    print(e)
            
                with open('output.json', 'w') as f:
                    json.dump(reviews, f)

        except Exception as e:
            print(f"An error occurred: {e}")
            print(e, file=open('errors.txt', 'a'))