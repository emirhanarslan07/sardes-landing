# 🚀 Sardes Landing Page - Production Checklist

## ✅ Supabase Güvenlik
- [ ] `supabase-production-security.sql` dosyasını Supabase SQL Editor'da çalıştır
- [ ] RLS aktif olduğunu doğrula (tablolar "restricted" olacak)
- [ ] Form testlerini yap (anonymous insert çalışmalı)

## ✅ Environment Variables
- [ ] Production ortamında `.env` dosyasını oluştur:
```bash
VITE_SUPABASE_URL=https://stxuvsumrlpjdkfaumos.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0eHV2c3VtcmxwamRrZmF1bW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMDAzNTgsImV4cCI6MjA4MTg3NjM1OH0.y61Jj0wxDu_OeJWjytamOfpqlHI3ZRjaN3B36iUt19Q
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

## ✅ Build & Deploy
- [ ] `npm run build` çalıştır
- [ ] Build hatasız tamamlandığını kontrol et
- [ ] `dist/` klasörünü hosting platformuna yükle

## ✅ Son Testler (Canlıda)
- [ ] Waitlist formu test et
- [ ] Kulüp formu test et
- [ ] Supabase'de verilerin geldiğini kontrol et
- [ ] Mobil responsive test et
- [ ] Farklı tarayıcılarda test et

## ✅ Monitoring
- [ ] Supabase Dashboard'da veri akışını izle
- [ ] Console hatalarını kontrol et
- [ ] Form gönderim başarı oranlarını takip et

## 🔧 Hosting Önerileri
- **Vercel**: Otomatik deployment, çok hızlı
- **Netlify**: Kolay setup, form handling
- **GitHub Pages**: Ücretsiz, basit

## 📊 Analytics (Opsiyonel)
- Google Analytics ID'sini gerçek ID ile değiştir
- Supabase Analytics'i aktif et
- Form conversion tracking ekle