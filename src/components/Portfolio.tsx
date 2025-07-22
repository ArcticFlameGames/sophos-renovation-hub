import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Fullscreen, X, ChevronLeft, ChevronRight } from "lucide-react";

// Import all your images
import kitchen1 from "@/assets/Kitchen-1/IMG_20250720_220445.png";
import kitchen2 from "@/assets/Kitchen-2/IMG_20250720_220500.png";
import bedroomWalls1 from "@/assets/Bedrooms-walls/IMG_20250720_220502.png";
import bedroomWalls2 from "@/assets/Bedrooms-walls/IMG_20250720_220505.png";
import exteriorDeckBefore1 from "@/assets/matts-place/old.jpg";
import exteriorDeckAfter1 from "@/assets/matts-place/new.jpg";
import exteriorDeckBeforeAfter from "@/assets/Exterior/IMG_20250720_220457.jpg";

// Type definitions
interface ProjectImage {
  src: string;
  alt: string;
  isSplitView?: boolean;
}

interface PortfolioItem {
  category: string;
  title: string;
  before: ProjectImage[];
  after: ProjectImage[];
  description: string;
  duration: string;
  type: string;
}

const getPortfolioItems = (t: any): PortfolioItem[] => [
  {
    category: "kitchen",
    title: t('portfolio.projects.kitchen.title'),
    before: [],
    after: [
      { src: kitchen1, alt: 'Kitchen after renovation' }
    ],
    description: t('portfolio.projects.kitchen.description'),
    duration: "4 weeks",
    type: t('portfolio.projects.kitchen.type')
  },
  {
    category: "kitchen",
    title: t('portfolio.projects.kitchen.title'),
    before: [],
    after: [
      { src: kitchen2, alt: 'Kitchen after renovation' }
    ],
    description: t('portfolio.projects.kitchen.description'),
    duration: "3 weeks",
    type: t('portfolio.projects.kitchen.type')
  },
  {
    category: "bedroom",
    title: t('portfolio.projects.bedroom.title'),
    before: [],
    after: [
      { src: bedroomWalls1, alt: 'Bedroom walls after renovation' },
      { src: bedroomWalls2, alt: 'Bedroom walls after renovation' }
    ],
    description: t('portfolio.projects.bedroom.description'),
    duration: "1 week",
    type: t('portfolio.projects.bedroom.type')
  },
  {
    category: "exteriorDeck",
    title: t('portfolio.projects.exteriorDeck.title'),
    before: [
      { src: exteriorDeckBefore1, alt: 'Deck before renovation' }
    ],
    after: [
      { src: exteriorDeckAfter1, alt: 'Deck after renovation' }
    ],
    description: t('portfolio.projects.exteriorDeck.description'),
    duration: "1 week",
    type: t('portfolio.projects.exteriorDeck.type')
  },
  {
    category: "exteriorDeck",
    title: t('portfolio.projects.exteriorDeck.title'),
    before: [],
    after: [
      { 
        src: exteriorDeckBeforeAfter, 
        alt: 'Deck before and after renovation',
        isSplitView: true
      }
    ],
    description: t('portfolio.projects.exteriorDeck.description'),
    duration: "1 week",
    type: t('portfolio.projects.exteriorDeck.type')
  }
];

