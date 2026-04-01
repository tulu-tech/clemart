import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace main content
new_main = """
  <main id="main-content">
    <!-- ═══ INTERNAL HERO ═══ -->
    <section class="internal-hero" style="position: relative; padding: 180px 0 100px; text-align: center; background: var(--night); overflow: hidden; border-bottom: 1px solid rgba(212,163,82,0.15);">
      <div style="position: absolute; top:0; left:0; width:100%; height:100%; opacity: 0.15;">
        <img src="https://masnuat.com.tr/image/masnuat/banner/tezhip.jpg" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(50%) contrast(1.2);" alt="Tezhip background" />
      </div>
      <div style="position: relative; z-index: 2; max-width: 800px; margin: 0 auto; padding: 0 20px;">
        <h1 style="font-family: var(--font-display); font-size: 64px; color: var(--gold); margin-bottom: 24px; letter-spacing: 0.02em;">Tezhip Sanatı</h1>
        <p style="font-size: 16px; color: var(--silver); line-height: 1.8; letter-spacing: 0.05em; text-transform: uppercase;">Altınla Bezeme ve Süsleme Sanatı</p>
      </div>
    </section>

    <!-- ═══ PHILOSOPHY ═══ -->
    <section style="padding: 100px 20px; background: var(--black); text-align: center;">
      <div style="max-width: 800px; margin: 0 auto;">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1" style="margin-bottom: 30px; opacity: 0.7;">
          <path d="M12 2L2 22h20L12 2z"></path>
        </svg>
        <p style="font-size: 22px; line-height: 1.8; color: var(--white); font-weight: 300;">
          "Besmelenin noktasından çıkış yapıp hiçlikte kaybolan ve heplikte vücut bulan bu sanat, kitapların anası Kur'an-ı Kerim merkezli, altınla bezeme, süsleme sanatıdır."
        </p>
        <p style="font-size: 16px; line-height: 1.8; color: var(--silver); margin-top: 30px;">
          Kökleri mazide gövdesi bugünde, meyvesi ise atiye uzanan bu sanat geçmişte olduğu gibi bugün de klasik sanatların gözdesidir. İlahi Kelimetullah'ın en narin, en naif libasıdır. Müzehhip ya da müzehhibelerin kabiliyetlerince geleceğe yeni kapılar açan, yeni ufuklar kazanabilen, yaşayan ve sanatın en zarif teferruatlı adıdır Tezhip.
        </p>
      </div>
    </section>

    <!-- ═══ COLLECTION ═══ -->
    <section style="padding: 100px 20px; background: var(--night);">
      <div style="max-width: 1400px; margin: 0 auto;">
        <h2 style="font-family: var(--font-display); font-size: 40px; color: var(--gold); text-align: center; margin-bottom: 60px;">Tezhip Eserleri Koleksiyonu</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
          
          <article style="background: var(--charcoal); border: 1px solid rgba(212,163,82,0.1); border-radius: 4px; overflow: hidden;">
            <div style="position: relative; padding-top: 120%; overflow: hidden;">
              <img src="https://masnuat.com.tr/image/masnuat/urun/2019-3/siyah-zemin-uzeri-altin-tugra.jpg" style="position: absolute; top:0; left:0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" alt="1. Ahmet Tuğrası Altın Dolgu Tezhip Tablo" />
            </div>
            <div style="padding: 30px; text-align: center;">
              <h3 style="font-size: 18px; color: var(--white); margin-bottom: 12px;">1. Ahmet Tuğrası Altın Dolgu</h3>
              <p style="color: var(--silver); font-size: 13px; line-height: 1.6; margin-bottom: 20px;">22 ayar altın ve akrilik boya ile özel el işçiliği</p>
              <a href="#" style="color: var(--gold); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid var(--gold); padding-bottom: 4px;">Detayları İncele</a>
            </div>
          </article>

          <article style="background: var(--charcoal); border: 1px solid rgba(212,163,82,0.1); border-radius: 4px; overflow: hidden;">
            <div style="position: relative; padding-top: 120%; overflow: hidden;">
              <img src="https://masnuat.com.tr/image/masnuat/urun/ta-tz-2.jpg" style="position: absolute; top:0; left:0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" alt="3. Selim Tuğrası Tezhip Tablo" />
            </div>
            <div style="padding: 30px; text-align: center;">
              <h3 style="font-size: 18px; color: var(--white); margin-bottom: 12px;">3. Selim Tuğrası Tezhip Tablo</h3>
              <p style="color: var(--silver); font-size: 13px; line-height: 1.6; margin-bottom: 20px;">Zerendut hat, 22 ayar altın ve guaj boya tekniği</p>
              <a href="#" style="color: var(--gold); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid var(--gold); padding-bottom: 4px;">Detayları İncele</a>
            </div>
          </article>

          <article style="background: var(--charcoal); border: 1px solid rgba(212,163,82,0.1); border-radius: 4px; overflow: hidden;">
            <div style="position: relative; padding-top: 120%; overflow: hidden;">
              <img src="https://masnuat.com.tr/image/masnuat/urun/hy-tz-3.jpg" style="position: absolute; top:0; left:0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" alt="Allah Lafzı Saz Yolu Tezhip Tablo" />
            </div>
            <div style="padding: 30px; text-align: center;">
              <h3 style="font-size: 18px; color: var(--white); margin-bottom: 12px;">Allah Lafzı Saz Yolu Tezhip</h3>
              <p style="color: var(--silver); font-size: 13px; line-height: 1.6; margin-bottom: 20px;">18-22 ayar altın, Kufi yazı ve mürekkep</p>
              <a href="#" style="color: var(--gold); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid var(--gold); padding-bottom: 4px;">Detayları İncele</a>
            </div>
          </article>

          <article style="background: var(--charcoal); border: 1px solid rgba(212,163,82,0.1); border-radius: 4px; overflow: hidden;">
            <div style="position: relative; padding-top: 120%; overflow: hidden;">
              <img src="https://masnuat.com.tr/image/masnuat/urun/ab-tz-2.jpg" style="position: absolute; top:0; left:0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" alt="Allahu Ekber Tezhip Tablo" />
            </div>
            <div style="padding: 30px; text-align: center;">
              <h3 style="font-size: 18px; color: var(--white); margin-bottom: 12px;">Allahu Ekber Tezhip Tablo</h3>
              <p style="color: var(--silver); font-size: 13px; line-height: 1.6; margin-bottom: 20px;">Kufi yazı ve akrilik boya</p>
              <a href="#" style="color: var(--gold); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid var(--gold); padding-bottom: 4px;">Detayları İncele</a>
            </div>
          </article>

          <article style="background: var(--charcoal); border: 1px solid rgba(212,163,82,0.1); border-radius: 4px; overflow: hidden;">
            <div style="position: relative; padding-top: 120%; overflow: hidden;">
              <img src="https://masnuat.com.tr/image/masnuat/urun/2019-3/bordo-zemin-uzerine-mavi-tezhip.jpg" style="position: absolute; top:0; left:0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" alt="Ah Minel Aşk Bordo Zemin Tezhip" />
            </div>
            <div style="padding: 30px; text-align: center;">
              <h3 style="font-size: 18px; color: var(--white); margin-bottom: 12px;">Ah Minel Aşk Bordo Zemin</h3>
              <p style="color: var(--silver); font-size: 13px; line-height: 1.6; margin-bottom: 20px;">Mavi Tezhip ve Minyatür Tablo</p>
              <a href="#" style="color: var(--gold); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid var(--gold); padding-bottom: 4px;">Detayları İncele</a>
            </div>
          </article>
          
          <article style="background: var(--charcoal); border: 1px solid rgba(212,163,82,0.1); border-radius: 4px; overflow: hidden;">
            <div style="position: relative; padding-top: 120%; overflow: hidden;">
              <img src="https://masnuat.com.tr/image/masnuat/urun/ag-kat-4.jpg" style="position: absolute; top:0; left:0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" alt="Esmaül Hüsna Tezhip Minyatür Tablo" />
            </div>
            <div style="padding: 30px; text-align: center;">
              <h3 style="font-size: 18px; color: var(--white); margin-bottom: 12px;">Esmaül Hüsna Tezhip</h3>
              <p style="color: var(--silver); font-size: 13px; line-height: 1.6; margin-bottom: 20px;">18-22 ayar altın ve akrilik boya sanat eseri</p>
              <a href="#" style="color: var(--gold); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid var(--gold); padding-bottom: 4px;">Detayları İncele</a>
            </div>
          </article>

        </div>
      </div>
    </section>
  </main>
"""

# Replace <title> and description for SEO
html = re.sub(
    r'<title>.*?</title>',
    '<title>Tezhip Sanatı - ClemArt Luxury & Classical Arts</title>',
    html
)
html = re.sub(
    r'<meta name="description" content="[^"]*">',
    '<meta name="description" content="Besmelenin noktasından çıkıp altınla bezeme ve süsleme sanatına dönüşen tezhip. Klasik sanatların gözdesi, ilahi kelamın en narin libası tezhip eserleri ClemArt koleksiyonunda.">',
    html
)
html = html.replace('aria-current="page"', '') # Remove active states

# Replace <main> block
pattern = re.compile(r'<main id="main-content">.*?</main>', re.DOTALL)
html = pattern.sub(new_main, html)

# Link navigation back to home
html = html.replace('href="#collections"', 'href="index.html#collections"')
html = html.replace('href="#heritage"', 'href="index.html#heritage"')
html = html.replace('href="#founder"', 'href="index.html#founder"')
html = html.replace('href="#contact"', 'href="index.html#contact"')

with open('tezhip.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Generated tezhip.html")
