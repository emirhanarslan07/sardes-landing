import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t('nav.features'), href: "#neden-sardes" },
    { label: t('nav.clubs'), href: "#kimler-icin" },
    { label: t('nav.flow'), href: "#nasil-calisir" },
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
                className="w-12 h-12"
              />
              <div className="flex items-baseline gap-3">
                <span className="font-semibold tracking-tight font-poppins" style={{ fontSize: '1.5rem' }}>
                  Sardes
                </span>
                <span className="bg-primary/10 text-primary/70 px-1.5 py-0.5 rounded-full text-xs font-medium transform -translate-y-1">
                  BETA
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links - Orta (Tam Ortalı) */}
          <div className="hidden md:flex items-center justify-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-muted-foreground nav-link-enhanced"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Language Toggle + CTA - Sağ */}
          <div className="hidden md:flex items-center justify-end gap-4">
            <LanguageToggle />
            
            <Button 
              size="sm" 
              onClick={() => handleNavClick("#erken-erisim")}
              className="ml-1 text-sm font-medium btn-ripple"
            >
              {t('nav.signup')}
            </Button>
          </div>

          {/* Mobile Menu Button - Sağ (Mobile) */}
          <div className="md:hidden flex justify-end">
            <button
              className="p-1 -mr-1"
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
            
            {/* Mobile Language Toggle and CTA */}
            <div className="pt-2 border-t border-border/20 space-y-2">
              <div className="flex items-center justify-center">
                <LanguageToggle />
              </div>
              <Button 
                size="sm" 
                onClick={() => handleNavClick("#erken-erisim")}
                className="w-full text-sm font-medium"
              >
                {t('nav.signup')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
