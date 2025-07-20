import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-construction.jpg";

export const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-section">
      <div className="absolute inset-0 bg-black/60" />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-overlay"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t('hero.title')} <span className="text-construction-red">Sophos Construction</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-100 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline-construction" size="lg" className="text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-construction-red">
              {t('portfolio.title')}
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(514) 555-0123</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@sophosconstruction.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};