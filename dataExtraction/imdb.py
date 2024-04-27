import numpy as np
import pandas as pd
from scrapy.selector import Selector
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time
from tqdm import tqdm
import warnings

LOADTIME = 1

options = Options()
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--headless')
options.add_argument('--disable-gpu')

# Initialising the webdriver
driver = webdriver.Chrome()
time.sleep(LOADTIME)
# Opening URL
url = 'https://www.imdb.com/chart/top/'
driver.get(url)
time.sleep(LOADTIME)

# WebElement for body and each movie (list) 
body = driver.find_element(By.CSS_SELECTOR, 'body')
movies = driver.find_elements(By.CSS_SELECTOR, 'li.ipc-metadata-list-summary-item')

# Lists to store the scraped data
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
trailer_links = []
streaming_platforms = []
other_ratings = []
error_url_list = []
error_msg_list = []

noMovies = 250
i = 1
WAIT_UNTIL_BUTTON_LOADS = 3

# Returns Selector of the Page we want, if we supply the class name
def getPageByClass(driver, css):
    try:
        page = driver.find_element(By.CSS_SELECTOR, css)
        sel = Selector(text=page.get_attribute('innerHTML'))
        return sel
    except Exception as e:
        error_url_list.append(url)
        error_msg_list.append(e)
        return None

getInfoPage = lambda driver: getPageByClass(driver, 'div.ipc-promptable-base__focus-lock')

for movie in movies:

    if i > noMovies:
        break
    i += 1

    try:

        # OPENING INFO PAGE
        try:
            wait = WebDriverWait(driver, WAIT_UNTIL_BUTTON_LOADS)
            button = wait.until(EC.element_to_be_clickable(movie.find_element(By.CSS_SELECTOR, 'button.ipc-icon-button.cli-info-icon')))
            button.click()
        except Exception:
            try:
                # if we couldn't open, let's try scrolling till we find it
                button = movie.find_element(By.CSS_SELECTOR, 'button.ipc-icon-button.cli-info-icon')
                button.location_once_scrolled_into_view
                button.click()
            except Exception as e:
                # if we still couldn't find it, we'll note it
                error_url_list.append(url)
                error_msg_list.append(e)
                continue
        time.sleep(LOADTIME)

        # EXTRACTING INFO
        # image link
        try:
            # Selector for Info
            selForInfo = getInfoPage(driver)
            img_src = selForInfo.css('div.ipc-media img::attr(src)').get()
            images.append(img_src)
        except:
            images.append(np.NaN)
        #title
        try:
            # Selector for Info
            selForInfo = getInfoPage(driver)
            title = selForInfo.css('h3.ipc-title__text.prompt-title-text::text').get()
            titles.append(title)
        except:
            titles.append(np.NaN)
        # year, duration, age rating
        try:
            sel3 = getInfoPage(driver)
            year_duration_age = sel3.css('ul[data-testid="btp_ml"] li::text').getall()
            yearReleased.append(year_duration_age[0])
            durations.append(year_duration_age[1])
            ageRatings.append(year_duration_age[2])
        except: 
            yearReleased.append(np.NaN)
            durations.append(np.NaN)
            ageRatings.append(np.NaN)
        # genre
        try:
            genre = sel3.css('ul[data-testid="btp_gl"] li::text').getall()
            genres.append(genre)
        except:
            genres.append(np.NaN)
        # rating 
        try:
            sel3 = getInfoPage(driver)
            ratings.append(sel3.css('span.btp_rt_ds::text').get())
        except:
            ratings.append(np.NaN)
        # plot
        try:
            # Wait up to 10 seconds for the plot element to load
            time.sleep(LOADTIME)
            sel3 = getInfoPage(driver)
            plots.append(sel3.css('div.sc-d3701649-2.cPgMft::text').get())
        except:
            plots.append(np.NaN)
        # directors
        try:
            time.sleep(LOADTIME)
            sel3 = getInfoPage(driver)
            directors.append(sel3.css('div[data-testid="p_ct_dr"] ul li a::text').getall())
        except:
            directors.append(np.NaN)
        # casts
        try:
            time.sleep(LOADTIME)
            sel3 = getInfoPage(driver)
            casts.append(sel3.css('div[data-testid="p_ct_cst"] ul li a::text').getall())
        except:
            casts.append(np.NaN) 
        # trailer link
        try:
            time.sleep(LOADTIME)
            sel3 = getInfoPage(driver)
            trailer_links.append("https://www.imdb.com"+sel3.css('a[data-testid="btp_trlr"]::attr(href)').get())
        except:
            trailer_links.append(np.NaN)
        # streaming platforms
        try:
            time.sleep(LOADTIME)
            sel3 = getInfoPage(driver)
            link = sel3.css('div.sc-b06b1d17-1.ehSCie ul a::attr(href)').getall()
            name = sel3.css('div.sc-b06b1d17-7.fFlNXx::text').getall()
            streaming_platforms.append((name, link))
        except:
            streaming_platforms.append(np.NaN)

        # close the dialog
        try:
            wait = WebDriverWait(driver, WAIT_UNTIL_BUTTON_LOADS)
            close_button = wait.until(EC.element_to_be_clickable(movie.find_element(By.CSS_SELECTOR, 'div.ipc-promptable-base__close button')))
            close_button.click()
        except Exception:
            try:
                close_button = movie.find_element(By.CSS_SELECTOR, 'div.ipc-promptable-base__close button')
                close_button.location_once_scrolled_into_view
                close_button.click()
            except Exception as e:
                error_url_list.append(url)
                error_msg_list.append(e)
                continue

        # trying google search for other ratings
        try:    
            usable_str = titles[i-2].strip().replace(" ", "+")
            url_google = f"https://www.google.com/search?q={usable_str}+movie+reviews"
            time.sleep(LOADTIME)
            driver2 = webdriver.Chrome()
            driver2.get(url_google)
            google_element = driver2.find_element(By.CSS_SELECTOR, 'div.zr7Aae.aokhrd.rVRkd.h4Y5Ke')
            sel_google = Selector(text = google_element.get_attribute('innerHTML'))
            rating = sel_google.css('span.gsrt.KMdzJ::text').getall()
            site = sel_google.css('span.rhsB.pVA7K::text').getall()
            link = sel_google.css('a.TZahnb.vIUFYd::attr(href)').getall()
            other_ratings.append((rating, site, link))
            driver2.quit()
        except:
            rating = np.NaN
            site = np.NaN
            link = np.NaN
            other_ratings.append((rating, site, link))
            driver2.quit()

        # printing
        print(titles[i-2], images[i-2], yearReleased[i-2], ageRatings[i-2], durations[i-2], genres[i-2], ratings[i-2], plots[i-2], directors[i-2], casts[i-2], trailer_links[i-2], streaming_platforms[i-2], other_ratings[i-2], sep="\n", end="\n\n", file=open("output.txt", "a"))
    except Exception as e:
        error_url_list.append(url)
        error_msg_list.append(e)


review_df = pd.DataFrame({
    'Title':titles,
    'Image':images,
    'Year_Released':yearReleased,
    'Duration':durations,
    'Age_Rating':ageRatings,
    'Genres':genres,
    'Rating':ratings,
    'Plots':plots,
    'Directors':directors,
    'Casts':casts,
    'Trailer_Links':trailer_links,
    'Streaming_Platforms':streaming_platforms,
    'Other_Ratings':other_ratings
    })

print("ERROR MESSAGES:\n", error_msg_list, "\nERROR URLS:\n", error_url_list, file=open("errors.txt", "a"))
review_df.to_csv('imdb.csv', index = False)