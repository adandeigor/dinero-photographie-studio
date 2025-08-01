'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimony {
  name: string;
  text: string;
  rating: number;
}

const TestimonySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const testimonies: Testimony[] = [
    {
      name: 'Sophie M.',
      text: 'Alankpoedja a capturé notre mariage avec une sensibilité incroyable. Chaque photo raconte une histoire. Un vrai artiste !',
      rating: 5,
    },
    {
      name: 'Lucas D.',
      text: 'Les retouches sont parfaites, naturelles et professionnelles. Dinero Photographie a sublimé nos portraits de famille.',
      rating: 5,
    },
    {
      name: 'Amina K.',
      text: 'L’impression sur plexiglass est époustouflante. La qualité et l’éclat des couleurs sont incomparables !',
      rating: 5,
    },
    {
      name: 'Thomas R.',
      text: 'Une séance photo en studio mémorable. Alankpoedja sait mettre à l’aise et créer des images uniques.',
      rating: 5,
    },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-[calc(100vh-80px)] bg-black text-white snap-start" id='testimony'>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/testimony-bg.jpg')] opacity-50"
        style={{ backgroundAttachment: 'fixed' }}
      />
      <div className="relative z-10 min-h-[calc(100vh-80px)] bg-black/50 backdrop-blur-lg flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
              Ce que nos clients disent
            </h2>
            <p className="text-base sm:text-lg text-center mb-12 max-w-2xl mx-auto">
              Découvrez les retours de ceux qui ont fait confiance à <span className="font-semibold">Dinero Photographie</span> pour capturer leurs moments précieux.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {testimonies.map((testimony, index) => (
              <motion.div
                key={testimony.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 text-center flex flex-col items-center"
              >
                <div className="flex mb-2">
                  {Array.from({ length: testimony.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base mb-4">{testimony.text}</p>
                <h3 className="text-lg font-semibold">{testimony.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonySection;