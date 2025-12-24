import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InterestModal = ({ isOpen, onClose }: InterestModalProps) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const interestOptions = [
    { value: 'behavioral_analysis', label: t('interest.option1') },
    { value: 'realistic_scenarios', label: t('interest.option2') },
    { value: 'personal_development', label: t('interest.option3') },
    { value: 'educational_potential', label: t('interest.option4') },
    { value: 'other', label: t('interest.option5') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email adresi gereklidir');
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Track form submission
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'interest_form_submit', {
          event_category: 'engagement',
          event_label: 'hero_interest_modal'
        });
      }

      const { error: supabaseError } = await supabase
        .from('interest_submissions')
        .insert([
          {
            email: email.trim(),
            interest_reason: selectedInterest || null,
            source: 'hero_modal',
            created_at: new Date().toISOString()
          }
        ]);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        setError(t('interest.error'));
        return;
      }

      setIsSuccess(true);
      
      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setEmail("");
        setSelectedInterest("");
        setIsSuccess(false);
        onClose();
      }, 2000);

    } catch (err) {
      console.error('Error submitting interest:', err);
      setError(t('interest.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setSelectedInterest("");
    setError("");
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card/95 backdrop-blur-md border border-primary/30 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          // Success State
          <div className="text-center py-4">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">{t('interest.success')}</h3>
            <p className="text-muted-foreground">{t('interest.successMessage')}</p>
          </div>
        ) : (
          // Form State
          <>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">{t('interest.title')}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('interest.subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('interest.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('interest.emailPlaceholder')}
                  className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Interest Options */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  {t('interest.question')}
                </label>
                <div className="space-y-2">
                  {interestOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="interest"
                        value={option.value}
                        checked={selectedInterest === option.value}
                        onChange={(e) => setSelectedInterest(e.target.value)}
                        className="text-primary focus:ring-primary/50"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? t('interest.submitting') : t('interest.submit')}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InterestModal;