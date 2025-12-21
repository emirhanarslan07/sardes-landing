# Geleneksel Web Sitesi Yapısı - Tasarım Dokümanı

## Genel Bakış

Mevcut Sardes landing page'ini geleneksel web sitesi yapısına dönüştürme projesi. Kullanıcıların alışık olduğu standart navigasyon, sayfa bölümleri ve etkileşim elementlerini ekleyerek daha tanıdık bir deneyim sunacağız.

## Mimari

### Sayfa Yapısı
```
Header (Navbar)
├── Logo (Sol)
├── Navigasyon Menüsü (Orta)
│   ├── Anasayfa
│   ├── Özellikler  
│   ├── Hakkımızda
│   └── İletişim
└── Kullanıcı Aksiyonları (Sağ)
    ├── Giriş Yap
    └── Kayıt Ol

Main Content
├── Hero Section (Anasayfa)
├── Features Section (Özellikler)
├── About Section (Hakkımızda)
├── Contact Section (İletişim)
└── Existing Sections (Mevcut içerik)

Footer
├── Şirket Bilgileri
├── Yasal Linkler
├── Sosyal Medya
└── Telif Hakkı
```

### Responsive Davranış
- **Desktop**: Tam navbar menüsü
- **Tablet**: Kompakt navbar
- **Mobile**: Hamburger menü

## Bileşenler ve Arayüzler

### 1. Enhanced Navbar Component
```typescript
interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
}
```

### 2. Modal Components
```typescript
interface AuthModalProps {
  isOpen: boolean;
  type: 'login' | 'register';
  onClose: () => void;
}

interface FeatureModalProps {
  isOpen: boolean;
  feature: FeatureDetail;
  onClose: () => void;
}
```

### 3. Section Components
```typescript
interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}
```

### 4. Contact Form Component
```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

## Veri Modelleri

### Navigation Item
```typescript
interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
}
```

### Feature Detail
```typescript
interface FeatureDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  benefits: string[];
  screenshots?: string[];
}
```

### Team Member
```typescript
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  twitter?: string;
}
```

### Contact Message
```typescript
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: 'new' | 'read' | 'replied';
}
```

## Doğruluk Özellikleri

*Bir özellik, sistemin tüm geçerli yürütmelerinde doğru olması gereken bir karakteristik veya davranıştır - esasen, sistemin ne yapması gerektiği hakkında resmi bir ifadedir. Özellikler, insan tarafından okunabilir spesifikasyonlar ile makine tarafından doğrulanabilir doğruluk garantileri arasında köprü görevi görür.*

### Özellik 1: Navigasyon tutarlılığı
*Herhangi bir* sayfa scroll pozisyonu için, aktif menü öğesi mevcut görüntülenen bölümle eşleşmelidir
**Doğrular: Gereksinim 2.4**

### Özellik 2: Modal durumu yönetimi
*Herhangi bir* modal açıldığında, arka plan kaydırması devre dışı bırakılmalı ve modal kapatıldığında geri yüklenmelidir
**Doğrular: Gereksinim 3.1, 3.2**

### Özellik 3: Form validasyonu
*Herhangi bir* form gönderimi için, tüm zorunlu alanlar doldurulmuş ve geçerli format kontrolü yapılmış olmalıdır
**Doğrular: Gereksinim 3.3, 3.4, 5.2**

### Özellik 4: Responsive davranış
*Herhangi bir* ekran boyutu için, navbar içeriği uygun şekilde görüntülenmeli (desktop'ta tam menü, mobilde hamburger)
**Doğrular: Gereksinim 1.5**

### Özellik 5: Smooth scroll davranışı
*Herhangi bir* navigasyon menü öğesi tıklaması için, sayfa yumuşak bir şekilde hedef bölüme kaydırılmalıdır
**Doğrular: Gereksinim 1.4, 2.1, 2.2, 2.3**

### Özellik 6: URL hash senkronizasyonu
*Herhangi bir* bölüm değişikliği için, URL hash'i mevcut bölümü yansıtmalıdır
**Doğrular: Gereksinim 2.5**

### Özellik 7: Ekip kartı etkileşimi
*Herhangi bir* ekip üyesi kartına tıklandığında, o üyenin detaylı profil modal'ı açılmalıdır
**Doğrular: Gereksinim 4.5**

### Özellik 8: Özellik kartı etkileşimi
*Herhangi bir* ürün özelliği kartına tıklandığında, o özelliğin detaylı açıklama modal'ı açılmalıdır
**Doğrular: Gereksinim 6.2**

### Özellik 9: İletişim formu veri kaydı
*Herhangi bir* geçerli iletişim formu gönderimi için, form verisi Supabase veritabanına başarıyla kaydedilmelidir
**Doğrular: Gereksinim 5.3**

### Özellik 10: Yasal modal açılması
*Herhangi bir* yasal sayfa linkine (Gizlilik Politikası, Kullanım Şartları) tıklandığında, ilgili yasal metin modal'da görüntülenmelidir
**Doğrular: Gereksinim 7.5**

## Hata Yönetimi

### Form Hataları
- Geçersiz email formatı
- Boş zorunlu alanlar
- Şifre uyumsuzluğu (kayıt)
- Network bağlantı hataları

### Navigation Hataları
- Geçersiz hash değerleri
- Mevcut olmayan bölüm referansları
- Scroll pozisyon hesaplama hataları

### Modal Hataları
- Çoklu modal açılması
- Modal backdrop tıklama yönetimi
- Keyboard navigation (ESC tuşu)

## Test Stratejisi

### Unit Testler
- Form validasyon fonksiyonları
- Navigation helper fonksiyonları
- Modal state yönetimi
- Responsive breakpoint hesaplamaları

### Property-Based Testler
- Navigation tutarlılığı testi (fast-check ile 100+ iterasyon)
- Form validasyon testi (rastgele input kombinasyonları)
- Responsive davranış testi (rastgele ekran boyutları)
- Smooth scroll testi (rastgele hedef pozisyonları)
- URL hash senkronizasyon testi

### Integration Testler
- Tam sayfa navigasyon akışı
- Modal açma/kapama döngüleri
- Form gönderme ve yanıt işleme
- Responsive geçişler

Property-based testler fast-check kütüphanesi kullanılarak minimum 100 iterasyon ile çalıştırılacak. Her test, tasarım dokümanındaki ilgili özellik numarasıyla etiketlenecek.