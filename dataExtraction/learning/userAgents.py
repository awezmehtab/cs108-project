import requests

headers = {
    'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Dnt' : '1',
    'Referer' : 'http://www.imdb.com/chart/top',
    'Sec-Ch-Ua' : '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
    'Sec-Ch-Ua-Mobile' : '?0',
    'Sec-Ch-Ua-Platform' : '"Linux"',
    'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}
r = requests.get('http://www.imdb.com/', headers=headers)

print(r.text)