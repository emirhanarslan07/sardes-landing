// Google Analytics 4 configuration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_TRACKING_ID) {
    console.warn('Google Analytics tracking ID not found');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Initialize gtag function
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.onload = () => {
    console.log('Google Analytics script loaded successfully');
    // Configure GA after script loads
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  };
  script.onerror = () => {
    console.error('Failed to load Google Analytics script');
  };
  
  document.head.appendChild(script);
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: title,
  });
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track CTA clicks
export const trackCTAClick = (buttonName: string) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || !window.gtag) return;
  
  try {
    window.gtag('event', 'cta_click', {
      button_name: buttonName,
      event_category: 'engagement',
      event_label: buttonName
    });
    
    console.log('CTA click tracked:', buttonName);
  } catch (error) {
    console.error('CTA tracking error:', error);
  }
};

// Track waitlist signup
export const trackWaitlistSignup = (_email: string) => {
  // Extra safety checks
  if (!GA_TRACKING_ID) {
    console.log('GA tracking disabled - no tracking ID');
    return;
  }
  
  if (typeof window === 'undefined') {
    console.log('GA tracking disabled - no window object');
    return;
  }
  
  if (!window.gtag) {
    console.log('GA tracking disabled - gtag not loaded yet');
    return;
  }
  
  try {
    trackEvent('signup', 'waitlist', 'email_signup', 1);
    
    // Track conversion
    window.gtag('event', 'conversion', {
      send_to: GA_TRACKING_ID,
      event_category: 'engagement',
      event_label: 'waitlist_signup'
    });
    
    console.log('GA tracking successful');
  } catch (error) {
    console.error('GA tracking error:', error);
  }
};