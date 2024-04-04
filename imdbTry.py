import numpy as np
import pandas as pd
from scrapy.selector import Selector
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from tqdm import tqdm
import warnings

TIMEOUT = 2
driver = webdriver.Chrome()
url = 'https://www.imdb.com/chart/top/'
time.sleep(TIMEOUT)
driver.get(url)
time.sleep(TIMEOUT)
print(driver.title)
time.sleep(TIMEOUT)
body = driver.find_element(By.CSS_SELECTOR, 'body')

sel = Selector(text = driver.page_source)

movies = driver.find_elements(By.CSS_SELECTOR, 'li.ipc-metadata-list-summary-item')

titles = []
images = []
yearReleased = []
ageRatings = []
durations = []
genres = []
ratings = []
plots = []
directors = []
casts = []
error_url_list = []
error_msg_list = []

noMovies = 5
i = 1
WAITING_TIME = 2

for movie in movies:
    if i > noMovies:
        break
    i += 1
    try:
        sel2 = Selector(text = movie.get_attribute('innerHTML'))
        # from bs4 import BeautifulSoup
        # print(BeautifulSoup(movie.get_attribute('innerHTML'), 'html.parser').prettify())
        
        try:
            wait = WebDriverWait(driver, WAITING_TIME)
            button = wait.until(EC.element_to_be_clickable(movie.find_element(By.CSS_SELECTOR, 'button.ipc-icon-button.cli-info-icon')))
            button.click()
        except Exception:
            try:
                button = movie.find_element(By.CSS_SELECTOR, 'button.ipc-icon-button.cli-info-icon')
                button.location_once_scrolled_into_view
                button.click()
            except Exception as e:
                error_url_list.append(url)
                error_msg_list.append(e)
                continue

        dialog = driver.find_element(By.CSS_SELECTOR, 'div.ipc-promptable-base__focus-lock')
        # print("dialog is made")
        sel3 = Selector(text = dialog.get_attribute('innerHTML'))
        # print("sel3 is made")
        try:
            img_src = sel3.css('div.ipc-media img::attr(src)').get()
            images.append(img_src)
        except:
            images.append(np.NaN)
        
        try:
            title = sel3.css('h3.ipc-title__text.prompt-title-text::text').get()
            titles.append(title)
        except:
            titles.append(np.NaN)
        try:
            year_duration_age = sel3.css('ul[data-testid="btp_ml"] li::text').getall()
            yearReleased.append(year_duration_age[0])
            durations.append(year_duration_age[1])
            ageRatings.append(year_duration_age[2])
        except: 
            yearReleased.append(np.NaN)
            durations.append(np.NaN)
            ageRatings.append(np.NaN)

        try:
            wait = WebDriverWait(driver, WAITING_TIME)
            close_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'div.ipc-promptable-base__close button')))
            close_button.click()
        except Exception:
            try:
                close_button = dialog.find_element(By.CSS_SELECTOR, 'div.ipc-promptable-base__close button')
                close_button.location_once_scrolled_into_view
                close_button.click()
            except Exception as e:
                error_url_list.append(url)
                error_msg_list.append(e)
                continue
    except Exception as e:
        error_url_list.append(url)
        error_msg_list.append(e)

review_df = pd.DataFrame({
    'Title':titles,
    'Image':images,
    'Year_Released':yearReleased,
    'Duration':durations,
    'Age_Rating':ageRatings
    })
print(titles)
#print(titles)
print("errors", error_msg_list, error_url_list)
review_df.to_csv('imdb.csv', index = False)