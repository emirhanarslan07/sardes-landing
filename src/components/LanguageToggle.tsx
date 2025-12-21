import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="w-10 h-8 p-0 text-sm font-medium text-white hover:text-white"
      aria-label="Toggle language"
    >
      {language === 'tr' ? 'EN' : 'TR'}
    </Button>
  );
}