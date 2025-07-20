import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Fullscreen, X } from "lucide-react";
import kitchenBefore from "@/assets/kitchen-before.jpg";
import kitchenAfter from "@/assets/kitchen-after.jpg";
import basementBefore from "@/assets/basement-before.jpg";
import basementAfter from "@/assets/basement-after.jpg";
import exteriorBefore from "@/assets/exterior-before.jpg";
import exteriorAfter from "@/assets/exterior-after.jpg";
import exteriorDeckBefore from "@/assets/matts-place/old.jpg";
import exteriorDeckAfter from "@/assets/matts-place/new.jpg";

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
  },
  {
    category: "exteriorDeck",
    title: t('portfolio.projects.exteriorDeck.title'),
    before: exteriorDeckBefore,
    after: exteriorDeckAfter,
    description: t('portfolio.projects.exteriorDeck.description'),
    duration: "1 week",
    type: t('portfolio.projects.exteriorDeck.type')
  }
];

const BeforeAfterCard = ({ item, index, t, onImageClick }: { item: any, index: number, t: any, onImageClick: (index: number, isBefore: boolean) => void }) => (
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="relative group">
          <div className="relative">
            <img 
              src={item.before} 
              alt="Before renovation" 
              className="w-full h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-zoom-in"
              onClick={() => onImageClick(index, true)}
            />
            <div className="absolute bottom-3 right-3 bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Fullscreen className="h-4 w-4" />
            </div>
          </div>
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
            {t('portfolio.before')}
          </div>
        </div>
        <div className="relative group">
          <div className="relative">
            <img 
              src={item.after} 
              alt="After renovation" 
              className="w-full h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-zoom-in"
              onClick={() => onImageClick(index, false)}
            />
            <div className="absolute bottom-3 right-3 bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Fullscreen className="h-4 w-4" />
            </div>
          </div>
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  
  const allImages = portfolioItems.flatMap((item, index) => [
    { src: item.before, alt: `${item.title} - Before` },
    { src: item.after, alt: `${item.title} - After` }
  ]);

  const handleImageClick = (projectIndex: number, isBefore: boolean) => {
    // Calculate the index in the flattened array
    const imageIndex = projectIndex * 2 + (isBefore ? 0 : 1);
    setCurrentImageIndex(imageIndex);
    setCurrentProjectIndex(projectIndex);
    setLightboxOpen(true);
  };
  
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
              <BeforeAfterCard 
                key={index} 
                item={item} 
                index={index} 
                t={t} 
                onImageClick={handleImageClick} 
              />
            ))}
          </TabsContent>

          <TabsContent value="kitchen" className="space-y-8">
            {portfolioItems
              .filter(item => item.category === "kitchen")
              .map((item, index) => (
                <BeforeAfterCard 
                  key={index} 
                  item={item} 
                  index={portfolioItems.findIndex(p => p.title === item.title)} 
                  t={t} 
                  onImageClick={handleImageClick} 
                />
              ))}
          </TabsContent>

          <TabsContent value="basement" className="space-y-8">
            {portfolioItems
              .filter(item => item.category === "basement")
              .map((item, index) => (
                <BeforeAfterCard 
                  key={index} 
                  item={item} 
                  index={portfolioItems.findIndex(p => p.title === item.title)} 
                  t={t} 
                  onImageClick={handleImageClick} 
                />
              ))}
          </TabsContent>

          <TabsContent value="exterior" className="space-y-8">
            {portfolioItems
              .filter(item => ["exterior", "exteriorDeck"].includes(item.category))
              .map((item, index) => (
                <BeforeAfterCard 
                  key={index} 
                  item={item} 
                  index={portfolioItems.findIndex(p => p.title === item.title)} 
                  t={t} 
                  onImageClick={handleImageClick} 
                />
              ))}
          </TabsContent>
        </Tabs>
        
        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={allImages}
            index={currentImageIndex}
            render={{ 
              buttonPrev: currentImageIndex === 0 ? () => null : undefined,
              buttonNext: currentImageIndex === allImages.length - 1 ? () => null : undefined,
              iconClose: () => (
                <button 
                  onClick={() => setLightboxOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="text-white h-6 w-6" />
                </button>
              )
            }}
            controller={{ closeOnBackdropClick: true }}
            carousel={{ finite: true }}
            animation={{ fade: 300 }}
            styles={{
              container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
              button: { 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                transition: 'all 0.2s ease',
              },
            }}
            on={{ view: ({ index }) => {
              // Update current image index when navigating
              if (index !== undefined) {
                setCurrentImageIndex(index);
                setCurrentProjectIndex(Math.floor(index / 2));
              }
            }}}
          />
        )}
      </div>
    </section>
  );
};