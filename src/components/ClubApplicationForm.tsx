import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { submitClubInquiry } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

interface ClubApplicationFormProps {
  onClose: () => void;
}

const ClubApplicationForm = ({ onClose }: ClubApplicationFormProps) => {
  const { t } = useLanguage();
  
  // Add modal-open class to body when component mounts
  useEffect(() => {
    document.body.classList.add('modal-open');
    
    // Handle ESC key press
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);
  const [formData, setFormData] = useState({
    clubName: "",
    university: "",
    memberCount: "",
    contactName: "",
    email: "",
    linkedinProfile: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic validation
    if (!formData.clubName.trim()) {
      setError(t('club.errorClubName'));
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.university.trim()) {
      setError(t('club.errorUniversity'));
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.contactName.trim()) {
      setError(t('club.errorContactName'));
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.email.trim()) {
      setError(t('club.errorEmail'));
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t('club.errorEmailInvalid'));
      setIsSubmitting(false);
      return;
    }

    try {
      await submitClubInquiry({
        club_name: formData.clubName,
        university: formData.university,
        member_count: formData.memberCount || undefined,
        contact_name: formData.contactName,
        email: formData.email,
        linkedin_profile: formData.linkedinProfile || undefined
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setError(error instanceof Error ? error.message : t('club.errorGeneral'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="bg-background border border-border/30 rounded-xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">{t('club.success')}</h3>
          <p className="text-muted-foreground mb-6">
            {t('club.successMessage')}
          </p>
          <Button onClick={onClose} className="w-full">
            {t('form.close')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-background border border-border/30 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto modal-content">
        <div className="flex items-center justify-between p-6 border-b border-border/30">
          <div>
            <h2 className="text-2xl font-bold">{t('club.title')}</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {t('club.subtitle')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="clubName" className="block text-sm font-medium mb-2">
              {t('club.clubName')} *
            </label>
            <input
              type="text"
              id="clubName"
              name="clubName"
              required
              value={formData.clubName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border/30 rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="university" className="block text-sm font-medium mb-2">
              {t('club.university')} *
            </label>
            <input
              type="text"
              id="university"
              name="university"
              required
              value={formData.university}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border/30 rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            />
          </div>

          <div>
            <label htmlFor="memberCount" className="block text-sm font-medium mb-2">
              {t('club.memberCount')}
            </label>
            <select
              id="memberCount"
              name="memberCount"
              value={formData.memberCount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border/30 rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            >
              <option value="">{t('club.selectOption')}</option>
              <option value="0-100">0–100</option>
              <option value="100-500">100–500</option>
              <option value="500-1000">500–1000</option>
              <option value="1000+">1000+</option>
            </select>
          </div>

          <div>
            <label htmlFor="contactName" className="block text-sm font-medium mb-2">
              {t('club.contactName')} *
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              required
              value={formData.contactName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border/30 rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t('club.email')} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border/30 rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            />
          </div>

          <div>
            <label htmlFor="linkedinProfile" className="block text-sm font-medium mb-2">
              {t('club.linkedin')}
            </label>
            <input
              type="url"
              id="linkedinProfile"
              name="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border/30 rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="pt-4">
            <p className="text-xs text-muted-foreground text-center mb-4">
              {t('club.note')}
            </p>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('club.submitting') : t('club.submit')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClubApplicationForm;