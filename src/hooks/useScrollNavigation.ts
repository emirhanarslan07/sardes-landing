import { useState, useEffect, useCallback } from 'react';

interface UseScrollNavigationProps {
  sections: string[];
  offset?: number;
}

export const useScrollNavigation = ({ sections, offset = 100 }: UseScrollNavigationProps) => {
  const [activeSection, setActiveSection] = useState(sections[0] || 'home');

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash
      window.history.pushState(null, '', `#${sectionId}`);
      setActiveSection(sectionId);
    }
  }, [offset]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset + 50;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          if (activeSection !== sections[i]) {
            setActiveSection(sections[i]);
            // Update URL hash without scrolling
            const newHash = `#${sections[i]}`;
            if (window.location.hash !== newHash) {
              window.history.replaceState(null, '', newHash);
            }
          }
          break;
        }
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && sections.includes(hash)) {
        setActiveSection(hash);
      }
    };

    // Set initial section from URL hash
    const initialHash = window.location.hash.slice(1);
    if (initialHash && sections.includes(initialHash)) {
      setActiveSection(initialHash);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);

    // Initial scroll position check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [sections, offset, activeSection]);

  return {
    activeSection,
    scrollToSection,
    setActiveSection
  };
};