import urllib.request

urls = [
    "https://masnuat.com.tr/image/masnuat/urun/ebru-1.jpg",
    "https://masnuat.com.tr/image/masnuat/urun/ebru-2.jpg",
    "https://masnuat.com.tr/image/masnuat/urun/ebru-3.jpg",
    "https://masnuat.com.tr/image/masnuat/urun/hu-ve-akkase-ebru.jpg",
    "https://masnuat.com.tr/image/masnuat/urun/battal-ebru-tablo.jpg",
    "https://masnuat.com.tr/image/masnuat/urun/battal-ebru-tablo-1.jpg",
    "https://masnuat.com.tr/image/masnuat/urun/uclu-osmanli-kalyon-ebru-tablo.jpg",
    "https://masnuat.com.tr/image/masnuat/urun/ag-ebru-1.jpg",
    "https://masnuat.com.tr/image/masnuat/urun/ag-ebru-2.jpg",
    "https://masnuat.com.tr/image/masnuat/urun/ag-ebru-3.jpg",
    "https://masnuat.com.tr/image/masnuat/urun/ab-eb-1.jpg",
    "https://masnuat.com.tr/image/masnuat/urun/ab-eb-2.jpg",
]

for url in urls:
    try:
        req = urllib.request.Request(url, method='HEAD')
        resp = urllib.request.urlopen(req, timeout=5)
        if resp.status == 200:
            print("OK:", url)
    except Exception as e:
        pass
