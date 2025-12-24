import React, { createContext, useContext, useState } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Çeviri metinleri
const translations = {
  tr: {
    // Navbar
    'nav.what': 'Nedir?',
    'nav.features': 'Özellikler',
    'nav.who': 'Kimler İçin?',
    'nav.how': 'Nasıl Çalışır?',
    'nav.faq': 'SSS',
    'nav.signup': '✨Hemen Başla',
    
    // Hero Section
    'hero.badge': 'Davranış Odaklı Analiz',
    'hero.title': '<span class="text-primary">Sardes</span> ile yatırımcı davranışınızı keşfedin',
    'hero.subtitle': 'Yatırım kararlarında nasıl davrandığını hiç gözlemledin mi?',
    'hero.description': 'Sardes, gerçekçi piyasa senaryolarında verdiğiniz kararları gözlemler. Bilginizi değil; risk yaklaşımınızı, stres altındaki reflekslerinizi ve kayıp sonrası tepkilerinizi anlamaya odaklanır. Amaç, sonucu değil karar anındaki davranışı görünür kılmaktır.',
    'hero.disclaimer': 'Gerçek para yok • Finansal tavsiye yok • Sadece davranış analizi',
    'hero.cta': 'Erken Erişim İçin Kayıt Ol',
    'hero.feature1': 'Davranış Analizi',
    'hero.feature2': 'Gerçekçi Senaryolar',
    'hero.feature3': 'Anlık İçgörüler',
    
    // What Section
    'what.title': 'Yatırım Kararlarınıza Odaklanın',
    'what.subtitle': 'Yatırımcı davranışınızı anlamanın yeni yolu.',
    'what.card1.title': 'Gerçek Karar Deneyimi',
    'what.card1.desc': 'Teorik sorular yerine, kullanıcılar zaman baskısı ve belirsizlik içeren senaryolarda karar verir.',
    'what.card2.title': 'Davranış Odaklı Ölçüm',
    'what.card2.desc': 'Ne bildiğiniz değil, karar anında nasıl davrandığınız analiz edilir.',
    'what.card3.title': 'Gerçek Zamanlı Refleks Gözlemi',
    'what.card3.desc': 'Piyasa dalgalanmalarına tepkiler, kararlar verilirken gözlemlenir.',
    'what.bottom': 'Sardes, karar anında ne yaptığınıza odaklanır — ne bildiğinize değil.',
    
    // Why Section
    'why.title': 'Gerçek Verilerle Kararınızı Geliştirin',
    'why.subtitle': 'Gerçek Problemler. Gerçek İçgörüler.',
    'why.risk.title': 'Risk Yaklaşımı',
    'why.risk.problem': 'Problem',
    'why.risk.problemText': '"Risk toleransınız var mı?" gibi sorular nadiren gerçek davranışı yansıtır.',
    'why.risk.approach': 'Sardes\'in Yaklaşımı',
    'why.risk.approachText': 'Gerçekçi piyasa senaryolarında verilen kararlara dayalı risk alma eğiliminizi analiz eder.',
    'why.risk.provides': 'Ne Sağlar',
    'why.risk.providesText': 'Riskle ilişkinizin daha net ve gerçekçi bir anlayışı.',
    'why.stress.title': 'Stres Altında Karar Verme',
    'why.stress.problemText': 'Stresin kararları nasıl etkilediğini o anda fark etmek zordur.',
    'why.stress.approachText': 'Zaman baskısı ve belirsizlik içeren senaryolarla karar reflekslerini inceler.',
    'why.stress.providesText': 'Baskı altında nasıl karar verdiğinize dair anlamlı içgörüler.',
    'why.loss.title': 'Kayıp Sonrası Tepki',
    'why.loss.problemText': 'Çoğu kişi kayıpların karar davranışını nasıl değiştirdiğini fark etmez.',
    'why.loss.approachText': 'Kayıp sonrası kararları ayrı bir davranışsal perspektiften analiz eder.',
    'why.loss.providesText': 'Kayıpların karar verme sürecinizi nasıl etkilediğinin daha iyi anlaşılması.',
    
    // Who Section
    'who.title': 'Sardes Kimler İçin?',
    'who.subtitle': 'Sardes, finansal karar alma biçimini gerçek kararlar üzerinden anlamak isteyenler için tasarlandı.',
    'who.individual.title': 'Bireysel Kullanıcılar',
    'who.individual.item1': 'Gerçekçi piyasa senaryolarında yatırım kararlarını test etme',
    'who.individual.item2': 'Risk yaklaşımını ve stresle ilgili tepkileri gözlemleme',
    'who.individual.item3': 'Kayıp sonrası davranışların nasıl değiştiğini anlama',
    'who.individual.item4': 'Yatırımcı profilinizin objektif bir görünümünü oluşturma',
    'who.individual.item5': 'Karar tarzınızın zaman içinde nasıl geliştiğini takip etme',
    'who.clubs.title': 'Kulüpler ve Öğrenci Toplulukları',
    'who.clubs.subtitle': 'Öğrenci Kulüpleri İçin',
    'who.clubs.item1': 'Üyelere ortak bir simülasyon deneyimi sunma',
    'who.clubs.item2': 'Gerçekçi piyasa koşullarında birlikte karar verme pratiği',
    'who.clubs.item3': 'Etkinlik, workshop ve seminerlere entegre edilebilir yapı',
    'who.clubs.item4': 'Üyelerin karar davranışlarını birlikte gözlemleme ve tartışma',
    'who.clubs.item5': 'Deneyimsel içerik yoluyla katılımı artırma',
    
    // How Section
    'how.title': 'Karar Yolculuğunuz Nasıl İşliyor?',
    'how.subtitle': 'Yatırımcı davranışınızı üç basit adımda keşfedin.',
    'how.step1.title': 'Simülasyonu Tamamlayın',
    'how.step1.desc': 'Gerçek piyasa koşullarını yansıtan senaryolarda kararlar verin.',
    'how.step2.title': 'Analiz Raporunu İnceleyin',
    'how.step2.desc': 'Kararlarınızdan oluşturulan davranış temelli yatırımcı profilinizi keşfedin.',
    'how.step3.title': 'Sonuçlarınızı Görün',
    'how.step3.desc': 'Net metrikler aracılığıyla güçlü yönlerinizi ve gelişim alanlarınızı belirleyin.',
    
    // Analysis Example
    'analysis.title': 'Davranışsal Analiz Örneği',
    'analysis.subtitle': 'Sardes ile yatırımcı davranış profilinizi keşfedin.',
    'analysis.risk': 'Risk Skoru',
    'analysis.stress': 'Stres Yönetimi',
    'analysis.consistency': 'Tutarlılık',
    'analysis.loss': 'Kayıp Tepkisi',
    'analysis.strategy': 'Strateji Uyumu',
    'analysis.adaptability': 'Uyum Yeteneği',
    'analysis.note': '* Gösterilen değerler temsilidir. Bunlar performans veya başarı puanları değil, davranışsal eğilimlerin göstergeleridir.',
    
    // FAQ
    'faq.title': 'Merak Ettikleriniz',
    
    // Features Section
    'features.title': 'Sardes Özellikleri',
    'faq.q1': 'Bu bir yatırım oyunu mu?',
    'faq.a1': 'Hayır. Sardes bir oyun değildir. Gerçek para kullanılmaz ve kazanç hedefi yoktur. Amaç, simüle edilmiş senaryolarda verilen kararlar üzerinden davranışsal analiz yapmaktır.',
    'faq.q2': 'Finansal tavsiye veriyor musunuz?',
    'faq.a2': 'Hayır. Sardes herhangi bir finansal tavsiye sunmaz. Sunulan çıktılar, yatırım kararlarının doğruluğunu değil, karar alma davranışlarını analiz eder.',
    'faq.q3': 'Gerçek para söz konusu mu?',
    'faq.a3': 'Hayır. Sardes\'te gerçek para ile işlem yapılmaz. Tüm senaryolar simülasyon ortamında gerçekleşir.',
    'faq.q4': 'Sonuçlar bir puan veya performans notu mu?',
    'faq.a4': 'Hayır. Gösterilen metrikler bir başarı veya yeterlilik puanı değildir. Karar davranışlarını ve eğilimleri anlamaya yönelik göstergelerdir.',
    'faq.q5': 'Sardes\'i kimler kullanabilir?',
    'faq.a5': 'Sardes, yatırım karar alma davranışını anlamak isteyen bireyler, öğrenci toplulukları ve kurumlar için tasarlanmıştır.',
    'faq.q6': 'Verilerim nasıl kullanılıyor?',
    'faq.a6': 'Toplanan veriler yalnızca davranışsal analiz amacıyla kullanılır. Gerçek hesap veya finansal bilgi istenmez. Kullanıcı verileri gizlilik politikası kapsamında korunur.',
    
    // CTA Section
    'cta.title': '<span class="text-primary">Sardes</span>\'i Deneyimleyen İlk Kişiler Arasında Olun',
    'cta.subtitle': 'Karar davranışınızı gözlemlemek için simülasyon tabanlı bir deneyime katılın.',
    'cta.feature1': 'Bireysel farkındalık',
    'cta.feature2': 'Gerçekçi senaryolar',
    'cta.feature3': 'Kişisel gelişime odaklı',
    'cta.button': 'Erken Erişime Katıl',
    'cta.clubs': 'Kulüp veya öğrenci topluluğu musunuz?',
    'cta.clubsLink': 'Kulüp olarak Sardes\'i keşfedin →',
    
    // Forms
    'form.email': 'E-posta adresiniz',
    'form.userType': 'Kendini hangisine daha yakın hissediyorsun? (Opsiyonel)',
    'form.userTypeNote': 'Bu bilgi, Sardes\'i kimlerin kullandığını daha iyi anlamak için sorulur.',
    'form.selectOption': 'Seçim yap',
    'form.student': 'Üniversite öğrencisiyim',
    'form.graduate': 'Yeni mezunum',
    'form.working': 'Çalışıyorum',
    'form.other': 'Diğer',
    'form.submit': 'Erken Erişim İçin Kayıt Ol',
    'form.submitting': 'Kaydediliyor...',
    'form.success': 'Katıldın!',
    'form.successMessage': 'Sardes hazır olduğunda seni bilgilendireceğiz.',
    'form.error': 'Bir hata oluştu. Lütfen tekrar deneyin.',
    'form.emailRequired': 'Email adresi zorunludur',
    'form.close': 'Kapat',
    'form.back': 'Geri Dön',
    
    // Club Application Form
    'club.title': 'Kulüpler İçin Sardes Deneyimi',
    'club.subtitle': 'Sardes\'i kulüp etkinliklerinde, workshop\'larda veya toplu kullanımda değerlendirmek isteyen öğrenci toplulukları için tasarlanmıştır.\n\nAşağıdaki bilgiler, sizinle iletişime geçerek kulübünüze uygun bir Sardes deneyimi planlamak amacıyla alınır.',
    'club.clubName': 'Kulüp Adı',
    'club.university': 'Üniversite',
    'club.memberCount': 'Yaklaşık Üye Sayısı',
    'club.selectOption': '(Seçiniz)',
    'club.contactName': 'Yetkili Kişinin Adı Soyadı',
    'club.email': 'İletişim E-posta Adresi',
    'club.linkedin': 'LinkedIn Hesabınız (Daha hızlı iletişim kurabilmemiz için)',
    'club.note': 'Paylaşılan bilgiler yalnızca iletişim kurmak ve uygun bir Sardes deneyimi oluşturmak için kullanılır.',
    'club.submit': 'İletişime Geç',
    'club.submitting': 'Gönderiliyor...',
    'club.success': 'Başvuru Alındı',
    'club.successMessage': 'Başvurunuz başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
    'club.errorClubName': 'Kulüp adı gereklidir.',
    'club.errorUniversity': 'Üniversite adı gereklidir.',
    'club.errorContactName': 'Yetkili kişinin adı soyadı gereklidir.',
    'club.errorEmail': 'E-posta adresi gereklidir.',
    'club.errorEmailInvalid': 'Geçerli bir e-posta adresi girin.',
    'club.errorGeneral': 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
    
    // Buttons
    'btn.joinEarlyAccess': 'Erken Erişime Katıl',
    'btn.learnMore': 'Daha Fazla Bilgi',
    
    // Footer
    'footer.description': 'Finansal karar verme süreçlerinizi analiz eden ve geliştiren yapay zeka destekli platform.\nGerçek davranış verilerine dayalı analiz ile yatırımcı karakterinizi keşfedin.',
    'footer.contact': 'İletişim',
    'footer.legal': 'Yasal',
    'footer.privacy': 'Gizlilik Politikası',
    'footer.terms': 'Kullanım Şartları',
    'footer.cookies': 'Çerez Politikası',
    'footer.followUs': 'Bizi takip edin',
    'footer.copyright': '© 2025 Sardes. Tüm hakları saklıdır.',
  },
  en: {
    // Navbar
    'nav.what': 'What?',
    'nav.features': 'Features',
    'nav.who': 'Who For?',
    'nav.how': 'How It Works?',
    'nav.faq': 'FAQ',
    'nav.signup': '✨Get Started',
    
    // Hero Section
    'hero.badge': 'Behavior-Driven Analysis',
    'hero.title': 'Discover your investor behavior with <span class="text-primary">Sardes</span>',
    'hero.subtitle': 'Have you ever observed how you behave in investment decisions?',
    'hero.description': 'Sardes observes the decisions you make in realistic market scenarios. It focuses on understanding not your knowledge, but your risk approach, reflexes under stress, and reactions after losses. The goal is to make visible the behavior at the moment of decision, not the outcome.',
    'hero.disclaimer': 'No real money • No financial advice • Only behavioral analysis',
    'hero.cta': 'Sign Up for Early Access',
    'hero.feature1': 'Behavior Analysis',
    'hero.feature2': 'Realistic Scenarios',
    'hero.feature3': 'Instant Insights',
    
    // What Section
    'what.title': 'Focus on Your Investment Decisions',
    'what.subtitle': 'A new way to understand your investor behavior.',
    'what.card1.title': 'Real Decision Experience',
    'what.card1.desc': 'Instead of theoretical questions, users make decisions in scenarios involving time pressure and uncertainty.',
    'what.card2.title': 'Behavior-Focused Measurement',
    'what.card2.desc': 'Not what you know, but how you behave at the moment of decision is analyzed.',
    'what.card3.title': 'Real-Time Reflex Observation',
    'what.card3.desc': 'Reactions to market fluctuations are observed as decisions are made.',
    'what.bottom': 'Sardes focuses on what you do at the moment of decision — not what you know.',
    
    // Why Section
    'why.title': 'Improve Your Decisions with Real Data',
    'why.subtitle': 'Real Problems. Real Insights.',
    'why.risk.title': 'Risk Approach',
    'why.risk.problem': 'Problem',
    'why.risk.problemText': 'Questions like "Are you risk-tolerant?" rarely reflect real behavior.',
    'why.risk.approach': 'Sardes\' Approach',
    'why.risk.approachText': 'Analyzes your risk-taking tendency based on decisions made in realistic market scenarios.',
    'why.risk.provides': 'What it provides',
    'why.risk.providesText': 'A clearer and more realistic understanding of your relationship with risk.',
    'why.stress.title': 'Decision-Making Under Stress',
    'why.stress.problemText': 'It\'s hard to notice how stress affects decisions in the moment.',
    'why.stress.approachText': 'Examines decision reflexes through scenarios with time pressure and uncertainty.',
    'why.stress.providesText': 'Meaningful insights into how you make decisions under pressure.',
    'why.loss.title': 'Reaction After Loss',
    'why.loss.problemText': 'Most people don\'t realize how losses change their decision behavior.',
    'why.loss.approachText': 'Analyzes post-loss decisions from a separate behavioral perspective.',
    'why.loss.providesText': 'A better understanding of how losses influence your decision-making process.',
    
    // Who Section
    'who.title': 'Who Is Sardes For?',
    'who.subtitle': 'Sardes is designed for those who want to understand their financial decision-making through real decisions.',
    'who.individual.title': 'Individual Users',
    'who.individual.item1': 'Test investment decisions in realistic market scenarios',
    'who.individual.item2': 'Observe risk approach and stress-related reactions',
    'who.individual.item3': 'Understand how behavior changes after losses',
    'who.individual.item4': 'Build an objective view of your investor profile',
    'who.individual.item5': 'Track how your decision style evolves over time',
    'who.clubs.title': 'Clubs & Student Communities',
    'who.clubs.subtitle': 'For Student Clubs',
    'who.clubs.item1': 'Offer members a shared simulation experience',
    'who.clubs.item2': 'Practice decision-making together in realistic market conditions',
    'who.clubs.item3': 'Integrate into events, workshops, and seminars',
    'who.clubs.item4': 'Observe and discuss members\' decision behaviors collectively',
    'who.clubs.item5': 'Increase engagement through experiential content',
    
    // How Section
    'how.title': 'How Does Your Decision Journey Work?',
    'how.subtitle': 'Discover your investor behavior in three simple steps.',
    'how.step1.title': 'Complete the Simulation',
    'how.step1.desc': 'Make decisions in scenarios that reflect real market conditions.',
    'how.step2.title': 'Review the Analysis Report',
    'how.step2.desc': 'Explore your behavior-based investor profile created from your decisions.',
    'how.step3.title': 'See Your Results',
    'how.step3.desc': 'Identify strengths and areas for improvement through clear metrics.',
    
    // Analysis Example
    'analysis.title': 'Behavioral Analysis Example',
    'analysis.subtitle': 'Discover your investor behavior profile with Sardes.',
    'analysis.risk': 'Risk Score',
    'analysis.stress': 'Stress Management',
    'analysis.consistency': 'Consistency',
    'analysis.loss': 'Loss Reaction',
    'analysis.strategy': 'Strategy Alignment',
    'analysis.adaptability': 'Adaptability',
    'analysis.note': '* The values shown are representative. They are not performance or success scores, but indicators of behavioral tendencies.',
    
    // FAQ
    'faq.title': 'What You Wonder',
    
    // Features Section
    'features.title': 'Sardes Features',
    'faq.q1': 'Is this an investment game?',
    'faq.a1': 'No. Sardes is not a game. Real money is not used and there is no profit goal. The purpose is to conduct behavioral analysis through decisions made in simulated scenarios.',
    'faq.q2': 'Do you provide financial advice?',
    'faq.a2': 'No. Sardes does not provide any financial advice. The outputs analyze decision-making behaviors, not the correctness of investment decisions.',
    'faq.q3': 'Is real money involved?',
    'faq.a3': 'No. Real money transactions are not made in Sardes. All scenarios take place in a simulation environment.',
    'faq.q4': 'Are the results a score or performance rating?',
    'faq.a4': 'No. The metrics shown are not success or competency scores. They are indicators for understanding decision behaviors and tendencies.',
    'faq.q5': 'Who can use Sardes?',
    'faq.a5': 'Sardes is designed for individuals, student communities, and institutions who want to understand investment decision-making behavior.',
    'faq.q6': 'How is my data used?',
    'faq.a6': 'Collected data is used only for behavioral analysis purposes. Real account or financial information is not requested. User data is protected under the privacy policy.',
    
    // CTA Section
    'cta.title': 'Be Among the First to Experience <span class="text-primary">Sardes</span>',
    'cta.subtitle': 'Join a simulation-based experience to observe your decision behavior.',
    'cta.feature1': 'Individual awareness',
    'cta.feature2': 'Realistic scenarios',
    'cta.feature3': 'Focused on personal development',
    'cta.button': 'Join Early Access',
    'cta.clubs': 'Are you a club or student community?',
    'cta.clubsLink': 'Discover Sardes as a club →',
    
    // Forms
    'form.email': 'Your email address',
    'form.userType': 'Which one do you feel closer to? (Optional)',
    'form.userTypeNote': 'This information is asked to better understand who uses Sardes.',
    'form.selectOption': 'Make a selection',
    'form.student': 'I am a university student',
    'form.graduate': 'I am a recent graduate',
    'form.working': 'I am working',
    'form.other': 'Other',
    'form.submit': 'Sign Up for Early Access',
    'form.submitting': 'Submitting...',
    'form.success': 'You\'re in!',
    'form.successMessage': 'We\'ll notify you when Sardes is ready.',
    'form.error': 'An error occurred. Please try again.',
    'form.emailRequired': 'Email address is required',
    'form.close': 'Close',
    'form.back': 'Go Back',
    
    // Club Application Form
    'club.title': 'Sardes Experience for Clubs',
    'club.subtitle': 'Designed for student communities who want to evaluate Sardes in club events, workshops, or group usage.\n\nThe information below is collected to contact you and plan a suitable Sardes experience for your club.',
    'club.clubName': 'Club Name',
    'club.university': 'University',
    'club.memberCount': 'Approximate Member Count',
    'club.selectOption': '(Select)',
    'club.contactName': 'Contact Person\'s Full Name',
    'club.email': 'Contact Email Address',
    'club.linkedin': 'Your LinkedIn Profile (For faster communication)',
    'club.note': 'Shared information is used only to communicate and create an appropriate Sardes experience.',
    'club.submit': 'Get in Touch',
    'club.submitting': 'Submitting...',
    'club.success': 'Application Received',
    'club.successMessage': 'Your application has been successfully submitted. We will get back to you as soon as possible.',
    'club.errorClubName': 'Club name is required.',
    'club.errorUniversity': 'University name is required.',
    'club.errorContactName': 'Contact person\'s full name is required.',
    'club.errorEmail': 'Email address is required.',
    'club.errorEmailInvalid': 'Please enter a valid email address.',
    'club.errorGeneral': 'An unexpected error occurred. Please try again.',
    
    // Buttons
    'btn.joinEarlyAccess': 'Join Early Access',
    'btn.learnMore': 'Learn More',
    
    // Footer
    'footer.description': 'An AI-powered platform that analyzes and improves your financial decision-making processes.\nDiscover your investor character through analysis based on real behavioral data.',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.followUs': 'Follow us',
    'footer.copyright': '© 2025 Sardes. All rights reserved.',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'tr';
    }
    return 'tr';
  });

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}