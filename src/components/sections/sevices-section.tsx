'use client';

import { useRef } from 'react';
import { Camera, Palette, PictureInPicture, PersonStanding } from 'lucide-react';

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const services: ServiceItem[] = [
    {
      title: 'Shooting',
      description:
        'Capturez l’instant avec élégance. Que ce soit en studio ou en extérieur, Dinero Photographie transforme vos moments en œuvres d’art grâce à une approche créative, un éclairage maîtrisé et une attention aux détails qui sublime chaque sujet.',
      icon: Camera,
    },
    {
      title: 'Retouche photo',
      description:
        'Perfectionnez vos images. Nos retouches professionnelles rehaussent vos photos avec des ajustements précis de couleurs, de lumière et de textures, pour un rendu naturel et impactant qui respecte votre vision.',
      icon: Palette,
    },
    {
      title: 'Impression Tableau',
      description:
        'Donnez vie à vos souvenirs. Transformez vos photos préférées en tableaux de haute qualité, prêts à orner vos espaces. Chaque impression est réalisée avec soin pour un rendu vibrant et durable.',
      icon: PictureInPicture,
    },
    {
      title: 'Plexiglass',
      description:
        'Modernité et éclat. Offrez à vos images une finition contemporaine avec des impressions sur plexiglass. Résistantes et élégantes, elles captent la lumière pour un effet visuel saisissant.',
      icon: PersonStanding,
    },
  ];

  return (
    <section id='services' ref={sectionRef} className="relative min-h-[calc(100vh-80px)] bg-black text-white snap-start">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center bg-no-repeat bg-[url('/images/services-bg.jpg')] opacity-70"
        style={{ backgroundAttachment: 'fixed' }}
      />
      <div className="relative z-10 min-h-screen bg-black/50 backdrop-blur-lg flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Nos Services
          </h2>
          <p className="text-base sm:text-lg text-center mb-12 max-w-2xl mx-auto">
            Découvrez les services proposés par <span className="font-semibold">Dinero Photographie</span> pour transformer vos moments en souvenirs inoubliables, avec une touche de créativité et de professionnalisme.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 text-center flex flex-col items-center"
              >
                <service.icon className="w-12 h-12 mb-4 text-white" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm sm:text-base">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;