import urllib.request
from html.parser import HTMLParser

class ImgParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        if tag == 'img':
            d = dict(attrs)
            if 'src' in d:
                print(d['src'])

req = urllib.request.Request('https://masnuat.com.tr/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    ImgParser().feed(html)
except Exception as e:
    print("Error:", e)