const BeforeAfterCard = ({ item, index, t, onImageClick }: { item: PortfolioItem, index: number, t: any, onImageClick: (index: number, isBefore: boolean, imgIndex?: number) => void }) => {
  // Helper function to render image gallery
  const renderImageGallery = (images: ProjectImage[], isBefore: boolean) => {
    if (!images || images.length === 0) return null;
    
    return (
      <div className="relative group">
        <div className="relative">
          {/* Main image */}
          <div className="relative">
            <img 
              src={images[0].src} 
              alt={images[0].alt} 
              className="w-full h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-zoom-in mx-auto"
              onClick={() => onImageClick(index, isBefore, 0)}
            />
            {images[0].isSplitView && (
              <>
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                  {t('portfolio.before')}
                </div>
                <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                  {t('portfolio.after')}
                </div>
              </>
            )}
          </div>
          
          {/* Image counter if multiple images */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
              +{images.length - 1} more
            </div>
          )}
          
          {/* Fullscreen icon */}
          <div className="absolute bottom-3 right-3 bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Fullscreen className="h-4 w-4" />
          </div>
        </div>
        {!images[0]?.isSplitView && (
          <div className={`absolute top-3 left-3 ${isBefore ? 'bg-red-500' : 'bg-green-500'} text-white px-2 py-1 rounded text-sm font-medium`}>
            {t(isBefore ? 'portfolio.before' : 'portfolio.after')}
          </div>
        )}
        
        {/* Thumbnails for additional images */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
            {images.slice(0, 4).map((img, imgIndex) => (
              <div 
                key={imgIndex}
                className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 border-transparent hover:border-construction-red transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onImageClick(index, isBefore, imgIndex);
                }}
              >
                <img 
                  src={img.src} 
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {images.length > 4 && (
              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-xs text-gray-500">
                +{images.length - 4}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
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
        <div className={`grid gap-6 mb-4 ${item.before?.length > 0 ? 'grid-cols-1 md:grid-cols-2' : 'max-w-3xl mx-auto'}`}>
          {item.before?.length > 0 && renderImageGallery(item.before, true)}
          {item.after?.length > 0 && (
            <div className={item.before?.length ? '' : 'w-full'}>  
              {renderImageGallery(item.after, false)}
            </div>
          )}
        </div>
        <p className="text-muted-foreground mb-2">{item.description}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-construction-red font-medium">
            {t('portfolio.duration')}: {t('portfolio.durations.week_other', { count: parseInt(item.duration) })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export const Portfolio = () => {
  const { t } = useTranslation();
  const portfolioItems = getPortfolioItems(t);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  
  // Create a flat array of all images with their metadata
  const allImages = portfolioItems.flatMap((item, projectIndex) => {
    const images: Array<{src: string, alt: string, projectIndex: number, isBefore: boolean, imgIndex: number}> = [];
    
    // Add all before images
    item.before?.forEach((img, imgIndex) => {
      images.push({
        src: img.src,
        alt: img.alt,
        projectIndex,
        isBefore: true,
        imgIndex
      });
    });
    
    // Add all after images
    item.after?.forEach((img, imgIndex) => {
      images.push({
        src: img.src,
        alt: img.alt,
        projectIndex,
        isBefore: false,
        imgIndex
      });
    });
    
    return images;
  });

  const handleImageClick = (projectIndex: number, isBefore: boolean, imgIndex: number = 0) => {
    // Find the index of the clicked image in the allImages array
    const clickedImageIndex = allImages.findIndex(img => 
      img.projectIndex === projectIndex && 
      img.isBefore === isBefore && 
      img.imgIndex === imgIndex
    );
    
    if (clickedImageIndex !== -1) {
      setCurrentImageIndex(clickedImageIndex);
      setCurrentProjectIndex(projectIndex);
      setLightboxOpen(true);
    }
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
            <TabsTrigger value="bedroom">{t('portfolio.tabs.bedroom')}</TabsTrigger>
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

          <TabsContent value="bedroom" className="space-y-8">
            {portfolioItems
              .filter(item => item.category === "bedroom")
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
            slides={allImages.map(img => ({
              src: img.src,
              alt: img.alt
            }))}
            index={currentImageIndex}
            render={{ 
              buttonPrev: currentImageIndex === 0 ? () => null : undefined,
              buttonNext: currentImageIndex === allImages.length - 1 ? () => null : undefined,
              iconPrev: () => (
                <ChevronLeft className="text-white h-8 w-8" />
              ),
              iconNext: () => (
                <ChevronRight className="text-white h-8 w-8" />
              ),
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
            carousel={{ 
              finite: true,
              preload: 2
            }}
            animation={{ fade: 300 }}
            styles={{
              container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
              button: { 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                transition: 'all 0.2s ease',
              },
            }}
            on={{ 
              view: ({ index }) => {
                if (index !== undefined) {
                  setCurrentImageIndex(index);
                  setCurrentProjectIndex(allImages[index]?.projectIndex || 0);
                }
              }
            }}
          />
        )}
      </div>
    </section>
  );
};