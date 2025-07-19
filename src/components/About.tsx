import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { CheckCircle, Clock, Shield, Users } from "lucide-react";

const getFeatures = (t: any) => [
  {
    icon: CheckCircle,
    title: t('about.features.quality.title'),
    description: t('about.features.quality.description')
  },
  {
    icon: Clock,
    title: t('about.features.minimal.title'),
    description: t('about.features.minimal.description')
  },
  {
    icon: Shield,
    title: t('about.features.licensed.title'),
    description: t('about.features.licensed.description')
  },
  {
    icon: Users,
    title: t('about.features.experienced.title'),
    description: t('about.features.experienced.description')
  }
];

export const About = () => {
  const { t } = useTranslation();
  const features = getFeatures(t);
  
  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('about.title')} <span className="text-construction-red">{t('about.companyName')}</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card hover:shadow-card-custom transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-construction-red/10 rounded-full">
                    <feature.icon className="h-6 w-6 text-construction-red" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Card className="bg-gradient-card max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">{t('about.promise.title')}</h3>
              <p className="text-lg text-muted-foreground">
                {t('about.promise.description')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};