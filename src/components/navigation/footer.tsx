'use client';

import { Instagram, Facebook, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const FooterSection: React.FC = () => {
  return (
    <section id="contact" className="relative min-h-[70vh] bg-black text-white snap-start flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <Image
          src="/images/logo_blanc.png"
          alt="Logo Dinero Photographie"
          width={128}
          height={128}
          className="mx-auto mb-6 w-24 sm:w-32 h-24 sm:h-32"
        />
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Dinero Photographie
        </h2>
        <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Créé par <span className="font-semibold">Alankpoedja Mahutin Abraham</span>, capturant vos moments avec passion et créativité.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
          <Link
            href="/"
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            Accueil
          </Link>
          <Link
            href="/#gallery"
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            Galerie
          </Link>
          <Link
            href="/#services"
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            href="/#contact"
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://instagram.com/dinero_photographie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors duration-300"
            aria-label="Instagram de Dinero Photographie"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://facebook.com/dinero_photographie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors duration-300"
            aria-label="Facebook de Dinero Photographie"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="mailto:dinerophotography@gmail.com"
            className="text-white/70 hover:text-white transition-colors duration-300"
            aria-label="Contacter Dinero Photographie par email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} Dinero Photographie. Tous droits réservés.
        </p>
      </div>
    </section>
  );
};

export default FooterSection;