'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRef } from 'react';

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] bg-black text-white snap-start flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <h2 className="text-3xl sm:text-5xl font-bold mb-4">
          Immortalisez vos moments avec Dinero Photographie
        </h2>
        <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          Laissez <span className="font-semibold">Dinero Photographie</span>{' '}
          transformer vos instants précieux en œuvres d’art uniques. Réservez
          dès maintenant pour une expérience photographique exceptionnelle.
        </p>
        <Link
          href="https://wa.me/+2290151837263?text=Je%20souhaite%20r%C3%A9server%20une%20s%C3%A9ance%20de%20photographie%20avec%20Dinero%20Photographie"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Button
              size="lg"
              className="bg-white/20 backdrop-blur-lg border border-white/20 text-white hover:bg-white/30 transition-colors duration-300"
            >
              Réservez votre séance
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default CTASection;