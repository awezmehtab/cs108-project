import numpy as np # for NaN values
from scrapy.selector import Selector # selector
from selenium import webdriver # driver
from selenium.webdriver.common.by import By # required to make WebElement
from selenium.webdriver.chrome.options import Options # to run in headless mode
import sys # to take arguments

headless_options = Options()
headless_options.add_argument("--headless=new")

movie_url = f'https://www.google.com/search?q={sys.argv[1].strip().replace(" ","+")}+movie+reviews'
driver = webdriver.Chrome(headless_options)
driver.get(movie_url)
try:
    reviews_WebElement = driver.find_element(By.CSS_SELECTOR, 'div.zr7Aae.aokhrd.rVRkd')
    reviews_Selector = Selector(text=reviews_WebElement.get_attribute('innerHTML'))

    ratings = reviews_Selector.css('span.gsrt.KMdzJ::text').getall()
    site = reviews_Selector.css('span.rhsB.pVA7K::text').getall()
    links = reviews_Selector.css('a::attr(href)').getall()
except Exception as e:
    print(e)
    ratings, site, links = np.full(3, np.nan)
    
print((ratings, site, links))