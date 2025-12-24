import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitInterest } from "@/lib/supabase";
import { interestEmitter } from "@/hooks/useWaitlistCount";

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InterestModal = ({ isOpen, onClose }: InterestModalProps) => {
  const [email, setEmail] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const interestOptions = [
    { value: 'behavioral_analysis', label: 'Davranış analizi yaklaşımı' },
    { value: 'realistic_scenarios', label: 'Gerçekçi piyasa senaryoları' },
    { value: 'self_awareness', label: 'Kişisel gelişim odağı' },
    { value: 'educational_potential', label: 'Eğitim/öğrenme potansiyeli' },
    { value: 'exploring', label: 'Diğer' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email adresi gereklidir');
      return;
    }

    if (!selectedInterest) {
      setError('Lütfen bir seçenek seçin');
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Track form submission
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'interest_form_submit', {
        event_category: 'engagement',
        event_label: 'hero_interest_modal'
      });
    }

    try {
      console.log('Form data being submitted:', {
        email: email.trim(),
        interest_reason: selectedInterest
      });
      
      const result = await submitInterest({
        email: email.trim(),
        interest_reason: selectedInterest
      });
      
      console.log('Submission result:', result);
      setIsSuccess(true);
      
      // Emit event to update counter
      interestEmitter.emit();
    } catch (error) {
      console.error('Interest submission error:', error);
      setError(error instanceof Error ? error.message : 'Bir hata oluştu. Lütfen tekrar deneyin.');
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
            <h3 className="text-xl font-bold mb-2">Teşekkürler!</h3>
            <p className="text-muted-foreground">İlgin kaydedildi. Gelişmelerden haberdar olacaksın.</p>
          </div>
        ) : (
          // Form State
          <>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">İlgin için teşekkürler 🙌</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Sardes erken aşamada. Bu fikrin kimlerde yankı bulduğunu anlamaya çalışıyoruz.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-posta adresin *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Interest Options */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Sardes'i hangi açıdan ilginç buldun? *
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
                {isSubmitting ? 'Gönderiliyor...' : 'İlgi Kaydı Yap'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InterestModal;