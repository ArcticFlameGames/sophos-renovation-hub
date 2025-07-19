import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Home, Wrench, Paintbrush, Hammer, Zap, Droplets } from "lucide-react";

const getServices = (t: any) => [
  {
    icon: Home,
    title: t('services.kitchen.title'),
    description: t('services.kitchen.description')
  },
  {
    icon: Wrench,
    title: t('services.basement.title'),
    description: t('services.basement.description')
  },
  {
    icon: Paintbrush,
    title: t('services.exterior.title'),
    description: t('services.exterior.description')
  },
  {
    icon: Hammer,
    title: t('services.bathroom.title'),
    description: t('services.bathroom.description')
  },
  {
    icon: Zap,
    title: t('services.electrical.title'),
    description: t('services.electrical.description')
  },
  {
    icon: Droplets,
    title: t('services.flooring.title'),
    description: t('services.flooring.description')
  }
];

export const Services = () => {
  const { t } = useTranslation();
  const services = getServices(t);
  
  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('services.title')} <span className="text-construction-red">{t('services.subtitle')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card hover:shadow-card-custom transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-construction-red/10 rounded-full w-fit">
                  <service.icon className="h-8 w-8 text-construction-red" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};