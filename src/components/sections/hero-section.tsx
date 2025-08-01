'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Video {
  src: string;
  alt: string;
}

const HeroSection: React.FC = () => {
  const router = useRouter();
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Liste des vidéos
  const videos: Video[] = [
    { src: '/videos/vidéo5.webm', alt: 'Obscurateur' },
    { src: '/videos/vidéo3.webm', alt: 'Séance photo en lumière naturelle' },
    { src: '/videos/vidéo4.webm', alt: 'Mariage capturé en extérieur' },
    { src: '/videos/vidéo1.webm', alt: 'Portrait artistique en studio' },
    { src: '/videos/vidéo2.webm', alt: 'Paysage urbain au crépuscule' },
  ];

  // Gestion des transitions vidéo
  useEffect(() => {
    const playNextVideo = () => {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      
      // Cacher la vidéo actuelle
      videoRefs.current[currentVideoIndex].style.opacity = '0';
      // Afficher la prochaine vidéo
      videoRefs.current[nextIndex].style.opacity = '1';
      videoRefs.current[nextIndex].play().catch(err => console.error('Erreur de lecture vidéo:', err));

      setCurrentVideoIndex(nextIndex);
    };

    // Lancer la transition toutes les 5 secondes
    const interval = setInterval(playNextVideo, 5000);

    // Initialiser la première vidéo
    if (videoRefs.current[0]) {
      videoRefs.current[0].style.opacity = '1';
      videoRefs.current[0].play().catch(err => console.error('Erreur de lecture vidéo:', err));
    }

    return () => clearInterval(interval);
  }, [currentVideoIndex, videos.length]);

  return (
    <section ref={sectionRef} className="relative min-h-screen snap-start flex items-center justify-center" id='hero'>
      {/* Conteneur des vidéos fixé */}
      <div className="fixed inset-0 z-[-1] w-full h-full">
        {videos.map((video, index) => (
          <video
            key={video.src}
            ref={el => {
              if (el) videoRefs.current[index] = el;
            }}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: 0 }}
            src={video.src}
            aria-label={video.alt}
            muted
            loop
            playsInline
            preload="auto"
          />
        ))}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      </div>

      {/* Conteneur du contenu scrollable */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center text-white px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Dinero Photographie</h1>
        <p className="text-lg md:text-2xl mb-6 max-w-2xl mx-auto">
          Chaque instant capturé avec humour, rigueur et une touche de magie par{' '}
          <span className="font-semibold">Alankpoedja Mahutin Abraham</span>.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Button
            onClick={() => router.push('/gallery')}
            size="lg"
            className="bg-white/20 backdrop-blur-lg cursor-pointer border border-white/20 text-white hover:bg-white/30 transition-colors duration-300"
          >
            Explorer ma gallerie de photos
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
