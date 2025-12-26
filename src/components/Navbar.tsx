import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t('nav.what'), href: "#ne-yapiyor" },
    { label: t('nav.features'), href: "#neden-sardes" },
    { label: t('nav.who'), href: "#kimler-icin" },
    { label: t('nav.how'), href: "#nasil-calisir" },
    { label: t('nav.faq'), href: "#sss" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // Handle section scrolling
    if (href.startsWith('#')) {
      // Smooth scroll to section - center it vertically on screen
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        const navbarHeight = 80; // Account for navbar height
        
        // Calculate position to center the section vertically
        // Position = element top - (window height / 2) + (element height / 2) + navbar offset
        const middle = absoluteElementTop - (windowHeight / 2) + (elementHeight / 2) - navbarHeight;
        
        window.scrollTo({
          top: Math.max(0, middle), // Ensure we don't scroll above the page
          behavior: 'smooth'
        });
      }
      return;
    }
    
    // Handle external links (fallback)
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 nav-interactive">
      <div className="max-w-7xl mx-auto bg-card/30 backdrop-blur-md border border-primary/30 rounded-2xl px-4 py-2 shadow-lg shadow-black/10">
        <div className="grid grid-cols-3 items-center">
          {/* Logo - Sol */}
          <div className="flex justify-start">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-0.5 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/sardes-logo.png" 
                alt="Sardes Logo" 
                className="w-10 h-10 md:w-12 md:h-12"
              />
              <div className="flex items-center gap-2 md:gap-3">
                <span className="font-semibold tracking-tight font-poppins text-lg md:text-2xl">
                  Sardes
                </span>
                <span className="bg-primary/10 text-primary/70 px-1 py-0.5 md:px-1.5 rounded-full text-xs font-medium">
                  BETA
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links - Orta (Desktop) / Empty (Mobile) */}
          <div className="flex items-center justify-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm font-medium text-muted-foreground nav-link-enhanced whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language Toggle + CTA (Desktop) / Mobile CTA + Menu Button (Mobile) */}
          <div className="flex items-center justify-end">
            {/* Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageToggle />
              
              <Button 
                size="sm" 
                onClick={() => handleNavClick("#erken-erisim")}
                className="ml-1 text-sm font-medium btn-badge-modern flex items-center gap-1.5"
              >
                {t('nav.signup')}
              </Button>
            </div>

            {/* Mobile CTA + Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <Button 
                size="sm" 
                onClick={() => handleNavClick("#erken-erisim")}
                className="text-xs px-2 py-1.5 btn-badge-modern flex items-center gap-1"
              >
                <span>{t('nav.signup')}</span>
              </Button>
              <button
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-md border border-primary/30 rounded-2xl shadow-lg shadow-black/10">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Language Toggle */}
            <div className="pt-2 border-t border-border/20 space-y-2">
              <div className="flex items-center justify-center">
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
