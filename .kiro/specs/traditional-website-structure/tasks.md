# Geleneksel Web Sitesi Yapısı - Görev Listesi

- [x] 1. Gelişmiş Navbar bileşenini oluştur


  - Mevcut Navbar'ı genişlet ve geleneksel menü öğelerini ekle
  - "Anasayfa, Özellikler, Hakkımızda, İletişim" menü öğelerini ekle
  - Sağ tarafta "Giriş Yap" ve "Kayıt Ol" butonlarını ekle
  - Mobil responsive hamburger menü ekle
  - Aktif bölüm vurgulama sistemi ekle
  - _Gereksinimler: 1.1, 1.2, 1.3, 1.5, 2.4_

- [ ]* 1.1 Navbar bileşeni için unit testler yaz
  - Menü öğelerinin doğru render edildiğini test et
  - Mobil/desktop görünüm geçişlerini test et
  - Aktif bölüm vurgulama mantığını test et
  - _Gereksinimler: 1.1, 1.2, 1.3, 1.5_

- [ ]* 1.2 Navbar için property testler yaz
  - **Özellik 4: Responsive davranış**
  - **Doğrular: Gereksinim 1.5**

- [ ]* 1.3 Navbar için property testler yaz
  - **Özellik 1: Navigasyon tutarlılığı**
  - **Doğrular: Gereksinim 2.4**



- [ ] 2. Smooth scroll ve URL hash yönetimi ekle
  - Menü tıklamalarında smooth scroll davranışı ekle
  - URL hash güncellemesi ve senkronizasyonu ekle
  - Sayfa yüklendiğinde hash'e göre bölüm gösterimi
  - Scroll pozisyonuna göre aktif menü güncelleme
  - _Gereksinimler: 1.4, 2.1, 2.2, 2.3, 2.5_

- [ ]* 2.1 Scroll yönetimi için property testler yaz
  - **Özellik 5: Smooth scroll davranışı**
  - **Doğrular: Gereksinim 1.4, 2.1, 2.2, 2.3**

- [x]* 2.2 URL hash için property testler yaz


  - **Özellik 6: URL hash senkronizasyonu**
  - **Doğrular: Gereksinim 2.5**

- [ ] 3. Auth modal bileşenlerini oluştur
  - Giriş yap modal bileşeni oluştur
  - Kayıt ol modal bileşeni oluştur
  - Modal açma/kapama state yönetimi ekle
  - Form validasyonu ve "Yakında aktif olacak" mesajı ekle
  - Modal backdrop ve ESC tuşu ile kapama
  - _Gereksinimler: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]* 3.1 Auth modal için unit testler yaz
  - Modal açılma/kapanma davranışını test et
  - Form alanlarının doğru render edildiğini test et
  - Form validasyonu mantığını test et
  - _Gereksinimler: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]* 3.2 Modal yönetimi için property testler yaz
  - **Özellik 2: Modal durumu yönetimi**
  - **Doğrular: Gereksinim 3.1, 3.2**



- [ ]* 3.3 Form validasyonu için property testler yaz
  - **Özellik 3: Form validasyonu**
  - **Doğrular: Gereksinim 3.3, 3.4, 5.2**

- [ ] 4. Özellikler bölümünü oluştur
  - Ana ürün özelliklerini liste halinde gösteren bölüm oluştur
  - Özellik kartları ve detay modal'ları ekle
  - "Demo Talep Et" butonu ve formu ekle
  - Demo video/screenshot galeri ekle
  - Ürün özelliklerini vurgulayan interaktif bölüm
  - _Gereksinimler: 6.1, 6.2, 6.3, 6.4_

- [ ]* 4.1 Özellikler bölümü için unit testler yaz
  - Özellik listesinin doğru render edildiğini test et
  - Fiyatlandırma bilgilerinin gösterimini test et


  - Karşılaştırma tablosu mantığını test et
  - _Gereksinimler: 6.1, 6.3, 6.4, 6.5_

