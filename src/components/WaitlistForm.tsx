import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addToWaitlist } from '@/lib/supabase';
import { trackWaitlistSignup } from '@/lib/analytics';
import { waitlistEmitter } from '@/hooks/useWaitlistCount';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft } from 'lucide-react';

interface FormData {
  email: string;
  user_type: string;
}

interface WaitlistFormProps {
  onBack?: () => void;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    user_type: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      user_type: value,
    }));
  };

  const submitWaitlist = async (formData: FormData) => {
    return await addToWaitlist(formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      setError(t('form.emailRequired'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitWaitlist(formData);
      console.log('Waitlist submission successful:', result);
      
      // Track successful signup
      trackWaitlistSignup(formData.email);
      
      // Update live counter
      waitlistEmitter.emit();
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Waitlist submission failed:', error);
      
      let errorMessage = t('form.error');
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">{t('form.success')}</h3>
        <p className="text-muted-foreground mb-6">
          {t('form.successMessage')}
        </p>
        {onBack && (
          <Button onClick={onBack} className="w-full">
            {t('form.close')}
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="relative flex items-center">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="absolute left-0 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-3 h-3" />
              {t('form.back')}
            </button>
          )}
          <Label htmlFor="email" className="text-sm font-medium w-full text-center">
            {t('form.email')} <span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="ornek@email.com"
          required
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="user_type" className="text-sm font-medium">
          {t('form.userType')}
        </Label>
        <Select onValueChange={handleSelectChange} value={formData.user_type}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('form.selectOption')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">{t('form.student')}</SelectItem>
            <SelectItem value="graduate">{t('form.graduate')}</SelectItem>
            <SelectItem value="working">{t('form.working')}</SelectItem>
            <SelectItem value="other">{t('form.other')}</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground/70">
          {t('form.userTypeNote')}
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-base font-semibold py-3 glow-primary hover:glow-primary-hover transition-all duration-300"
      >
        {isSubmitting ? t('form.submitting') : t('form.submit')}
      </Button>
    </form>
  );
};

export default WaitlistForm;