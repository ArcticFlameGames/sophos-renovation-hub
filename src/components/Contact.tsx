import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // EmailJS service configuration
    const serviceId = 'service_9q8z3zj'; // Replace with your EmailJS service ID
    const templateId = 'template_7n6x5k4'; // Replace with your EmailJS template ID
    const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          project_type: formData.projectType,
          message: formData.message,
          to_email: 'construction.sophos@gmail.com'
        },
        publicKey
      );

      toast({
        title: t('contact.success'),
        description: t('contact.successMessage'),
      });
      
      // Reset form
      setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
      
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: t('contact.error'),
        description: t('contact.errorMessage'),
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl font-semibold mb-4 text-construction-red">
            {t('contact.subtitle')}
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="bg-gradient-card animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl">{t('contact.subtitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t('contact.form.fields.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t('contact.form.fields.email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">{t('contact.form.fields.phone')}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectType">{t('contact.form.fields.projectType')}</Label>
                    <Input
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      placeholder={t('contact.form.placeholders.projectType')}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">{t('contact.form.fields.message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t('contact.form.placeholders.message')}
                    required
                    className="mt-1"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="construction" 
                  size="lg" 
                  className="w-full"
                >
                  {t('contact.form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Card className="bg-gradient-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h3>
                <div className="space-y-4">
                  <a 
                    href="tel:514-606-7332"
                    className="flex items-center gap-3 hover:text-construction-red transition-colors"
                  >
                    <Phone className="h-5 w-5 text-construction-red" />
                    <span>{t('contact.info.phone')}</span>
                  </a>
                  <a 
                    href="mailto:construction.sophos@gmail.com"
                    className="flex items-center gap-3 hover:text-construction-red transition-colors"
                  >
                    <Mail className="h-5 w-5 text-construction-red" />
                    <span>{t('contact.info.email')}</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-construction-red" />
                    <span>{t('contact.info.locationValue')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-construction-red text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">{t('contact.emergency.title')}</h3>
                <p className="mb-4">
                  {t('contact.emergency.description')}
                </p>
                <a href="tel:514-606-7332">
                  <Button variant="default" className="bg-white text-construction-red hover:bg-gray-100 w-full">
                    {t('contact.emergency.button')}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};