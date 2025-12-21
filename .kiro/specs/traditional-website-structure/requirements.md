# Geleneksel Web Sitesi Yapısı - Gereksinimler

## Giriş

Mevcut Sardes landing page'ini daha geleneksel ve alışılagelmiş bir web sitesi yapısına dönüştürme projesi. Kullanıcıların beklediği standart navigasyon menüsü, sayfa yapısı ve etkileşim elementlerini ekleyerek daha tanıdık bir deneyim sunmak.

## Sözlük

- **Navbar**: Site üst kısmındaki navigasyon çubuğu
- **Landing Page**: Ana sayfa içeriği
- **CTA**: Call-to-Action (Harekete geçirici buton)
- **Responsive**: Mobil uyumlu tasarım
- **Traditional Layout**: Geleneksel web sitesi düzeni

## Gereksinimler

### Gereksinim 1

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, tanıdık web sitesi navigasyonu görmek istiyorum, böylece sitede rahatça gezinebilirim.

#### Kabul Kriterleri

1. WHEN bir kullanıcı siteyi ziyaret ettiğinde THEN sistem standart navbar menü öğelerini gösterecek
2. WHEN navbar görüntülendiğinde THEN sistem "Anasayfa, Özellikler, Hakkımızda, İletişim" menü öğelerini içerecek
3. WHEN navbar görüntülendiğinde THEN sistem sağ tarafta "Giriş Yap" ve "Kayıt Ol" butonlarını gösterecek
4. WHEN kullanıcı menü öğelerine tıkladığında THEN sistem ilgili bölüme yumuşak kaydırma yapacak
5. WHEN mobil cihazda görüntülendiğinde THEN sistem hamburger menü gösterecek

### Gereksinim 2

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, sitenin farklı bölümlerini keşfetmek istiyorum, böylece ürün hakkında detaylı bilgi alabilirim.

#### Kabul Kriterleri

1. WHEN "Özellikler" menüsüne tıklandığında THEN sistem ürün özelliklerini gösteren bölüme kaydıracak
2. WHEN "Hakkımızda" menüsüne tıklandığında THEN sistem şirket ve ürün hikayesini gösteren bölüme kaydıracak
3. WHEN "İletişim" menüsüne tıklandığında THEN sistem iletişim bilgileri ve formu gösteren bölüme kaydıracak
4. WHEN sayfa kaydırıldığında THEN sistem aktif menü öğesini vurgulayacak
5. WHEN bölüm değiştiğinde THEN sistem URL hash'ini güncelleyecek

### Gereksinim 3

**Kullanıcı Hikayesi:** Bir kullanıcı olarak, hesap oluşturma ve giriş yapma seçenekleri görmek istiyorum, böylece gelecekte platforma erişebileceğimi bilirim.

#### Kabul Kriterleri

1. WHEN "Kayıt Ol" butonuna tıklandığında THEN sistem kayıt formu modal'ını açacak
2. WHEN "Giriş Yap" butonuna tıklandığında THEN sistem giriş formu modal'ını açacak
3. WHEN kayıt formu görüntülendiğinde THEN sistem email, şifre ve şifre tekrarı alanlarını gösterecek
4. WHEN giriş formu görüntülendiğinde THEN sistem email ve şifre alanlarını gösterecek
5. WHEN form gönderildiğinde THEN sistem "Yakında aktif olacak" mesajı gösterecek

### Gereksinim 4

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, şirket hakkında bilgi almak istiyorum, böylece güvenilirlik değerlendirmesi yapabilirim.

#### Kabul Kriterleri

1. WHEN "Hakkımızda" bölümü görüntülendiğinde THEN sistem şirket misyonu ve vizyonunu gösterecek
2. WHEN "Hakkımızda" bölümü görüntülendiğinde THEN sistem kurucu ekip bilgilerini gösterecek
3. WHEN "Hakkımızda" bölümü görüntülendiğinde THEN sistem şirket değerlerini gösterecek
4. WHEN "Hakkımızda" bölümü görüntülendiğinde THEN sistem iletişim bilgilerini gösterecek
5. WHEN ekip üyesi kartına tıklandığında THEN sistem detaylı profil bilgisi gösterecek

### Gereksinim 5

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, şirketle iletişime geçmek istiyorum, böylece sorularımı sorabilirim.

#### Kabul Kriterleri

1. WHEN "İletişim" bölümü görüntülendiğinde THEN sistem iletişim formu gösterecek
2. WHEN iletişim formu görüntülendiğinde THEN sistem ad, email, konu ve mesaj alanlarını gösterecek
3. WHEN iletişim formu gönderildiğinde THEN sistem mesajı Supabase'e kaydedecek
4. WHEN form başarıyla gönderildiğinde THEN sistem teşekkür mesajı gösterecek
5. WHEN "İletişim" bölümü görüntülendiğinde THEN sistem ofis adresi ve telefon bilgilerini gösterecek

### Gereksinim 6

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, ürün özelliklerini detaylı görmek istiyorum, böylece satın alma kararı verebilirim.

#### Kabul Kriterleri

1. WHEN "Özellikler" bölümü görüntülendiğinde THEN sistem ana ürün özelliklerini liste halinde gösterecek
2. WHEN özellik kartına tıklandığında THEN sistem detaylı açıklama modal'ı açacak
3. WHEN "Özellikler" bölümü görüntülendiğinde THEN sistem fiyatlandırma bilgilerini gösterecek
4. WHEN "Özellikler" bölümü görüntülendiğinde THEN sistem demo video veya screenshot'ları gösterecek
5. WHEN özellik karşılaştırması yapıldığında THEN sistem rakip analizi tablosu gösterecek

### Gereksinim 7

**Kullanıcı Hikayesi:** Bir ziyaretçi olarak, sitenin footer bölümünde standart bilgileri görmek istiyorum, böylece yasal ve ek bilgilere erişebilirim.

#### Kabul Kriterleri

1. WHEN sayfa footer'ı görüntülendiğinde THEN sistem şirket logosu ve kısa açıklama gösterecek
2. WHEN footer görüntülendiğinde THEN sistem "Gizlilik Politikası" ve "Kullanım Şartları" linklerini gösterecek
3. WHEN footer görüntülendiğinde THEN sistem sosyal medya linklerini gösterecek
4. WHEN footer görüntülendiğinde THEN sistem telif hakkı bilgisini gösterecek
5. WHEN yasal sayfa linkine tıklandığında THEN sistem ilgili yasal metni modal'da gösterecek