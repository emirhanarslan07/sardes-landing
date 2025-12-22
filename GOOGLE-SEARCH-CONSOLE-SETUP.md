# Google Search Console Kurulum Rehberi

## Adım 1: Google Search Console'a Giriş
1. [Google Search Console](https://search.google.com/search-console/) adresine gidin
2. Google hesabınızla giriş yapın

## Adım 2: Site Ekleme
1. "Özellik ekle" butonuna tıklayın
2. "URL öneki" seçeneğini seçin
3. `https://getsardes.com` adresini girin
4. "Devam" butonuna tıklayın

## Adım 3: Sahiplik Doğrulama
Aşağıdaki yöntemlerden birini kullanabilirsiniz:

### Yöntem 1: HTML Dosyası (Önerilen)
1. Google'ın verdiği HTML dosyasını indirin
2. Dosyayı `public/` klasörüne koyun
3. "Doğrula" butonuna tıklayın

### Yöntem 2: HTML Meta Etiketi
1. Google'ın verdiği meta etiketini kopyalayın
2. `index.html` dosyasının `<head>` bölümüne ekleyin
3. "Doğrula" butonuna tıklayın

## Adım 4: Sitemap Gönderimi
1. Sol menüden "Sitemaps" seçeneğine tıklayın
2. "Yeni sitemap ekle" alanına `sitemap.xml` yazın
3. "Gönder" butonuna tıklayın

## Adım 5: URL İnceleme
1. Sol menüden "URL İnceleme" seçeneğine tıklayın
2. Ana sayfa URL'inizi girin: `https://getsardes.com`
3. "Canlı URL'yi test et" seçeneğini kullanın

## Beklenen Sonuçlar
- Site sahipliği doğrulandıktan sonra 24-48 saat içinde veriler gelmeye başlar
- Sitemap başarıyla işlendikten sonra Google sayfalarınızı indekslemeye başlar
- Performance raporlarında trafik verileri görünür

## Önemli Notlar
- Vercel deployment'ı tamamlandıktan sonra kurulumu yapın
- İlk verilerin gelmesi 2-7 gün sürebilir
- Sitemap.xml dosyası otomatik olarak oluşturuldu ve hazır durumda

## Takip Edilecek Metrikler
- **Performans**: Hangi anahtar kelimelerle bulunuyorsunuz
- **Kapsam**: Hangi sayfalar indekslendi
- **Deneyim**: Sayfa hızı ve kullanıcı deneyimi
- **Geliştirmeler**: Yapısal veri ve diğer SEO faktörleri