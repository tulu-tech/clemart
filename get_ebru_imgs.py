from bs4 import BeautifulSoup
import urllib.request

req = urllib.request.Request('https://masnuat.com.tr/ebru', headers={'User-Agent': 'Mozilla/5.0'})
resp = urllib.request.urlopen(req)
html = resp.read()

soup = BeautifulSoup(html, 'html.parser')
for img in soup.find_all('img'):
    src = img.get('src')
    if src and 'urun' in src:
        # replace cache paths
        if 'cache/' in src:
            src = src.replace('cache/', '')
            pieces = src.split('-')
            # remove resolution e.g. -228x228.jpg
            if len(pieces) > 1 and pieces[-1].split('.')[0].isdigit():
                # not bulletproof but works sometimes. actually let's just use the exact src without the dimension
                pass
        print(src)

