'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { BookOpen, Users, Camera } from 'lucide-react';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Données des cartes avec icônes
  const cards = [
    {
      title: 'Philosophie',
      content:
        'Chaque cliché est une histoire. Avec rigueur et curiosité, je transforme vos instants en souvenirs éternels.',
      icon: BookOpen,
    },
    {
      title: 'Approche',
      content:
        'Sociable et à l’écoute, je collabore avec vous pour capturer votre essence, avec une touche d’humour.',
      icon: Users,
    },
    {
      title: 'Expérience',
      content:
        'Mon objectif, mon fidèle compagnon, et moi sublimons chaque détail pour des résultats uniques.',
      icon: Camera,
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-black text-white" id='about'>
      <div className="container mx-auto px-4">
        {/* Introduction et image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">À propos de Dinero Photographie</h2>
            <p className="text-base sm:text-lg mb-6">
              Je suis <span className="font-semibold">Alankpoedja Mahutin Abraham</span>, le cœur et l’âme de{' '}
              <span className="font-semibold">Dinero Photographie</span>. Photographe passionné, je capture chaque instant
              avec une rigueur d’orfèvre et une curiosité sans fin, toujours agrémenté d’une touche d’humour qui rend vos
              moments uniques. Sociable et à l’écoute, je m’adapte à vos envies pour raconter votre histoire à travers mon
              objectif, mon fidèle compagnon. Avec Dinero Photographie, je vous offre une expérience chaleureuse,
              créative et profondément professionnelle, où chaque détail compte.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-[400px] h-[500px] sm:h-96"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-lg">
              <Image
                src="/images/photographer.jpg"
                alt="Alankpoedja Mahutin Abraham, fondateur de Dinero Photographie"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-lg hover:cursor-pointer">
                  <CardHeader className="flex items-center gap-2">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    <CardTitle className="text-lg sm:text-xl font-semibold">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base">{card.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;