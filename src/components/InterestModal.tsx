import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitInterest, submitClubApplication } from "@/lib/supabase";
import { interestEmitter } from "@/hooks/useWaitlistCount";
import { useLanguage } from "@/contexts/LanguageContext";

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'individual' | 'club';
}

const InterestModal = ({ isOpen, onClose, type = 'individual' }: InterestModalProps) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const [clubName, setClubName] = useState("");
  const [university, setUniversity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const interestOptions = [
    { value: 'behavioral_analysis', label: t('interest.option1') },
    { value: 'realistic_scenarios', label: t('interest.option2') },
    { value: 'self_awareness', label: t('interest.option3') },
    { value: 'educational_potential', label: t('interest.option4') },
    { value: 'exploring', label: t('interest.option5') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError(t('club.errorEmail'));
      return;
    }

    if (type === 'individual' && !selectedInterest) {
      setError(t('interest.error'));
      return;
    }

    if (type === 'club') {
      if (!clubName.trim()) {
        setError(t('club.errorClubName'));
        return;
      }
      if (!university.trim()) {
        setError(t('club.errorUniversity'));
        return;
      }
    }

    setIsSubmitting(true);
    setError("");

    // Track form submission
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', `${type}_form_submit`, {
        event_category: 'engagement',
        event_label: type === 'individual' ? 'hero_interest_modal' : 'club_application_modal'
      });
    }

    try {
      if (type === 'individual') {
        console.log('Form data being submitted:', {
          email: email.trim(),
          interest_reason: selectedInterest
        });
        
        const result = await submitInterest({
          email: email.trim(),
          interest_reason: selectedInterest
        });
        
        console.log('Submission result:', result);
        
        // Emit event to update counter
        interestEmitter.emit();
      } else {
        console.log('Club application being submitted:', {
          club_name: clubName.trim(),
          university: university.trim(),
          email: email.trim()
        });
        
        const result = await submitClubApplication({
          club_name: clubName.trim(),
          university: university.trim(),
          email: email.trim()
        });
        
        console.log('Club application result:', result);
      }
      
      setIsSuccess(true);
    } catch (error) {
      console.error(`${type} submission error:`, error);
      setError(error instanceof Error ? error.message : t('club.errorGeneral'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setSelectedInterest("");
    setClubName("");
    setUniversity("");
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
            <p className="text-muted-foreground">
              {type === 'individual' 
                ? t('interest.successMessage')
                : t('club.successMessage')
              }
            </p>
          </div>
        ) : (
          // Form State
          <>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">
                {type === 'individual' 
                  ? t('interest.title')
                  : t('club.title')
                }
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {type === 'individual' 
                  ? t('interest.subtitle')
                  : t('club.subtitle')
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {type === 'club' && (
                <>
                  {/* Club Name Input */}
                  <div>
                    <label htmlFor="clubName" className="block text-sm font-medium mb-2">
                      {t('club.clubName')} *
                    </label>
                    <input
                      type="text"
                      id="clubName"
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                      placeholder={t('club.clubName')}
                      className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      required
                    />
                  </div>

                  {/* University Input */}
                  <div>
                    <label htmlFor="university" className="block text-sm font-medium mb-2">
                      {t('club.university')} *
                    </label>
                    <input
                      type="text"
                      id="university"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder={t('club.university')}
                      className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                </>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {type === 'club' ? t('club.email') : t('interest.email')} *
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

              {type === 'individual' && (
                /* Interest Options */
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
                          required
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

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
                className="w-full btn-badge-modern"
              >
                {isSubmitting 
                  ? (type === 'individual' ? t('interest.submitting') : t('club.submitting'))
                  : (type === 'individual' ? t('interest.submit') : t('club.submit'))
                }
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InterestModal;