- [ ]* 4.2 Özellik kartı etkileşimi için property testler yaz
  - **Özellik 8: Özellik kartı etkileşimi**
  - **Doğrular: Gereksinim 6.2**

- [ ] 5. Hakkımızda bölümünü oluştur
  - Şirket misyonu ve vizyonu bölümü oluştur
  - Şirket değerleri ve yaklaşımı bölümü ekle
  - Sardes'in hikayesi ve neden oluşturulduğu
  - Teknoloji ve metodoloji açıklaması
  - Gelecek vizyonu ve hedefler
  - _Gereksinimler: 4.1, 4.2, 4.3, 4.4_

- [x]* 5.1 Hakkımızda bölümü için unit testler yaz


  - Şirket bilgilerinin doğru render edildiğini test et
  - Ekip kartlarının gösterimini test et
  - İletişim bilgilerinin gösterimini test et
  - _Gereksinimler: 4.1, 4.2, 4.3, 4.4_

- [ ]* 5.2 Ekip kartı etkileşimi için property testler yaz
  - **Özellik 7: Ekip kartı etkileşimi**
  - **Doğrular: Gereksinim 4.5**

- [ ] 6. İletişim bölümünü oluştur
  - İletişim formu bileşeni oluştur (ad, email, konu, mesaj)
  - Supabase entegrasyonu ile form verisi kaydetme
  - Form validasyonu ve başarı mesajı gösterimi
  - Ofis adresi ve telefon bilgileri bölümü
  - Form gönderimi sonrası teşekkür mesajı
  - _Gereksinimler: 5.1, 5.2, 5.3, 5.4, 5.5_



- [ ]* 6.1 İletişim formu için unit testler yaz
  - Form alanlarının doğru render edildiğini test et
  - Form validasyonu mantığını test et
  - Başarı mesajı gösterimini test et
  - _Gereksinimler: 5.1, 5.2, 5.4, 5.5_

- [ ]* 6.2 İletişim formu veri kaydı için property testler yaz
  - **Özellik 9: İletişim formu veri kaydı**
  - **Doğrular: Gereksinim 5.3**

- [ ] 7. Footer bileşenini genişlet
  - Şirket logosu ve kısa açıklama ekle
  - Gizlilik Politikası ve Kullanım Şartları linkleri ekle
  - Sosyal medya linkleri bölümü ekle
  - Telif hakkı bilgisi ekle


  - Yasal sayfa modal'ları oluştur
  - _Gereksinimler: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x]* 7.1 Footer bileşeni için unit testler yaz


  - Footer içeriklerinin doğru render edildiğini test et
  - Sosyal medya linklerinin gösterimini test et
  - Telif hakkı bilgisinin gösterimini test et
  - _Gereksinimler: 7.1, 7.2, 7.3, 7.4_





- [ ]* 7.2 Yasal modal için property testler yaz
  - **Özellik 10: Yasal modal açılması**
  - **Doğrular: Gereksinim 7.5**

- [ ] 8. Supabase veritabanı şeması güncelle
  - İletişim mesajları için tablo oluştur (contact_messages)
  - Gerekli indeksleri ve RLS politikalarını ekle
  - Veritabanı migration script'i hazırla
  - _Gereksinimler: 5.3_

- [ ] 9. Ana sayfa düzenini güncelle
  - Mevcut bölümleri yeni navigasyon yapısına uyarla
  - Bölüm ID'lerini ve anchor linklerini ekle
  - Responsive düzen kontrolü ve iyileştirmeler
  - Geçiş animasyonları ve smooth scroll entegrasyonu
  - _Gereksinimler: 1.4, 2.1, 2.2, 2.3_

- [ ] 10. Checkpoint - Tüm testlerin geçtiğinden emin ol
  - Tüm testlerin geçtiğinden emin ol, sorular çıkarsa kullanıcıya sor

- [ ]* 11. Integration testler yaz
  - Tam sayfa navigasyon akışını test et
  - Modal açma/kapama döngülerini test et
  - Form gönderme ve yanıt işleme akışını test et
  - Responsive geçişleri test et