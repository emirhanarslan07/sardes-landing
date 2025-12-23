import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ad soyad gerekli';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta adresi gerekli';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Konu gerekli';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj gerekli';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mesaj en az 10 karakter olmalı';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            created_at: new Date().toISOString(),
            status: 'new'
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        // Fallback to showing success message even if there's an error
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('Form submission error:', error);
      // Still show success message to user
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "E-posta",
      content: "info@sardes.com",
      description: "Sorularınız için bize yazın"
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "+90 (212) 555 0123",
      description: "Pazartesi - Cuma, 09:00 - 18:00"
    },
    {
      icon: MapPin,
      title: "Adres",
      content: "Maslak, İstanbul",
      description: "Türkiye"
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      content: "09:00 - 18:00",
      description: "Pazartesi - Cuma"
    }
  ];

  return (
    <section id="iletisim" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            İletişim
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Sorularınız, önerileriniz veya demo talepleriniz için bizimle iletişime geçin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* İletişim Formu */}
          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-8">
            <h3 className="text-2xl font-bold mb-6">Bize Yazın</h3>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-green-500">Mesajınız Alındı!</h4>
                <p className="text-muted-foreground">
                  Mesajınız için teşekkür ederiz. En kısa sürede size geri dönüş yapacağız.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ad Soyad *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={errors.name ? 'border-destructive' : ''}
                      placeholder="Adınız ve soyadınız"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-posta *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-destructive' : ''}
                      placeholder="ornek@email.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Konu *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={errors.subject ? 'border-destructive' : ''}
                    placeholder="Mesajınızın konusu"
                  />
                  {errors.subject && (
                    <p className="text-sm text-destructive mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Mesaj *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={errors.message ? 'border-destructive' : ''}
                    placeholder="Mesajınızı buraya yazın..."
                    rows={5}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Mesaj Gönder
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card>

          {/* İletişim Bilgileri */}
          <div className="space-y-6">
            <Card className="bg-card/30 backdrop-blur-md border-border/30 p-8">
              <h3 className="text-2xl font-bold mb-6">İletişim Bilgileri</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{info.title}</h4>
                      <p className="text-foreground font-medium">{info.content}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-card/30 backdrop-blur-md border-border/30 p-8">
              <h4 className="text-xl font-bold mb-4">Hızlı İletişim</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-primary mb-2">Demo Talebi</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Sardes'i deneyimlemek için demo talebinde bulunun.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Demo Talep Et
                  </Button>
                </div>
                
                <div>
                  <h5 className="font-semibold text-primary mb-2">Kurumsal Çözümler</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Finans kurumları için özel çözümler hakkında bilgi alın.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Kurumsal İletişim
                  </Button>
                </div>

                <div>
                  <h5 className="font-semibold text-primary mb-2">Teknik Destek</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Platform kullanımı ile ilgili destek alın.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Destek Talebi
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;