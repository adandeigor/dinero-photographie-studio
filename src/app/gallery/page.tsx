'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ImageItem {
  src: string;
  alt: string;
  album: string;
}

interface Album {
  name: string;
  count: number;
  path: string;
}

const albums: Album[] = [
  { name: 'Photo Studio', count: 13, path: 'studio' },
  { name: 'Évènement BLS', count: 20, path: 'bls' },
  { name: 'Évènement Vague Blanche', count: 20, path: 'vague' },
  { name: 'Évènement (Anniversaire)', count: 20, path: 'annif' },
  { name: 'Évènement Mariage', count: 20, path: 'mariage' },
];

const GalleryPage: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<string>(albums[0].name);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  // Generate images array
  const images: ImageItem[] = albums.flatMap(album =>
    Array.from({ length: album.count }, (_, i) => ({
      src: `/images/${album.path}/${album.path}${i + 1}.webp`,
      alt: `Photo ${i + 1} de l'album ${album.name} par Dinero Photographie`,
      album: album.name,
    }))
  );

  const filteredImages = images.filter(img => img.album === selectedAlbum);

  // Modal navigation
  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] snap-start flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/hero-gallery-bg.jpg')] opacity-50"
          style={{ backgroundAttachment: 'fixed' }}
        />
        <div className="relative z-10  w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center px-4"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Galerie de Dinero Photographie
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto">
              Explorez les œuvres de{' '}
              <span className="font-semibold">Alankpoedja Mahutin Abraham</span>, où chaque photo capture
              l’essence d’un moment avec passion, rigueur et une touche d’humour.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Albums Section */}
      <section className="py-16 snap-start">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Nos Albums
          </h2>
          {/* Album Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {albums.map(album => (
              <Button
                key={album.name}
                onClick={() => setSelectedAlbum(album.name)}
                className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-lg ${
                  selectedAlbum === album.name
                    ? 'bg-white/20 backdrop-blur-lg border border-white/20 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {album.name}
              </Button>
            ))}
          </div>

          {/* Image Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative w-full h-[300px] cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-md border border-white/20 group-hover:bg-white/10 group-hover:backdrop-blur-sm transition-all duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Back to Home Link */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              Retour à l’accueil
            </Link>
          </div>
        </div>
      </section>

      {/* Modal for Enlarged Image */}
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
              <ChevronLeft className="w-6 h-6 mr-2" /> Précédent
            </Button>
            <Button
              onClick={handleNextImage}
              className="bg-white/10 hover:bg-white/20 text-white"
            >
              Suivant <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryPage;