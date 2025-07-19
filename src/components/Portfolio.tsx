import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import kitchenBefore from "@/assets/kitchen-before.jpg";
import kitchenAfter from "@/assets/kitchen-after.jpg";
import basementBefore from "@/assets/basement-before.jpg";
import basementAfter from "@/assets/basement-after.jpg";
import exteriorBefore from "@/assets/exterior-before.jpg";
import exteriorAfter from "@/assets/exterior-after.jpg";

const getPortfolioItems = (t: any) => [
  {
    category: "kitchen",
    title: t('portfolio.projects.kitchen.title'),
    before: kitchenBefore,
    after: kitchenAfter,
    description: t('portfolio.projects.kitchen.description'),
    duration: "3 weeks",
    type: t('portfolio.projects.kitchen.type')
  },
  {
    category: "basement",
    title: t('portfolio.projects.basement.title'),
    before: basementBefore,
    after: basementAfter,
    description: t('portfolio.projects.basement.description'),
    duration: "4 weeks",
    type: t('portfolio.projects.basement.type')
  },
  {
    category: "exterior",
    title: t('portfolio.projects.exterior.title'),
    before: exteriorBefore,
    after: exteriorAfter,
    description: t('portfolio.projects.exterior.description'),
    duration: "2 weeks",
    type: t('portfolio.projects.exterior.type')
  }
];

const BeforeAfterCard = ({ item, index, t }: { item: any, index: number, t: any }) => (
  <Card 
    className="overflow-hidden hover:shadow-card-custom transition-all duration-300 animate-fade-in"
    style={{ animationDelay: `${index * 200}ms` }}
  >
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle className="text-xl">{item.title}</CardTitle>
        <Badge variant="secondary">{item.type}</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="relative group">
          <img 
            src={item.before} 
            alt="Before renovation" 
            className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
            {t('portfolio.before')}
          </div>
        </div>
        <div className="relative group">
          <img 
            src={item.after} 
            alt="After renovation" 
            className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
            {t('portfolio.after')}
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mb-2">{item.description}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-construction-red font-medium">{t('portfolio.duration')}: {item.duration}</span>
      </div>
    </CardContent>
  </Card>
);

export const Portfolio = () => {
  const { t } = useTranslation();
  const portfolioItems = getPortfolioItems(t);
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('portfolio.title')} <span className="text-construction-red">{t('portfolio.subtitle')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio.description')}
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto mb-12">
            <TabsTrigger value="all">{t('portfolio.tabs.all')}</TabsTrigger>
            <TabsTrigger value="kitchen">{t('portfolio.tabs.kitchen')}</TabsTrigger>
            <TabsTrigger value="basement">{t('portfolio.tabs.basement')}</TabsTrigger>
            <TabsTrigger value="exterior">{t('portfolio.tabs.exterior')}</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {portfolioItems.map((item, index) => (
              <BeforeAfterCard key={index} item={item} index={index} t={t} />
            ))}
          </TabsContent>

          <TabsContent value="kitchen" className="space-y-8">
            {portfolioItems.filter(item => item.category === "kitchen").map((item, index) => (
              <BeforeAfterCard key={index} item={item} index={index} t={t} />
            ))}
          </TabsContent>

          <TabsContent value="basement" className="space-y-8">
            {portfolioItems.filter(item => item.category === "basement").map((item, index) => (
              <BeforeAfterCard key={index} item={item} index={index} t={t} />
            ))}
          </TabsContent>

          <TabsContent value="exterior" className="space-y-8">
            {portfolioItems.filter(item => item.category === "exterior").map((item, index) => (
              <BeforeAfterCard key={index} item={item} index={index} t={t} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};