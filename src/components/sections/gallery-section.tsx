'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageItem {
  src: string;
  alt: string;
  category: 'studio' | 'events';
  eventType?: 'conference' | 'birthdays';
}

const GallerySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<'studio' | 'events'>('studio');
  const [selectedEventType, setSelectedEventType] = useState<'conference' | 'birthdays' | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [carouselOffset, setCarouselOffset] = useState(0);

  // Liste des images
  const images: ImageItem[] = [
    // Studio
    ...Array.from({ length: 13 }, (_, i) => ({
      src: `/images/studio/studio${i + 1}.jpg`,
      alt: `Photo de studio ${i + 1} par Dinero Photographie`,
      category: 'studio' as const,
    })),
    // Événements (sous-catégories)
    ...Array.from({ length: 4 }, (_, i) => ({
      src: `/images/events/event${i + 1}.jpg`,
      alt: `Photo de mariage ${i + 1} par Dinero Photographie`,
      category: 'events' as const,
      eventType: 'conference' as const,
    })),
    ...Array.from({ length: 32 }, (_, i) => ({
      src: `/images/annif/annif${i + 9}.jpg`,
      alt: `Photo d'anniversaire ${i + 1} par Dinero Photographie`,
      category: 'events' as const,
      eventType: 'birthdays' as const,
    })),
  ];

  // Filtrer les images
  const filteredImages = selectedCategory === 'studio'
    ? images.filter(img => img.category === 'studio')
    : selectedEventType
      ? images.filter(img => img.category === 'events' && img.eventType === selectedEventType)
      : images.filter(img => img.category === 'events');

  // Calculer le nombre d’images visibles par carrousel
  const imagesPerView = typeof window !== 'undefined' ? (window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3) : 3;

  // Navigation dans le carrousel
  const handleCarouselNav = (direction: 'left' | 'right') => {
    const imageWidth = typeof window !== 'undefined' ? (window.innerWidth < 640 ? 100 : window.innerWidth < 1024 ? 50 : 33.33) : 33.33;
    const maxOffset = -(filteredImages.length - imagesPerView) * imageWidth;
    setCarouselOffset(prev => {
      let newOffset = direction === 'left' ? prev + imageWidth : prev - imageWidth;
      newOffset = Math.min(0, Math.max(newOffset, maxOffset));
      return newOffset;
    });
  };

  // Navigation dans le modal
  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentImages = selectedCategory === 'studio'
      ? images.filter(img => img.category === 'studio')
      : images.filter(img => img.category === 'events' && (!selectedEventType || img.eventType === selectedEventType));
    const currentIndex = currentImages.findIndex(img => img.src === selectedImage.src);
    const prevIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    setSelectedImage(currentImages[prevIndex]);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentImages = selectedCategory === 'studio'
      ? images.filter(img => img.category === 'studio')
      : images.filter(img => img.category === 'events' && (!selectedEventType || img.eventType === selectedEventType));
    const currentIndex = currentImages.findIndex(img => img.src === selectedImage.src);
    const nextIndex = (currentIndex + 1) % currentImages.length;
    setSelectedImage(currentImages[nextIndex]);
  };

  return (
    <section ref={sectionRef} className="py-16 bg-black text-white" id='gallery'>
      <div className="container mx-auto px-4">
        {/* Titre */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          Galerie de Dinero Photographie
        </h2>
        <p className="text-base sm:text-lg text-center mb-8 max-w-2xl mx-auto">
          Plongez dans mon univers, où chaque cliché, capturé avec rigueur et une touche d’humour par{' '}
          <span className="font-semibold">Alankpoedja Mahutin Abraham</span>, raconte une histoire unique. Découvrez la diversité de mon expérience à travers mes photos de studio et d’événements.
        </p>

        {/* Onglets de catégorie */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 mb-8">
          <Button
            onClick={() => {
              setSelectedCategory('studio');
              setSelectedEventType(null);
              setCarouselOffset(0);
            }}
            className={`px-6 py-2 text-base sm:text-lg font-semibold rounded-lg ${
              selectedCategory === 'studio'
                ? 'bg-white/20 backdrop-blur-lg border border-white/20 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Studio
          </Button>
          <Button
            onClick={() => {
              setSelectedCategory('events');
              setSelectedEventType(null);
              setCarouselOffset(0);
            }}
            className={`px-6 py-2 text-base sm:text-lg font-semibold rounded-lg ${
              selectedCategory === 'events' && !selectedEventType
                ? 'bg-white/20 backdrop-blur-lg border border-white/20 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Événements
          </Button>
        </div>

        {/* Sous-catégories pour Événements */}
        {selectedCategory === 'events' && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            {['conference', 'birthdays'].map(type => (
              <Button
                key={type}
                onClick={() => {
                  setSelectedEventType(type as 'conference' | 'birthdays');
                  setCarouselOffset(0);
                }}
                className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-lg ${
                  selectedEventType === type
                    ? 'bg-white/20 backdrop-blur-lg border border-white/20 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {type === 'conference' ? 'Conférence' : 'Anniversaires'}
              </Button>
            ))}
          </div>
        )}

        {/* Carrousel */}
        <div className="relative">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(${carouselOffset}%)` }}
              ref={carouselRef}
            >
              {filteredImages.map((image, index) => (
                <div
                  key={image.src}
                  className="flex-shrink-0 w-[300px] sm:w-1/2 md:w-1/3 p-2 cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative w-[300px] h-[400px] sm:h-[500px]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover object-top rounded-md border border-white/20 group-hover:bg-white/10 group-hover:backdrop-blur-sm transition-all duration-300"
                      sizes="(max-width: 640px) 300px, (max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </div>
              ))}
            </div>
            {filteredImages.length > imagesPerView && (
              <>
                <Button
                  onClick={() => handleCarouselNav('left')}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  onClick={() => handleCarouselNav('right')}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Modal pour l’image agrandie */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="bg-black/90 backdrop-blur-lg border border-white/20 text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedImage?.alt}</DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-[60vh] sm:h-[80vh]">
              {selectedImage && (
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain object-top"
                  sizes="100vw"
                />
              )}
            </div>
            <div className="flex justify-between mt-4">
              <Button
                onClick={handlePrevImage}
                className="bg-white/10 hover:bg-white/20 text-white"
              >
                Précédent
              </Button>
              <Button
                onClick={handleNextImage}
                className="bg-white/10 hover:bg-white/20 text-white"
              >
                Suivant
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;